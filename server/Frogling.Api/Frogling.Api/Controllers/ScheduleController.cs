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
                .OrderBy(s => s.ClassDate)
                .Select(s => new
                {
                    s.Id,
                    // Передаем дату в ISO формате для React
                    Date = s.ClassDate,
                    DayOfWeek = s.ClassDate.ToString("dddd", new System.Globalization.CultureInfo("ru-RU")),
                    Time = s.ClassDate.ToString("HH:mm"),
                    s.GroupName,
                    s.AvailableSlots,
                    TrainerName = s.Trainer != null ? s.Trainer.Name : "Инструктор",
                    TrainerPhoto = s.Trainer != null ? s.Trainer.PhotoUrl : "🐸"
                })
                .ToListAsync();

            return Ok(schedule);
        }
    }
}
