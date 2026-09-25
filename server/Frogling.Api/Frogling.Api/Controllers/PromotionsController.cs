using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Frogling.Api.Data;
using System;
using System.Threading.Tasks;

namespace Frogling.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PromotionsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PromotionsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/promotions (Получить список активных акций для фронтенда)
        [HttpGet]
        public async Task<IActionResult> GetActivePromotions()
        {
            var now = DateTime.UtcNow;

            // Загружаем только активные и не просроченные акции
            var promotions = await _context.Promotions
                .Where(p => p.IsActive && p.ExpiryDate > now)
                .ToListAsync();

            return Ok(promotions);
        }
    }
}
