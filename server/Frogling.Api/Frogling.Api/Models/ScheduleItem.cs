using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Frogling.Api.Models
{
    public class ScheduleItem
    {
        public int Id { get; set; }

        // Дата и время начала занятия
        public DateTime StartAt { get; set; }

        // Длительность занятия в минутах (по умолчанию 45 минут)
        public int DurationMinutes { get; set; } = 45;

        // Вычисляемое свойство: время окончания рассчитывается автоматически
        public DateTime EndAt => StartAt.AddMinutes(DurationMinutes);

        [Required]
        public string GroupName { get; set; } = string.Empty;

        public int AvailableSlots { get; set; }

        public int TrainerId { get; set; }

        [JsonIgnore]
        public Trainer? Trainer { get; set; }

        [JsonIgnore]
        public List<Booking> Bookings { get; set; } = new();
    }
}

