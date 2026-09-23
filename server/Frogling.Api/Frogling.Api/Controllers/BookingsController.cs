using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Frogling.Api.Data;
using Frogling.Api.Models;

namespace Frogling.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class BookingsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BookingsController(AppDbContext context)
        {
            _context = context;
        }

        private Guid? GetCurrentUserId()
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier)
                               ?? User.FindFirstValue(JwtRegisteredClaimNames.Sub)
                               ?? User.FindFirstValue("sub");

            if (Guid.TryParse(userIdString, out var userId)) return userId;
            return null;
        }

        // 1. Получить все записи текущего пользователя для Личного кабинета
        [HttpGet]
        public async Task<IActionResult> GetMyBookings()
        {
            var userId = GetCurrentUserId();
            if (userId == null) return Unauthorized();

            var bookings = await _context.Bookings
                .Where(b => b.UserId == userId.Value)
                .Include(b => b.ScheduleItem)
                .ThenInclude(s => s!.Trainer)
                .OrderByDescending(b => b.BookedAt)
                .Select(b => new
                {
                    b.Id,
                    b.BookedAt,
                    DayOfWeek = b.ScheduleItem != null ? b.ScheduleItem.DayOfWeek : "",
                    Time = b.ScheduleItem != null ? b.ScheduleItem.Time : "",
                    GroupName = b.ScheduleItem != null ? b.ScheduleItem.GroupName : "",
                    TrainerName = b.ScheduleItem != null && b.ScheduleItem.Trainer != null ? b.ScheduleItem.Trainer.Name : "Инструктор"
                })
                .ToListAsync();

            return Ok(bookings);
        }

        // 2. Записаться на занятие
        [HttpPost("{scheduleItemId}")]
        public async Task<IActionResult> BookLesson(int scheduleItemId)
        {
            var userId = GetCurrentUserId();
            if (userId == null) return Unauthorized();

            //1. Ищем занятие в расписании
            var scheduleItem = await _context.ScheduleItems
                .Include(s => s.Trainer)
                .FirstOrDefaultAsync(s => s.Id == scheduleItemId);

            if (scheduleItem == null)
                return NotFound(new { message = "Занятие не найдено." });

            //2. Проверяем, не записан ли пользователь уже на это занятие
            bool alreadyBooked = await _context.Bookings
                .AnyAsync(b => b.UserId == userId.Value && b.ScheduleItemId == scheduleItemId);

            if (alreadyBooked)
                return BadRequest(new { message = "Вы уже записаны на это занятие." });

            //3. Проверяем наличие свободных мест
            if (scheduleItem.AvailableSlots <= 0)
                return BadRequest(new { message = "К сожалению, на это занятие все места заняты." });

            // 4. Находим активный абонемент пользователя с остатком занятий > 0
            var activeSubscription = await _context.Subscriptions
                .Where(s => s.UserId == userId.Value && s.IsActive && s.RemainingLessons > 0 && s.ExpiryDate > DateTime.UtcNow)
                .OrderBy(s => s.ExpiryDate) // Сначала те, которые раньше сгорают
                .FirstOrDefaultAsync();

            if (activeSubscription == null)
            {
                return BadRequest(new { message = "У вас нет активного абонемента или закончились занятия! Купите абонемент во вкладке «Услуги»." });
            }

            //5. Уменьшаем количество занятий в абонементе
            activeSubscription.RemainingLessons--;

            // Если занятия закончились, можно автоматически деактивировать абонемент (опционально)
            if (activeSubscription.RemainingLessons <= 0)
            {
                activeSubscription.IsActive = false; 
            }

            //6. Уменьшаем количество свободных мест
            scheduleItem.AvailableSlots--;

            //7. Создаем запись с привязкой к конкретному абонементу
            var booking = new Booking
            {
                UserId = userId.Value,
                ScheduleItemId = scheduleItemId,
                SubscriptionId = activeSubscription.Id,
                BookedAt = DateTime.UtcNow
            };

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Запись успешно оформлена! Списано 1 занятие с абонемента.", remainingSlots = scheduleItem.AvailableSlots, remainingLessonsInSub = activeSubscription.RemainingLessons });
        }

        // 3. Отменить запись
        [HttpDelete("{id}")]
        public async Task<IActionResult> CancelBooking(int id)
        {
            var userId = GetCurrentUserId();
            if (userId == null) return Unauthorized();

            var booking = await _context.Bookings
                .Include(b => b.ScheduleItem)
                .Include(b => b.Subscription)
                .FirstOrDefaultAsync(b => b.Id == id && b.UserId == userId);

            if (booking == null)
                return NotFound(new { message = "Запись не найдена." });

            // Место освобождается при любой отмене.
            if (booking.ScheduleItem != null)
                booking.ScheduleItem.AvailableSlots++;

            // ВЫЧИСЛЯЕМ: осталось ли до занятия больше 1 часа?
            var timeUntilClass = booking.ScheduleItem.ClassDate - DateTime.Now;
            bool isEarlyCancellation = timeUntilClass.TotalHours > 1;

            if (isEarlyCancellation)
            {
                // Если отмена ранняя — возвращаем занятие на абонемент
                if (booking.Subscription != null)
                    booking.Subscription.RemainingLessons++;

                _context.Bookings.Remove(booking);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Запись отменена, занятие возвращено." });
            }
            else
            {
                // Если осталось меньше часа — просто удаляем запись, НЕ возвращая занятие
                _context.Bookings.Remove(booking);
                await _context.SaveChangesAsync();
                return Ok(new { message = "До занятия меньше часа. Запись удалена, но занятие списано." });
            }
        }
    }
}