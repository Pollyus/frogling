using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Frogling.Api.Data;
using System.Globalization;
using Frogling.Api.Models;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace Frogling.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TrainerController : Controller
    {
        private readonly AppDbContext _context;
        public TrainerController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/trainer
        [HttpGet]
        public async Task<IActionResult> GetTrainer()
        {
            var trainer = await _context.Trainers
                .Select(t => new
                {
                    t.Id,
                    t.Name,
                    t.PhotoUrl
                })
                .ToListAsync();

            return Ok(trainer);
        }

        private Guid? GetCurrentUserId()
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier)
                               ?? User.FindFirstValue(JwtRegisteredClaimNames.Sub)
                               ?? User.FindFirstValue("sub");

            return Guid.TryParse(userIdString, out var userId) ? userId : null;
        }

        // GET: api/trainer/schedule
        // Получить расписание вошедшего тренера и список детей с контактами родителей
        [HttpGet("schedule")]
        public async Task<IActionResult> GetTrainerSchedule()
        {
            var userId = GetCurrentUserId();
            if (userId == null) return Unauthorized();

            // Находим профиль тренера, связанный с залогиненным пользователем
            var trainer = await _context.Trainers.FirstOrDefaultAsync(t => t.UserId == userId.Value);
            if (trainer == null)
                return NotFound(new { message = "Профиль тренера не найден в системе." });

            var schedule = await _context.ScheduleItems
                .Where(s => s.TrainerId == trainer.Id)
                .OrderBy(s => s.StartAt)
                .Select(s => new
                {
                    s.Id,
                    GroupName = s.GroupName,
                    StartAt = s.StartAt,
                    EndAt = s.EndAt,
                    AvailableSlots = s.AvailableSlots,
                    // Список записавшихся детей и родителей
                    Students = _context.Bookings
                        .Where(b => b.ScheduleItemId == s.Id)
                        .Select(b => new
                        {
                            BookingId = b.Id,
                            StudentName = b.User!.FullName,
                            ParentName = b.User.ParentName,
                            ParentPhone = b.User.Phone,
                            ParentUserId = b.User.Id // ID родителя для открытия чата
                        }).ToList()
                })
                .ToListAsync();

            return Ok(schedule);
        }

    }
}
