using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Frogling.Api.Data;
using Frogling.Api.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;


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
            var userIdValue =
                User.FindFirstValue(ClaimTypes.NameIdentifier) ??
                User.FindFirstValue(JwtRegisteredClaimNames.Sub) ??
                User.FindFirstValue("sub");

            Guid.TryParse(userIdValue, out var userId);

            var promotions = await _context.Promotions
                .Where(p => p.IsActive && p.ExpiryDate > DateTime.UtcNow)
                .ToListAsync();

            var result = promotions.Where(p =>
                string.IsNullOrWhiteSpace(p.TargetUserIds) ||
                p.TargetUserIds
                    .Split(',', StringSplitOptions.RemoveEmptyEntries)
                    .Select(x => x.Trim())
                    .Any(x => Guid.TryParse(x, out var targetId) && targetId == userId)
            );

            return Ok(result);
        }
    }
}
