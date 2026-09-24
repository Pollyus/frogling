namespace Frogling.Api.Models
{
    public class User
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty; // Храним только хеш, а не пароль в открытом виде
        public bool IsMedicalCheckValid { get; set; } = false;
        public string Phone{ get; set; } = string.Empty;
        public string ParentName { get; set; } = string.Empty;
        public string Role { get; set; } = "User";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public List<SubscriptionPrice> Subscriptions { get; set; } = new();
    }
}
