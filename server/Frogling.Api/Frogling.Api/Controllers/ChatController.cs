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

        private Guid? GetCurrentUserId()
        {
            var val = User.FindFirstValue(ClaimTypes.NameIdentifier)
                      ?? User.FindFirstValue(JwtRegisteredClaimNames.Sub)
                      ?? User.FindFirstValue("sub");

            if (Guid.TryParse(val, out var userId)) return userId;
            return null;
        }

        // GET: api/chat/history/{withUserId}
        [HttpGet("history/{withUserId}")]
        public async Task<IActionResult> GetChatHistory(string withUserId)
        {
            var currentUserId = GetCurrentUserId();
            if (currentUserId == null) return Unauthorized();

            // Защита от 404: если ID невалидный или пустой, просто возвращаем пустой список
            if (string.IsNullOrEmpty(withUserId) || withUserId == "undefined" || withUserId == "null")
                return Ok(new List<ChatMessage>());

            if (!Guid.TryParse(withUserId, out var withUserIdGuid))
                return BadRequest(new { message = "Некорректный ID пользователя." });

            var messages = await _context.ChatMessages
                .Where(m => (m.SenderId == currentUserId && m.ReceiverId == withUserIdGuid) ||
                            (m.SenderId == withUserIdGuid && m.ReceiverId == currentUserId))
                .OrderBy(m => m.SentAt)
                .ToListAsync();

            return Ok(messages);
        }

        // POST: api/chat/send
        [HttpPost("send")]
        public async Task<IActionResult> SendMessage([FromBody] SendMessageDto dto)
        {
            if (dto == null || string.IsNullOrWhiteSpace(dto.Text))
                return BadRequest(new { message = "Введите текст сообщения." });

            if (dto.ReceiverId == Guid.Empty)
                return BadRequest(new { message = "Не указан получатель сообщения." });

            var senderId = GetCurrentUserId();
            if (senderId == null)
                return Unauthorized(new { message = "Пользователь не авторизован." });

            var message = new ChatMessage
            {
                SenderId = senderId.Value,
                ReceiverId = dto.ReceiverId,
                Text = dto.Text.Trim(),
                SentAt = DateTime.UtcNow,
                IsRead = false,
                Emoji = null // Явно передаем null
            };

            _context.ChatMessages.Add(message);
            await _context.SaveChangesAsync();

            return Ok(message);
        }


        // PATCH: api/chat/react/{messageId}
        [HttpPatch("react/{messageId:int}")]
        public async Task<IActionResult> ReactToMessage(int messageId, [FromBody] ReactChatDto dto)
        {
            var currentUserId = GetCurrentUserId();
            var message = await _context.ChatMessages.FindAsync(messageId);

            if (message == null) return NotFound();

            if (message.SenderId != currentUserId && message.ReceiverId != currentUserId)
                return Forbid();

            message.Emoji = dto?.Emoji;
            await _context.SaveChangesAsync();

            return Ok(new { messageId, emoji = message.Emoji });
        }
    }

    // ВАЖНО: Добавьте эти классы прямо здесь или в папку Models
    public class SendChatDto
    {
        public Guid ReceiverId { get; set; }
        public string Text { get; set; } = string.Empty;
    }

    public class ReactChatDto
    {
        public string? Emoji { get; set; }
    }
}