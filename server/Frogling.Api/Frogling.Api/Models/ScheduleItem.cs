using System.ComponentModel.DataAnnotations;

namespace Frogling.Api.Models
{
    public class ScheduleItem
    {
        public int Id { get; set; }
        [Required]
        public DateTime ClassDate { get; set; }
        
        public string GroupName { get; set; } = string.Empty; // "Грудничковое плавание (2-6 мес)"
        public int AgeCategory { get; set; } = 3;             // Возраст в годах или диапазон
        public int AvailableSlots { get; set; } = 6;          // Свободных мест

        public int TrainerId { get; set; }
        public Trainer? Trainer { get; set; }

        public string DayOfWeek => ClassDate.ToString("dddd", new System.Globalization.CultureInfo("ru-RU"));
        public string Time => ClassDate.ToString("HH:mm");
    }
}
