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

        // GET: api/promotions (для клиентов)
        [HttpGet]
        public async Task<IActionResult> GetPromotions()
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");
            var currentUserId = userIdString?.ToLower();

            var allPromos = await _context.Promotions
                .Where(p => p.IsActive)
                .ToListAsync();

            // Если TargetUserIds пустой - акция для всех
            // Если указаны ID - проверяем, входит ли текущий юзер в список
            var filtered = allPromos.Where(p =>
                string.IsNullOrWhiteSpace(p.TargetUserIds) ||
                (!string.IsNullOrEmpty(currentUserId) && p.TargetUserIds.ToLower().Contains(currentUserId))
            ).ToList();

            return Ok(filtered);
        }
    }
}
