using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Frogling.Api.Data;
using Frogling.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Frogling.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class SubscriptionsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SubscriptionsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetMySubscriptions()
        {
            var userId = GetCurrentUserId();

            if (userId == null)
            {
                return Unauthorized(new
                {
                    message = "Не удалось определить пользователя из JWT-токена"
                });
            }

            var subscriptions = await _context.Subscriptions
                .AsNoTracking()
                .Where(s => s.UserId == userId.Value)
                .OrderByDescending(s => s.PurchaseDate)
                .Select(s => new
                {
                    s.Id,
                    s.Title,
                    s.Price,
                    s.TotalLessons,
                    s.RemainingLessons,
                    s.PurchaseDate,
                    s.ExpiryDate,
                    s.IsActive
                })
                .ToListAsync();

            return Ok(subscriptions);
        }

        [HttpPost("buy")]
        public async Task<IActionResult> BuySubscription(
            [FromBody] BuySubscriptionDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = GetCurrentUserId();

            if (userId == null)
            {
                return Unauthorized(new
                {
                    message = "Не удалось определить пользователя из JWT-токена"
                });
            }

            if (dto.TotalLessons <= 0)
            {
                return BadRequest(new
                {
                    message = "Количество занятий должно быть больше нуля"
                });
            }

            if (dto.Price < 0)
            {
                return BadRequest(new
                {
                    message = "Цена не может быть отрицательной"
                });
            }

            var subscription = new SubscriptionPrice
            {
                Title = dto.Title,
                Price = dto.Price,
                TotalLessons = dto.TotalLessons,
                RemainingLessons = dto.TotalLessons,
                PurchaseDate = DateTime.UtcNow,
                ExpiryDate = DateTime.UtcNow.AddDays(
                    dto.DaysValid > 0 ? dto.DaysValid : 30
                ),
                IsActive = true,
                UserId = userId.Value
            };

            _context.Subscriptions.Add(subscription);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Абонемент успешно приобретён",
                subscription
            });
        }

        private Guid? GetCurrentUserId()
        {
            var userIdString =
                User.FindFirstValue(ClaimTypes.NameIdentifier) ??
                User.FindFirstValue(JwtRegisteredClaimNames.Sub) ??
                User.FindFirstValue("sub");

            if (Guid.TryParse(userIdString, out var userId))
                return userId;

            return null;
        }
    }
}