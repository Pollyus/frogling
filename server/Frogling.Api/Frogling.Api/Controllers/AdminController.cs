using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Frogling.Api.Data;
using Frogling.Api.Models;

namespace Frogling.Api.Controllers
{
    [Authorize(Roles = "Admin")] // Доступ строго для Администраторов
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminController(AppDbContext context)
        {
            _context = context;
        }

        // 1. Получить список всех клиентов
        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.Users
                .Where(u => u.Role != "Admin")
                .Select(u => new
                {
                    u.Id,
                    u.FullName,
                    u.Email,
                    u.Phone,
                    u.ParentName,
                    u.IsMedicalCheckValid,
                    ActiveSubscription = u.Subscriptions
                        .Where(s => s.IsActive && s.RemainingLessons > 0)
                        .Select(s => s.Title)
                        .FirstOrDefault()
                })
                .ToListAsync();

            return Ok(users);
        }

        // 2. Изменить информацию о клиенте / статус медосмотра
        [HttpPut("users/{userId}")]
        public async Task<IActionResult> UpdateUserByAdmin(Guid userId, [FromBody] UpdateUserAdminDto dto)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return NotFound(new { message = "Пользователь не найден." });

            user.FullName = dto.FullName?.Trim() ?? string.Empty;
            user.Phone = dto.Phone?.Trim() ?? string.Empty;
            user.ParentName = dto.ParentName?.Trim() ?? string.Empty;
            if (dto.MedicalCheckDate.HasValue)
            {
                user.MedicalCheckDate = dto.MedicalCheckDate.Value.ToUniversalTime();
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "Данные клиента успешно обновлены!" });
        }

        // 3. Записать клиента на занятие от имени админа
        [HttpPost("bookings")]
        public async Task<IActionResult> AdminBookLesson([FromBody] AdminBookDto dto)
        {
            var user = await _context.Users.Include(u => u.Subscriptions).FirstOrDefaultAsync(u => u.Id == dto.UserId);
            var scheduleItem = await _context.ScheduleItems.FindAsync(dto.ScheduleItemId);

            if (user == null || scheduleItem == null)
                return NotFound(new { message = "Клиент или занятие не найдены." });

            if (scheduleItem.AvailableSlots <= 0)
                return BadRequest(new { message = "Нет свободных мест." });

            var activeSub = user.Subscriptions
                .FirstOrDefault(s => s.IsActive && s.RemainingLessons > 0 && s.ExpiryDate > DateTime.UtcNow);

            if (activeSub == null)
                return BadRequest(new { message = "У клиента нет активного абонемента с занятиями." });

            activeSub.RemainingLessons--;
            scheduleItem.AvailableSlots--;

            var booking = new Booking
            {
                UserId = user.Id,
                ScheduleItemId = scheduleItem.Id,
                SubscriptionId = activeSub.Id,
                ScheduledAt = scheduleItem.StartAt,
                BookedAt = DateTime.UtcNow
            };

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Клиент успешно записан на занятие!" });
        }

        // 4. Отменить запись клиента
        [HttpDelete("bookings/{bookingId}")]
        public async Task<IActionResult> AdminCancelBooking(int bookingId)
        {
            var booking = await _context.Bookings
                .Include(b => b.ScheduleItem)
                .Include(b => b.Subscription)
                .FirstOrDefaultAsync(b => b.Id == bookingId);

            if (booking == null) return NotFound(new { message = "Запись не найдена." });

            if (booking.ScheduleItem != null)
                booking.ScheduleItem.AvailableSlots++;

            if (booking.Subscription != null && booking.Subscription.RemainingLessons < booking.Subscription.TotalLessons)
                booking.Subscription.RemainingLessons++;

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Запись отменена администратором." });
        }
    }

    public class UpdateUserAdminDto
    {
        public string FullName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string ParentName { get; set; } = string.Empty;
        public DateTime? MedicalCheckDate { get; set; }
    }

    public class AdminBookDto
    {
        public Guid UserId { get; set; }
        public int ScheduleItemId { get; set; }
    }
}