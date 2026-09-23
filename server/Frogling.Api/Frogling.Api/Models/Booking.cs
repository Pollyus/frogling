using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Frogling.Api.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public DateTime BookedAt { get; set; } = DateTime.UtcNow;

        // Связь с пользователем
        public Guid UserId { get; set; }
        [JsonIgnore]
        public User? User { get; set; }
        public DateTime ScheduledAt { get; set; }

        // Связь с занятием в расписании
        public int ScheduleItemId { get; set; }
        public ScheduleItem? ScheduleItem { get; set; }
    }
}
