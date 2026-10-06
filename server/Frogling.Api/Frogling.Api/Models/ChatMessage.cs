using System;
using System.ComponentModel.DataAnnotations;

namespace Frogling.Api.Models
{
    // Сущность сообщения чата
    public class ChatMessage
    {
        public int Id { get; set; }

        public Guid SenderId { get; set; } // Отправитель


        public Guid ReceiverId { get; set; } // Получатель

        [Required]
        public string Text { get; set; } = string.Empty;

        public DateTime SentAt { get; set; } = DateTime.UtcNow;

        public bool IsRead { get; set; } = false;

        public string? Emoji { get; set; } // <-- ВАЖНО: добавлен знак ? (nullable)
    }

    // DTO для отправки нового сообщения
    public class SendMessageDto
    {
        [Required]
        public Guid ReceiverId { get; set; }

        [Required]
        public string Text { get; set; } = string.Empty;

        public string? Emoji { get; set; }
    }
}
