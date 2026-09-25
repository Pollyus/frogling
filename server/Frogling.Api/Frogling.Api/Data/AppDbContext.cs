using Microsoft.EntityFrameworkCore;
using Frogling.Api.Models;

namespace Frogling.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<SubscriptionPrice> Subscriptions { get; set; } = null!;
        public DbSet<ServicePlan> ServicePlans { get; set; } = null!;
        public DbSet<Trainer> Trainers { get; set; } = null!;
        public DbSet<ChatMessage> ChatMessages { get; set; } = null!;
        public DbSet<ScheduleItem> ScheduleItems { get; set; } = null!;
        public DbSet<Booking> Bookings { get; set; } = null!;
        public DbSet<Promotion> Promotions { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // 1. Настройка связей (Foreign Keys и каскадное удаление)
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Subscription)
                .WithMany()
                .HasForeignKey(b => b.SubscriptionId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.ScheduleItem)
                .WithMany()
                .HasForeignKey(b => b.ScheduleItemId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.User)
                .WithMany()
                .HasForeignKey(b => b.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<SubscriptionPrice>()
                .HasOne(s => s.User)
                .WithMany(u => u.Subscriptions)
                .HasForeignKey(s => s.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // Связь Trainer -> User 
            modelBuilder.Entity<Trainer>()
                .HasOne(t => t.User)
                .WithOne()
                .HasForeignKey<Trainer>(t => t.UserId)
                .OnDelete(DeleteBehavior.SetNull);

            // 2. Начальные карточки услуг (каталог)
            modelBuilder.Entity<ServicePlan>().HasData(
                new ServicePlan { Id = 1, Title = "Пробное занятие", Price = 0, LessonsCount = 1, Description = "Знакомство с тренером и водой для малышей от 2 месяцев.", Category = "Разовые", ColorTheme = "emerald", DurationDays = 7, IsActive = true },
                new ServicePlan { Id = 2, Title = "Юный пловец", Price = 6000, LessonsCount = 4, Description = "Идеально для начинающих. 4 занятия, которые можете посетить в любые дни месяца по записи", Category = "Абонементы", ColorTheme = "emerald", DurationDays = 30, IsActive = true },
                new ServicePlan { Id = 3, Title = "Семейный абонемент", Price = 7400, LessonsCount = 4, Description = "Занятия родителя, тренера и ребенка. 4 занятия в месяц", Category = "Абонементы", ColorTheme = "blue", DurationDays = 45, IsActive = true },
                new ServicePlan { Id = 4, Title = "Групповое посещение", Price = 1100, LessonsCount = 1, Description = "Разовое занятие групповое", Category = "Разовое", ColorTheme = "amber", DurationDays = 30, IsActive = true },
                new ServicePlan { Id = 5, Title = "Индивидуальное с тренером", Price = 1600, LessonsCount = 1, Description = "Персональное 45-минутное занятие один на один с инструктором.", Category = "Персональные", ColorTheme = "blue", DurationDays = 14, IsActive = true },
                new ServicePlan { Id = 6, Title = "Разовые посещение", Price = 1600, LessonsCount = 1, Description = "Персональное занятие 60 минут", Category = "Разовые", ColorTheme = "emerald", DurationDays = 30, IsActive = true },
                new ServicePlan { Id = 7, Title = "Активный пловец", Price = 11500, LessonsCount = 8, Description = "Идеально для начинающих. 8 занятий, которые можете посетить в любые дни месяца по записи", Category = "Абонементы", ColorTheme = "emerald", DurationDays = 30, IsActive = true },
                new ServicePlan { Id = 8, Title = "Семейный Плюс", Price = 14000, LessonsCount = 8, Description = "Занятия родителя, тренера и ребенка. 8 занятия в месяц", Category = "Абонементы", ColorTheme = "blue", DurationDays = 45, IsActive = true },
                new ServicePlan { Id = 9, Title = "Групповой абонемент", Price = 4100, LessonsCount = 4, Description = "Абонемент за 4 групповых занятия", Category = "Разовое", ColorTheme = "amber", DurationDays = 30, IsActive = true },
                new ServicePlan { Id = 10, Title = "Групповой абонемент", Price = 8000, LessonsCount = 8, Description = "Абонемент за 8 групповых занятия", Category = "Разовое", ColorTheme = "amber", DurationDays = 30, IsActive = true }
            );

            // 3. Расписание
            modelBuilder.Entity<ScheduleItem>().HasData(
                new ScheduleItem { Id = 1, StartAt = new DateTime(2026, 10, 5, 10, 0, 0, DateTimeKind.Utc), DurationMinutes = 45, GroupName = "Грудничковое плавание", AvailableSlots = 6, TrainerId = 1 },
                new ScheduleItem { Id = 2, StartAt = new DateTime(2026, 10, 6, 16, 30, 0, DateTimeKind.Utc), DurationMinutes = 45, GroupName = "Малыши 1–3 года", AvailableSlots = 5, TrainerId = 2 },
                new ScheduleItem { Id = 3, StartAt = new DateTime(2026, 10, 7, 15, 0, 0, DateTimeKind.Utc), DurationMinutes = 45, GroupName = "Головастики 4–6 лет", AvailableSlots = 6, TrainerId = 1 },
                new ScheduleItem { Id = 4, StartAt = new DateTime(2026, 10, 8, 17, 15, 0, DateTimeKind.Utc), DurationMinutes = 45, GroupName = "Пловцы 7–10 лет", AvailableSlots = 4, TrainerId = 3 },
                new ScheduleItem { Id = 5, StartAt = new DateTime(2026, 10, 9, 16, 0, 0, DateTimeKind.Utc), DurationMinutes = 45, GroupName = "Интенсив", AvailableSlots = 5, TrainerId = 2 },
                new ScheduleItem { Id = 6, StartAt = new DateTime(2026, 10, 10, 10, 0, 0, DateTimeKind.Utc), DurationMinutes = 45, GroupName = "Семейное плавание", AvailableSlots = 8, TrainerId = 1 },
                new ScheduleItem { Id = 7, StartAt = new DateTime(2026, 10, 11, 12, 0, 0, DateTimeKind.Utc), DurationMinutes = 45, GroupName = "Свободное плавание", AvailableSlots = 10, TrainerId = 3 }
            );

            // 4. Сначала создаем ВСЕХ пользователей (Админ + Тренеры)
            string adminPasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123");
            string trainerPasswordHash = BCrypt.Net.BCrypt.HashPassword("trainer123");

            Guid adminUserId = Guid.Parse("11111111-1111-1111-1111-111111111111");
            Guid trainerUserId4 = Guid.Parse("44444444-4444-4444-4444-444444444444"); // Любовь
            Guid trainerUserId = Guid.Parse("22222222-2222-2222-2222-222222222222");  // Владислав
            Guid trainerUserId3 = Guid.Parse("33333333-3333-3333-3333-333333333333"); // Лидия

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = adminUserId,
                    FullName = "Главный Администратор",
                    Email = "admin@frogling.ru",
                    PasswordHash = adminPasswordHash,
                    Role = "Admin",
                    MedicalCheckDate = DateTime.UtcNow
                },
                new User
                {
                    Id = trainerUserId4,
                    FullName = "Любовь (Тренер)",
                    Email = "luba@frogling.ru",
                    PasswordHash = trainerPasswordHash,
                    Role = "Trainer"
                },
                new User
                {
                    Id = trainerUserId,
                    FullName = "Владислав (Тренер)",
                    Email = "vlad@frogling.ru",
                    PasswordHash = trainerPasswordHash,
                    Role = "Trainer"
                },
                new User
                {
                    Id = trainerUserId3,
                    FullName = "Лидия (Тренер)",
                    Email = "lida@frogling.ru",
                    PasswordHash = trainerPasswordHash,
                    Role = "Trainer"
                }
            );

            // 5. ПОСЛЕ создания пользователей добавляем самих тренеров со ссылками на их UserId
            modelBuilder.Entity<Trainer>().HasData(
                new Trainer
                {
                    Id = 1,
                    Name = "Любовь",
                    Specialization = "Специалист по грудничковому плаванию",
                    PhotoUrl = "👩‍🏫",
                    Certificates = "Специалист грудничкового и малышкового плавания.",
                    Education = "ПГУФКСиТ, специализация тренер по плаванию",
                    SportsСareer = "12 лет спортивной карьеры",
                    SportsСategory = "Мастер спорта по плаванию",
                    Experience = "3 года",
                    UserId = trainerUserId4
                },
                new Trainer
                {
                    Id = 2,
                    Name = "Владислав",
                    Specialization = "Раннее обучение плаванию",
                    PhotoUrl = "👨‍🏫",
                    Certificates = "Специалист грудничкового и малышкового плавания",
                    Education = "ПГУФКСиТ, специализация тренер по плаванию",
                    SportsСareer = "12 лет спортивной карьеры",
                    Experience = "3 года",
                    SportsСategory = "Кандидат мастера спорта по плаванию",
                    UserId = trainerUserId
                },
                new Trainer
                {
                    Id = 3,
                    Name = "Лидия",
                    Specialization = "Аквааэробика и ЛФК",
                    PhotoUrl = "🏊‍♀️",
                    Certificates = "Специалист грудничкового и малышкового плавания.",
                    Education = "КГМУ Сестринское дело",
                    SportsСareer = "Специалист физической терапии детей и взрослых",
                    Experience = "2 года",
                    UserId = trainerUserId3
                }
            );
            // Добавляем начальные акции
            modelBuilder.Entity<Promotion>().HasData(
                new Promotion
                {
                    Id = 1,
                    Title = "Первые шаги",
                    Description = "Получите 10% скидку на покупку любого абонемента сразу после успешного пробного занятия. Отличный старт для новых приключений!",
                    DiscountAmount = 0,
                    DiscountPercentage = 10,
                    ExpiryDate = DateTime.UtcNow.AddDays(30),
                    IsActive = true
                },
                new Promotion
                {
                    Id = 2,
                    Title = "Семейная выгода",
                    Description = "Если у вас двое и более детей, получите дополнительную скидку 10% на абонемент для второго и каждого следующего ребёнка!",
                    DiscountAmount = 0,
                    DiscountPercentage = 10,
                    ExpiryDate = DateTime.UtcNow.AddYears(1),
                    IsActive = true
                },
                new Promotion
                {
                    Id = 3,
                    Title = "Бонус за отзыв",
                    Description = "Поделитесь своими впечатлениями о нас в любой социальной сети и получите 5% скидку на следующий абонемент.",
                    DiscountAmount = 0,
                    DiscountPercentage = 5,
                    ExpiryDate = DateTime.UtcNow.AddDays(30),
                    IsActive = true
                },
                new Promotion
                {
                    Id = 4,
                    Title = "Двойная выгода: приведи друга!",
                    Description = "Пригласите друга в наш бассейн, и после его первого оплаченного занятия вы получите одно занятие бесплатно!",
                    DiscountAmount = 1600,
                    DiscountPercentage = 0,
                    ExpiryDate = DateTime.UtcNow.AddYears(1),
                    IsActive = true
                },
                new Promotion
                {
                    Id = 5,
                    Title = "Подарок ко дню рождения малыша",
                    Description = "Мы дарим бесплатное занятие вашему малышу в его День рождения, а также в течение двух дней до или после него! Празднуем вместе!",
                    DiscountAmount = 1600,
                    DiscountPercentage = 0,
                    ExpiryDate = DateTime.UtcNow.AddDays(7),
                    IsActive = true
                },
                new Promotion
                {
                    Id = 6,
                    Title = "Поддержка героев",
                    Description = "Для детей участников СВО предоставляется 20% скидка на любой вид абонементов. Мы ценим ваш вклад!",
                    DiscountAmount = 0,
                    DiscountPercentage = 20,
                    ExpiryDate = DateTime.UtcNow.AddDays(30),
                    IsActive = true
                },
                new Promotion
                {
                    Id =7,
                    Title = "Найди сокровища: карточки лабиринта",
                    Description = "Соберите две карточки лабиринта и получите бесплатное занятие! Отслеживайте прогресс и не платите за дополнительное занятие!",
                    DiscountAmount = 1600,
                    DiscountPercentage = 0,
                    ExpiryDate = DateTime.UtcNow.AddDays(30),
                    IsActive = true
                },
                new Promotion
                {
                    Id = 8,
                    Title = "Верность: скидка за продление",
                    Description = "Продлите свой абонемент сразу после окончания предыдущего и получите 10% скидку на следующий абонемент! Ценим вашу лояльность!",
                    DiscountAmount = 0,
                    DiscountPercentage = 10,
                    ExpiryDate = DateTime.UtcNow.AddDays(30),
                    IsActive = true
                }
            );
        }
    }
}