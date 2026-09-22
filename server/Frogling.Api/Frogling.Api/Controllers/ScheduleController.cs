using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Frogling.Api.Data;

namespace Frogling.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ScheduleController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ScheduleController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/schedule
        [HttpGet]
        public async Task<IActionResult> GetSchedule()
        {
            var schedule = await _context.ScheduleItems
                .Include(s => s.Trainer)
                .OrderBy(s => s.DayOfWeek)
                .ThenBy(s => s.Time)
                .Select(s => new
                {
                    s.Id,
                    s.DayOfWeek,
                    s.Time,
                    s.GroupName,
                    s.AvailableSlots,
                    TrainerName = s.Trainer != null ? s.Trainer.Name : "Инструктор",
                    TrainerSpecialization = s.Trainer != null ? s.Trainer.Specialization : "",
                    TrainerPhoto = s.Trainer != null ? s.Trainer.PhotoUrl : "🐸"
                })
                .ToListAsync();

            return Ok(schedule);
        }
    }
}
