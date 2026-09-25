using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Frogling.Api.Data;

namespace Frogling.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServicesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ServicesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/services (Публичный список всех активных услуг )
        [HttpGet]
        public async Task<IActionResult> GetServices()
        {
            var services = await _context.ServicePlans
                .Where(s => s.IsActive)
                .OrderBy(s => s.Price)
                .ToListAsync();

            return Ok(services);
        }

        // GET: api/services/5 (Получение конкретной услуги)
        [HttpGet("{id}")]
        public async Task<IActionResult> GetServiceById(int id)
        {
            var service = await _context.ServicePlans.FindAsync(id);
            if (service == null)
                return NotFound(new { message = "Услуга не найдена" });

            return Ok(service);
        }
    }
}
