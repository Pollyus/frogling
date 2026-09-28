using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Frogling.Api.Data;
using Frogling.Api.Models;

namespace Frogling.Api.Controllers
{
    [ApiController]
    [Route("api/promotions")]
    public class PromotionsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PromotionsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/promotions (Публичные акции + персональные для текущего юзера)
        [HttpGet]
        public async Task<IActionResult> GetPromotions()
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");
            Guid? currentUserId = Guid.TryParse(userIdString, out var uid) ? uid : null;

            var promos = await _context.Promotions
                .Where(p => p.IsActive && (p.TargetUserId == null || p.TargetUserId == currentUserId))
                .ToListAsync();

            return Ok(promos);
        }

        // ADMIN: GET: api/promotions/admin (Все акции для админки)
        [Authorize(Roles = "Admin")]
        [HttpGet("admin")]
        public async Task<IActionResult> GetAllPromotionsAdmin()
        {
            var promos = await _context.Promotions
                .Include(p => p.TargetUser)
                .ToListAsync();
            return Ok(promos);
        }

        // ADMIN: POST: api/promotions
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> CreatePromotion([FromBody] PromotionDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Title))
                return BadRequest(new { message = "Название акции обязательно." });

            var promo = new Promotion
            {
                Title = dto.Title.Trim(),
                Description = dto.Description?.Trim() ?? string.Empty,
                DiscountAmount = dto.DiscountAmount,
                DiscountPercentage = dto.DiscountPercentage,
                TargetUserId = dto.TargetUserId,
                ColorTheme = string.IsNullOrWhiteSpace(dto.ColorTheme) ? "emerald" : dto.ColorTheme.Trim(),
                IsActive = dto.IsActive
            };

            _context.Promotions.Add(promo);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Акция успешно создана!", promo });
        }

        // ADMIN: PUT: api/promotions/{id}
        [Authorize(Roles = "Admin")]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdatePromotion(int id, [FromBody] PromotionDto dto)
        {
            var promo = await _context.Promotions.FindAsync(id);
            if (promo == null)
                return NotFound(new { message = "Акция не найдена." });

            if (string.IsNullOrWhiteSpace(dto.Title))
                return BadRequest(new { message = "Название акции обязательно." });

            promo.Title = dto.Title.Trim();
            promo.Description = dto.Description?.Trim() ?? string.Empty;
            promo.DiscountAmount = dto.DiscountAmount;
            promo.DiscountPercentage = dto.DiscountPercentage;
            promo.TargetUserId = dto.TargetUserId;
            promo.ColorTheme = string.IsNullOrWhiteSpace(dto.ColorTheme) ? "emerald" : dto.ColorTheme.Trim();
            promo.IsActive = dto.IsActive;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Акция успешно обновлена!", promo });
        }

        // ADMIN: DELETE: api/promotions/{id}
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeletePromotion(int id)
        {
            var promo = await _context.Promotions.FindAsync(id);
            if (promo == null)
                return NotFound(new { message = "Акция не найдена." });

            _context.Promotions.Remove(promo);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Акция удалена." });
        }
    }

    public class PromotionDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal? DiscountAmount { get; set; }
        public int? DiscountPercentage { get; set; }
        public Guid? TargetUserId { get; set; }
        public string ColorTheme { get; set; } = "emerald";
        public bool IsActive { get; set; } = true;
    }
}
