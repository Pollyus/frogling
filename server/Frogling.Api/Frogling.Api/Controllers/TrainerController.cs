using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Frogling.Api.Data;
using System.Globalization;
using Frogling.Api.Models;

namespace Frogling.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TrainerController : Controller
    {
        private readonly AppDbContext _context;
        public TrainerController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/trainer
        [HttpGet]
        public async Task<IActionResult> GetTrainer()
        {
            var trainer = await _context.Trainers
                .Select(t => new
                {
                    t.Id,
                    t.Name,
                    t.PhotoUrl
                })
                .ToListAsync();

            return Ok(trainer);
        }

    }
}
