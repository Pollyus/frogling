using System.ComponentModel.DataAnnotations;

namespace Frogling.Api.Models
{
    public class Trainer
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty; // Например, "Анна Сергеевна"
        public string Specialization { get; set; } = "Тренер по плаванию";
        public string PhotoUrl { get; set; } = "🐸"; // Эмодзи или ссылка на фото
        public string Certificates { get; set; } = string.Empty;
        public string SportsСategory { get; set; } = string.Empty;
        public string SportsСareer { get; set; } = string.Empty;
        public string Education { get; set; } = string.Empty;
        public string Experience { get; set; } = string.Empty;
        public List<ScheduleItem> ScheduleItems { get; set; } = new();
    }

    public class ScheduleItem
    {
        public int Id { get; set; }
        [Required]
        public string DayOfWeek { get; set; } = string.Empty; // "Понедельник", "Среда" и т.д.
        [Required]
        public string Time { get; set; } = string.Empty;       // "16:30 - 17:15"
        public string GroupName { get; set; } = string.Empty; // "Грудничковое плавание (2-6 мес)"
        public int AgeCategory { get; set; } = 3;             // Возраст в годах или диапазон
        public int AvailableSlots { get; set; } = 6;          // Свободных мест

        public int TrainerId { get; set; }
        public Trainer? Trainer { get; set; }
    }
}
