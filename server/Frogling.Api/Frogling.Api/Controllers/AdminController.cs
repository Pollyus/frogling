using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Frogling.Api.Data;
using Frogling.Api.Models;
using System.Security.Claims;

namespace Frogling.Api.Controllers
{
    [Authorize(Roles = "Admin,Trainer")]
    [ApiController]
    [Route("api/admin")]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/admin/users
        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsersForAdmin()
        {
            var users = await _context.Users
                .Select(u => new
                {
                    u.Id,
                    u.FullName,
                    u.Email,
                    u.Role,
                    u.MedicalCheckDate,
                    u.Phone,
                    u.ParentName
                })
                .ToListAsync();

            return Ok(users);
        }


        // PUT: api/admin/users/{id}/medical-check
        [HttpPut("users/{id:guid}/medical-check")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateMedicalCheck(Guid id, [FromBody] UpdateMedicalCheckDto dto)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound(new { message = "Пользователь не найден." });

            // Устанавливаем дату, переводя её в UTC (важно для БД)
            user.MedicalCheckDate = dto.MedicalCheckDate?.ToUniversalTime() ?? DateTime.UtcNow;

            await _context.SaveChangesAsync();

            // ВАЖНО: Мы возвращаем объект, чтобы фронтенду было что парсить
            return Ok(new
            {
                success = true,
                message = "Дата медосмотра успешно обновлена!",
                newDate = user.MedicalCheckDate
            });
        }


        // GET: api/admin/promotions
        [HttpGet("promotions")]
        public async Task<IActionResult> GetAllPromotions()
        {
            var promos = await _context.Promotions.ToListAsync();
            return Ok(promos);
        }

