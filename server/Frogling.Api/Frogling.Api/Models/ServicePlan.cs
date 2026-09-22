using System.ComponentModel.DataAnnotations;

namespace Frogling.Api.Models
{
    public class ServicePlan
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;       // Название: "Юный пловец"

        public decimal Price { get; set; }                      // Цена: 4800

        public int LessonsCount { get; set; }                   // Количество занятий: 8

        public string Description { get; set; } = string.Empty; // Описание тарифа

        public string Category { get; set; } = "Групповые";     // Категория / тип

        public string ColorTheme { get; set; } = "emerald";     // Цветовая тема для UI (emerald, blue, amber)

        public int DurationDays { get; set; } = 30;             // Срок действия в днях

        public bool IsActive { get; set; } = true;
    }
}
