using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Frogling.Api.Data;
using Frogling.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Frogling.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/profile")]
public class ProfileController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProfileController(AppDbContext context)
    {
        _context = context;
    }

    private Guid? GetCurrentUserId()
    {
        var value =
            User.FindFirstValue(ClaimTypes.NameIdentifier) ??
            User.FindFirstValue(JwtRegisteredClaimNames.Sub) ??
            User.FindFirstValue("sub");

        return Guid.TryParse(value, out var id) ? id : null;
    }

    [HttpGet]
    public async Task<IActionResult> GetProfile()
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        var user = await _context.Users
            .AsNoTracking()
            .Where(u => u.Id == userId.Value)
            .Select(u => new
            {
                u.FullName,
                u.Email,
                u.Phone,
                u.ParentName
            })
            .FirstOrDefaultAsync();

        return user == null ? NotFound() : Ok(user);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateProfile(UpdateProfileDto dto)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Id == userId.Value);

        if (user == null) return NotFound();

        var email = dto.Email.Trim().ToLowerInvariant();

        var emailTaken = await _context.Users.AnyAsync(u =>
            u.Id != userId.Value && u.Email == email);

        if (emailTaken)
            return Conflict(new { message = "Этот email уже используется." });

        user.FullName = dto.FullName.Trim();
        user.Email = email;
        user.Phone = dto.Phone.Trim();
        user.ParentName = dto.ParentName.Trim();

        await _context.SaveChangesAsync();

        return Ok(new
        {
            user.FullName,
            user.Email,
            user.Phone,
            user.ParentName
        });
    }
}