        // POST: api/admin/promotions
        [HttpPost("promotions")]
        public async Task<IActionResult> CreatePromotion([FromBody] UpdatePromotionDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Title))
                return BadRequest(new { message = "Название акции обязательно." });

            var targetIds = dto.TargetUserIds != null && dto.TargetUserIds.Any()
                ? string.Join(",", dto.TargetUserIds.Where(id => !string.IsNullOrWhiteSpace(id)))
                : null;

            var promo = new Promotion
            {
                Title = dto.Title.Trim(),
                Description = dto.Description?.Trim() ?? string.Empty,
                DiscountAmount = dto.DiscountAmount,
                DiscountPercentage = dto.DiscountPercentage,
                TargetUserIds = targetIds,
                ColorTheme = string.IsNullOrWhiteSpace(dto.ColorTheme) ? "emerald" : dto.ColorTheme.Trim(),
                IsActive = dto.IsActive
            };

            _context.Promotions.Add(promo);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Акция успешно создана!", promo });
        }

        // PUT: api/admin/promotions/{id}
        [HttpPut("promotions/{id:int}")]
        public async Task<IActionResult> UpdatePromotion(int id, [FromBody] UpdatePromotionDto dto)
        {
            var promo = await _context.Promotions.FindAsync(id);
            if (promo == null)
                return NotFound(new { message = "Акция не найдена." });

            if (string.IsNullOrWhiteSpace(dto.Title))
                return BadRequest(new { message = "Название акции обязательно." });

            var targetIds = dto.TargetUserIds != null && dto.TargetUserIds.Any()
                ? string.Join(",", dto.TargetUserIds.Where(id => !string.IsNullOrWhiteSpace(id)))
                : null;

            promo.Title = dto.Title.Trim();
            promo.Description = dto.Description?.Trim() ?? string.Empty;
            promo.DiscountAmount = dto.DiscountAmount;
            promo.DiscountPercentage = dto.DiscountPercentage;
            promo.TargetUserIds = targetIds;
            promo.ColorTheme = string.IsNullOrWhiteSpace(dto.ColorTheme) ? "emerald" : dto.ColorTheme.Trim();
            promo.IsActive = dto.IsActive;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Акция успешно обновлена!", promo });
        }

        // DELETE: api/admin/promotions/{id}
        [HttpDelete("promotions/{id:int}")]
        public async Task<IActionResult> DeletePromotion(int id)
        {
            var promo = await _context.Promotions.FindAsync(id);
            if (promo == null)
                return NotFound(new { message = "Акция не найдена." });

            _context.Promotions.Remove(promo);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Акция удалена." });
        }

        // Управление услугами и расписанием
        [HttpPut("services/{id:int}")]
        public async Task<IActionResult> UpdateServicePlan(int id, [FromBody] UpdateServicePlanDto dto)
        {
            var plan = await _context.ServicePlans.FindAsync(id);
            if (plan == null) return NotFound(new { message = "Услуга не найдена." });

            plan.Title = dto.Title.Trim();
            plan.Price = dto.Price >= 0 ? dto.Price : plan.Price;
            plan.LessonsCount = dto.LessonsCount > 0 ? dto.LessonsCount : plan.LessonsCount;
            plan.DurationDays = dto.DurationDays > 0 ? dto.DurationDays : plan.DurationDays;
            plan.Description = dto.Description?.Trim() ?? string.Empty;
            plan.Category = dto.Category?.Trim() ?? "Разовые";
            plan.ColorTheme = dto.ColorTheme?.Trim() ?? "emerald";

            await _context.SaveChangesAsync();
            return Ok(new { message = "Карточка услуги успешно обновлена!", plan });
        }

        [Authorize(Roles = "Admin,Trainer")]
        [HttpPost("schedule")]
        public async Task<IActionResult> CreateScheduleItem([FromBody] UpdateScheduleDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.GroupName) || !dto.StartAt.HasValue)
                return BadRequest(new { message = "Заполните название и дату начала." });

            var dt = dto.StartAt.Value;
            var exactStartAt = new DateTime(dt.Year, dt.Month, dt.Day, dt.Hour, dt.Minute, 0, DateTimeKind.Utc);

            var scheduleItem = new ScheduleItem
            {
                GroupName = dto.GroupName.Trim(),
                StartAt = exactStartAt,
                DurationMinutes = dto.DurationMinutes > 0 ? dto.DurationMinutes : 45,
                TrainerId = dto.TrainerId > 0 ? dto.TrainerId : 1,
                AvailableSlots = dto.AvailableSlots,
                TotalSlots = dto.TotalSlots > 0 ? dto.TotalSlots : 3
            };

            _context.ScheduleItems.Add(scheduleItem);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Занятие создано.", scheduleItem.Id });
        }

        [Authorize(Roles = "Admin,Trainer")]
        [HttpPut("schedule/{id:int}")]
        public async Task<IActionResult> UpdateScheduleItem(int id, [FromBody] UpdateScheduleDto dto)
        {
            var scheduleItem = await _context.ScheduleItems.FindAsync(id);
            if (scheduleItem == null) return NotFound(new { message = "Занятие не найдено." });

            var dt = dto.StartAt.Value;
            scheduleItem.GroupName = dto.GroupName.Trim();
            scheduleItem.StartAt = new DateTime(dt.Year, dt.Month, dt.Day, dt.Hour, dt.Minute, 0, DateTimeKind.Utc);
            scheduleItem.DurationMinutes = dto.DurationMinutes > 0 ? dto.DurationMinutes : 45;
            scheduleItem.TrainerId = dto.TrainerId;
            scheduleItem.AvailableSlots = dto.AvailableSlots >= 0 ? dto.AvailableSlots : 3;
            scheduleItem.TotalSlots = dto.TotalSlots > 0 ? dto.TotalSlots : 3;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Занятие обновлено." });
        }

        [Authorize(Roles = "Admin,Trainer")]
        [HttpDelete("schedule/{id:int}")]
        public async Task<IActionResult> DeleteScheduleItem(int id)
        {
            var scheduleItem = await _context.ScheduleItems.Include(s => s.Bookings).FirstOrDefaultAsync(s => s.Id == id);
            if (scheduleItem == null) return NotFound(new { message = "Занятие не найдено." });

            if (scheduleItem.Bookings.Any())
                return Conflict(new { message = "Нельзя удалить занятие с записанными пользователями." });

            _context.ScheduleItems.Remove(scheduleItem);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Занятие удалено." });
        }

        [Authorize(Roles = "Admin,Trainer")]
        [HttpGet("schedule/archive")]
        public async Task<IActionResult> GetArchive()
        {
            // Текущее точное время (UTC)
            var now = DateTime.UtcNow;
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");

            var query = _context.ScheduleItems
                .Include(s => s.Trainer)
                .AsEnumerable() // Переходим в память, чтобы корректно учесть продолжительность занятия (StartAt + DurationMinutes)
                .Where(s => {
                    // Занятие считается прошедшим, когда истекло его время (Начало + Длительность)
                    var endTime = s.StartAt.AddMinutes(s.DurationMinutes > 0 ? s.DurationMinutes : 45);
                    return endTime < now;
                })
                .AsQueryable();

            // Если пользователь — Тренер, показываем только его занятия
            if (User.IsInRole("Trainer"))
            {
                if (Guid.TryParse(userIdString, out var trainerUserId))
                {
                    var trainerId = await _context.Trainers
                        .Where(t => t.UserId == trainerUserId)
                        .Select(t => (int?)t.Id)
                        .FirstOrDefaultAsync();

                    if (trainerId.HasValue)
                    {
                        query = query.Where(s => s.TrainerId == trainerId.Value);
                    }
                    else
                    {
                        return Ok(new List<object>()); // Тренер не привязан к профилю
                    }
                }
            }

            var items = query
                .OrderByDescending(s => s.StartAt)
                .Select(s => new
                {
                    s.Id,
                    s.GroupName,
                    StartAt = s.StartAt,
                    EndAt = s.StartAt.AddMinutes(s.DurationMinutes > 0 ? s.DurationMinutes : 45),
                    s.DurationMinutes,
                    s.TrainerId,
                    TrainerName = s.Trainer != null ? s.Trainer.Name : "Инструктор",
                    Participants = _context.Bookings
                        .Where(b => b.ScheduleItemId == s.Id)
                        .Include(b => b.User)
                        .Select(b => new
                        {
                            b.Id,
                            StudentName = b.User != null ? b.User.FullName : "Клиент",
                            ParentName = b.User != null ? b.User.ParentName : "",
                            Phone = b.User != null ? b.User.Phone : "",
                            Email = b.User != null ? b.User.Email : ""
                        })
                        .ToList()
                })
                .ToList();

            return Ok(items);
        }

        // PUT: api/admin/users/{id}
        [HttpPut("users/{id:guid}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AdminUpdateUser(Guid id, [FromBody] AdminUpdateUserDto dto)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound(new { message = "Пользователь не найден." });

            user.FullName = string.IsNullOrWhiteSpace(dto.FullName) ? user.FullName : dto.FullName.Trim();
            user.Phone = dto.Phone?.Trim() ?? user.Phone;
            user.ParentName = dto.ParentName?.Trim() ?? user.ParentName;

            if (dto.MedicalCheckDate.HasValue)
            {
                user.MedicalCheckDate = dto.MedicalCheckDate.Value.ToUniversalTime();
            }

            await _context.SaveChangesAsync();

            return Ok(new { message = "Данные клиента успешно обновлены!" });
        }

    }

    // DTO для обновления данных клиента в админке
    public class AdminUpdateUserDto
    {
        public string? FullName { get; set; }
        public string? Phone { get; set; }
        public string? ParentName { get; set; }
        public DateTime? MedicalCheckDate { get; set; }
    }

    public class UpdateMedicalCheckDto
    {
        public DateTime? MedicalCheckDate { get; set; }
    }

    public class UpdatePromotionDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal? DiscountAmount { get; set; }
        public int? DiscountPercentage { get; set; }
        public List<string>? TargetUserIds { get; set; }
        public string ColorTheme { get; set; } = "emerald";
        public bool IsActive { get; set; } = true;
    }

    public class UpdateServicePlanDto
    {
        public string Title { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int LessonsCount { get; set; }
        public int DurationDays { get; set; }
        public string Description { get; set; } = string.Empty;
        public string Category { get; set; } = "Разовые";
        public string ColorTheme { get; set; } = "emerald";
    }

    public class UpdateScheduleDto
    {
        public string? GroupName { get; set; }
        public DateTime? StartAt { get; set; }
        public int DurationMinutes { get; set; } = 45;
        public int TrainerId { get; set; }
        public int AvailableSlots { get; set; }
        public int TotalSlots { get; set; } 
    }
}
