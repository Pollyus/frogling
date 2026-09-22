using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Frogling.Api.Data;
using Frogling.Api.Models;

namespace Frogling.Api.Controllers
{
    [Authorize] // Доступ только с валидным JWT-токеном
    [ApiController]
    [Route("api/[controller]")]
    public class SubscriptionsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SubscriptionsController(AppDbContext context)
        {
            _context = context;
        }

        // 1. Получить все абонементы и историю текущего пользователя
        [HttpGet]
        public async Task<IActionResult> GetMySubscriptions()
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userIdString, out Guid userId))
                return Unauthorized();

            var subscriptions = await _context.Subscriptions
                .Where(s => s.UserId == userId)
                .OrderByDescending(s => s.PurchaseDate)
                .ToListAsync();

            return Ok(subscriptions);
        }

        // 2. Купить / оформить новый абонемент
        [HttpPost("buy")]
        public async Task<IActionResult> BuySubscription([FromBody] BuySubscriptionDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userIdString, out Guid userId))
                return Unauthorized();

            var newSub = new SubscriptionPrice
            {
                Title = dto.Title,
                Price = dto.Price,
                TotalLessons = dto.TotalLessons,
                RemainingLessons = dto.TotalLessons,
                PurchaseDate = DateTime.UtcNow,
                ExpiryDate = DateTime.UtcNow.AddDays(dto.DaysValid),
                IsActive = true,
                UserId = userId
            };

            _context.Subscriptions.Add(newSub);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Абонемент успешно приобретен!", subscription = newSub });
        }
    }
}
