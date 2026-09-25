using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Frogling.Api.Data;
using Frogling.Api.Models;

namespace Frogling.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/chat")]
    public class ChatController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ChatController(AppDbContext context)
        {
            _context = context;
        }

        private Guid GetCurrentUserId()
        {
            var val = User.FindFirstValue(ClaimTypes.NameIdentifier)
                      ?? User.FindFirstValue(JwtRegisteredClaimNames.Sub)
                      ?? User.FindFirstValue("sub");

            return Guid.Parse(val!);
        }

        // GET: api/chat/history/{withUserId}
        // Получить историю сообщений с конкретным пользователем
        [HttpGet("history/{withUserId:guid}")]
        public async Task<IActionResult> GetChatHistory(Guid withUserId)
        {
            var currentUserId = GetCurrentUserId();

            var messages = await _context.ChatMessages
                .Where(m => (m.SenderId == currentUserId && m.ReceiverId == withUserId) ||
                            (m.SenderId == withUserId && m.ReceiverId == currentUserId))
                .OrderBy(m => m.SentAt)
                .ToListAsync();

            return Ok(messages);
        }

        // POST: api/chat/send
        // Отправить сообщение родителю или тренеру
        [HttpPost("send")]
        public async Task<IActionResult> SendMessage([FromBody] SendMessageDto dto)
        {
            if (!ModelState.IsValid || string.IsNullOrWhiteSpace(dto.Text))
                return BadRequest(new { message = "Сообщение не может быть пустым." });

            var currentUserId = GetCurrentUserId();

            var message = new ChatMessage
            {
                SenderId = currentUserId,
                ReceiverId = dto.ReceiverId,
                Text = dto.Text.Trim(),
                SentAt = DateTime.UtcNow
            };

            _context.ChatMessages.Add(message);
            await _context.SaveChangesAsync();

            return Ok(message);
        }
    }
}
