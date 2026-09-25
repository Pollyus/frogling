using System;

namespace Frogling.Api.Models
{
    public class Promotion
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty; // Название акции
        public string Description { get; set; } = string.Empty; // Описание
        public decimal DiscountAmount { get; set; } // Скидка в рублях (например, 500 ₽)
        public int DiscountPercentage { get; set; } // Скидка в процентах (например, 10%), если используется
        public DateTime ExpiryDate { get; set; } // Срок действия акции
        public bool IsActive { get; set; } = true; // Активна ли акция в данный момент
    }
}
