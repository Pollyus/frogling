// Models/Subscription.cs
using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Frogling.Api.Models 
{
    public class SubscriptionPrice
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public int TotalLessons { get; set; }

        public int RemainingLessons { get; set; }

        public DateTime PurchaseDate { get; set; } = DateTime.UtcNow;

        public DateTime ExpiryDate { get; set; }

        public bool IsActive { get; set; } = true;

        // Внешний ключ пользователя
        public Guid UserId { get; set; }

        [JsonIgnore]
        public User? User { get; set; }
    }

    public class BuySubscriptionDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int TotalLessons { get; set; }
        public int DaysValid { get; set; } = 30;
        public int PromotionId { get; set; }
    }
}
