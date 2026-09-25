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
                    u.MedicalCheckDate,
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
            else
            {
                user.MedicalCheckDate = null;
            }

            await _context.SaveChangesAsync();
            return Ok(new
            {
                message = "Данные успешно обновлены",
                user.MedicalCheckDate,
                user.IsMedicalCheckValid
            });
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

        [Authorize(Roles = "Admin")]
        [HttpPut("schedule/{id}")]
        public async Task<IActionResult> UpdateScheduleItem(int id, [FromBody] UpdateScheduleDto dto)
        {
            var scheduleItem = await _context.ScheduleItems.FindAsync(id);
            if (scheduleItem == null)
                return NotFound(new { message = "Занятие в расписании не найдено." });

            // Обновляем данные
            if (!string.IsNullOrWhiteSpace(dto.GroupName))
                scheduleItem.GroupName = dto.GroupName.Trim();
            if (dto.StartAt.HasValue)
            {
                var dt = dto.StartAt.Value;
                // Записываем ровно то время, которое ввел пользователь
                scheduleItem.StartAt = new DateTime(dt.Year, dt.Month, dt.Day, dt.Hour, dt.Minute, 0, DateTimeKind.Utc);
            }
            if (dto.DurationMinutes > 0)
                scheduleItem.DurationMinutes = dto.DurationMinutes;
            if (dto.TrainerId > 0)
            {
                bool trainerExists = await _context.Trainers.AnyAsync(t => t.Id == dto.TrainerId);
                if (trainerExists)
                    scheduleItem.TrainerId = dto.TrainerId;
            }
            if (dto.AvailableSlots >= 0)
                scheduleItem.AvailableSlots = dto.AvailableSlots;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Расписание успешно обновлено!" });
        }

        // POST: api/admin/schedule (Создать новое занятие)
        [Authorize(Roles = "Admin")]
        [HttpPost("schedule")]
        public async Task<IActionResult> CreateScheduleItem([FromBody] UpdateScheduleDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.GroupName))
                return BadRequest(new { message = "Название группы обязательно." });

            if (!dto.StartAt.HasValue)
                return BadRequest(new { message = "Укажите дату и время начала занятия." });

            // Фиксируем точные часы и минуты без сдвига часовых поясов
            var dt = dto.StartAt.Value;
            var exactStartAt = new DateTime(dt.Year, dt.Month, dt.Day, dt.Hour, dt.Minute, 0, DateTimeKind.Utc);

            var scheduleItem = new ScheduleItem
            {
                GroupName = dto.GroupName.Trim(),
                StartAt = exactStartAt,
                DurationMinutes = dto.DurationMinutes > 0 ? dto.DurationMinutes : 45,
                TrainerId = dto.TrainerId > 0 ? dto.TrainerId : 1,
                AvailableSlots = dto.AvailableSlots >= 0 ? dto.AvailableSlots : 6
            };

            _context.ScheduleItems.Add(scheduleItem);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Занятие успешно создано в расписании!" });
        }

        // DELETE: api/admin/schedule/{id}
        [HttpDelete("schedule/{id:int}")]
        public async Task<IActionResult> DeleteScheduleItem(int id)
        {
            var scheduleItem = await _context.ScheduleItems
                .Include(s => s.Bookings)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (scheduleItem == null)
                return NotFound(new { message = "Занятие не найдено." });

            if (scheduleItem.Bookings.Any())
            {
                return Conflict(new
                {
                    message = "Нельзя удалить занятие: на него уже записаны пользователи. Сначала отмените записи."
                });
            }

            _context.ScheduleItems.Remove(scheduleItem);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Занятие удалено из расписания." });
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
    public class UpdateScheduleDto
    {
        public string GroupName { get; set; } = string.Empty;
        public int DurationMinutes { get; set; } = 45;
        public int TrainerId { get; set; }
        public int AvailableSlots { get; set; }
        public DateTime? StartAt { get; set; }
    }
}