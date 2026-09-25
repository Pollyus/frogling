using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Frogling.Api.Data;
using System.Globalization;
using Microsoft.AspNetCore.Authorization;
using System.Data;

namespace Frogling.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ScheduleController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ScheduleController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/schedule
        [HttpGet]
        public async Task<IActionResult> GetSchedule()
        {
            var schedule = await _context.ScheduleItems
                .Include(s => s.Trainer)
                .OrderBy(s => s.StartAt)
                .ToListAsync();

            var culture = new CultureInfo("ru-RU");

            var result = schedule.Select(s => new
            {
                s.Id,
                date = s.StartAt.ToString("yyyy-MM-dd"),
                startAt = s.StartAt,
                durationMinutes = s.DurationMinutes, // можно дополнительно передавать длительность

                dayOfWeek = s.StartAt.ToString("dddd", culture),

                startTime = s.StartAt.ToString("HH:mm"),
                endTime = s.EndAt.ToString("HH:mm"), // Автоматически: 10:00 + 45 мин = 10:45

                s.GroupName,
                s.AvailableSlots,

                trainerId = s.TrainerId,
                trainerName = s.Trainer?.Name ?? "Инструктор",
                trainerSpecialization = s.Trainer?.Specialization ?? "",
                trainerPhoto = s.Trainer?.PhotoUrl ?? "🐸"
            });

            return Ok(result);
        }
        // GET: api/schedule/{id}/attendees
        [Authorize(Roles = "Admin,Trainer")] // Доступ только админу и тренерам
        [HttpGet("{id}/attendees")]
        public async Task<IActionResult> GetScheduleAttendees(int id)
        {
            var scheduleItem = await _context.ScheduleItems
                .Include(s => s.Bookings)
                    .ThenInclude(b => b.User)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (scheduleItem == null)
                return NotFound(new { message = "Занятие не найдено." });

            var result = new
            {
                scheduleItem.Id,
                scheduleItem.GroupName,
                date = scheduleItem.StartAt.ToString("dd.MM.yyyy"),
                startTime = scheduleItem.StartAt.ToString("HH:mm"),
                endTime = scheduleItem.EndAt.ToString("HH:mm"),
                attendees = scheduleItem.Bookings.Select(b => new
                {
                    bookingId = b.Id,
                    userId = b.UserId,
                    fullName = b.User?.FullName ?? "Неизвестный клиент",
                    phone = b.User?.Phone ?? "",
                    email = b.User?.Email ?? "",
                    parentName = b.User?.ParentName ?? ""
                })
            };

            return Ok(result);
        }

    }
}
