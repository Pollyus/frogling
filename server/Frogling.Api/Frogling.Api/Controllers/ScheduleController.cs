using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Frogling.Api.Data;
using System.Globalization;
using Microsoft.AspNetCore.Authorization;
using System.Data;
using Frogling.Api.Models;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

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
            var scheduleItem = await _context.ScheduleItems.FindAsync(id);
            if (scheduleItem == null)
                return NotFound(new { message = "Занятие не найдено." });

            var attendees = await (from b in _context.Bookings
                                   join u in _context.Users on b.UserId equals u.Id
                                   where b.ScheduleItemId == id
                                   select new
                                   {
                                       bookingId = b.Id,
                                       userId = b.UserId,
                                       fullName = u.FullName,
                                       phone = u.Phone,
                                       email = u.Email,
                                       parentName = u.ParentName
                                   }).ToListAsync();

            var result = new
            {
                scheduleItem.Id,
                scheduleItem.GroupName,
                date = scheduleItem.StartAt.ToString("dd.MM.yyyy"),
                startTime = scheduleItem.StartAt.ToString("HH:mm"),
                endTime = scheduleItem.EndAt.ToString("HH:mm"),
                attendees = attendees
            };

            return Ok(result);
        }

        private Guid? GetCurrentUserId()
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier)
                               ?? User.FindFirstValue(JwtRegisteredClaimNames.Sub)
                               ?? User.FindFirstValue("sub");

            if (Guid.TryParse(userIdString, out var userId)) return userId;
            return null;
        }

        [HttpPost("buy")]
        [Authorize]
        public async Task<IActionResult> BuySubscription([FromBody] BuySubscriptionDto dto)
        {
            var userId = GetCurrentUserId();
            if (userId == null) return Unauthorized();

            decimal finalPrice = dto.Price;
            int? appliedPromotionId = dto.PromotionId;

            // Если передан ID акции, проверяем её и применяем скидку на бэкенде (для безопасности!)
            if (appliedPromotionId.HasValue)
            {
                var promo = await _context.Promotions.FindAsync(appliedPromotionId.Value);
                if (promo != null)
                {
                    // Пример расчета: если скидка в процентах
                    // finalPrice = dto.Price - (dto.Price * promo.DiscountPercentage / 100);

                    // Или если фиксированная скидка:
                    finalPrice = Math.Max(0, dto.Price - promo.DiscountAmount);
                }
            }

            // Создаем абонемент с учетом примененной скидки
            var subscription = new SubscriptionPrice
            {
                UserId = userId.Value,
                Title = dto.Title,
                Price = finalPrice, // Сохраняем цену со скидкой
                TotalLessons = dto.TotalLessons,
                RemainingLessons = dto.TotalLessons,
                ExpiryDate = DateTime.UtcNow.AddDays(dto.DaysValid > 0 ? dto.DaysValid : 30),
                IsActive = true
            };

            _context.Subscriptions.Add(subscription);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Абонемент успешно приобретен со скидкой!", finalPrice });
        }

    } 
    public class BuySubscriptionDto
        {
            public string Title { get; set; } = string.Empty;
            public decimal Price { get; set; }
            public int TotalLessons { get; set; }
            public int DaysValid { get; set; } = 30;
            public int? PromotionId { get; set; } // ID выбранной акции
        }
}
