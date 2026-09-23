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

}
