using Microsoft.EntityFrameworkCore;
using Frogling.Api.Models;

namespace Frogling.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<SubscriptionPrice> Subscriptions { get; set; } = null!;
        public DbSet<ServicePlan> ServicePlans { get; set; } = null!; // Каталог услуг
        public DbSet<Trainer> Trainers { get; set; } = null!;
        public DbSet<ScheduleItem> ScheduleItems { get; set; } = null!;
        public DbSet<Booking> Bookings { get; set; } = null!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

            // Настройка связи User -> Subscriptions
            modelBuilder.Entity<SubscriptionPrice>()
                .HasOne(s => s.User)
                .WithMany(u => u.Subscriptions)
                .HasForeignKey(s => s.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // 1. Уникальный Email
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // 2. Начальные карточки услуг (каталог бассейна "Лягушонок")
            modelBuilder.Entity<ServicePlan>().HasData(
                new ServicePlan
                {
                    Id = 1,
                    Title = "Пробное занятие",
                    Price = 0,
                    LessonsCount = 1,
                    Description = "Знакомство с тренером и водой для малышей от 2 месяцев.",
                    Category = "Разовые",
                    ColorTheme = "emerald",
                    DurationDays = 7,
                    IsActive = true
                },
                new ServicePlan
                {
                    Id = 2,
                    Title = "Юный пловец",
                    Price = 6000,
                    LessonsCount = 4,
                    Description = "Идеально для начинающих. 4 занятия, которые можете посетить в любые дни месяца по записи",
                    Category = "Абонементы",
                    ColorTheme = "emerald",
                    DurationDays = 30,
                    IsActive = true
                },
                new ServicePlan
                {
                    Id = 3,
                    Title = "Семейный абонемент",
                    Price = 7400,
                    LessonsCount = 4,
                    Description = "Занятия родителя, тренера и ребенка. 4 занятия в месяц",
                    Category = "Абонементы",
                    ColorTheme = "blue",
                    DurationDays = 45,
                    IsActive = true
                },
                new ServicePlan
                {
                    Id = 4,
                    Title = "Групповое посещение",
                    Price = 1100,
                    LessonsCount = 1,
                    Description = "Разовое занятие групповое",
                    Category = "Разовое",
                    ColorTheme = "amber",
                    DurationDays = 30,
                    IsActive = true
                },
                new ServicePlan
                {
                    Id = 5,
                    Title = "Индивидуальное с тренером",
                    Price = 1600,
                    LessonsCount = 1,
                    Description = "Персональное 45-минутное занятие один на один с инструктором.",
                    Category = "Персональные",
                    ColorTheme = "blue",
                    DurationDays = 14,
                    IsActive = true
                },
                new ServicePlan
                {
                    Id = 6,
                    Title = "Разовые посещение",
                    Price = 1600,
                    LessonsCount = 1,
                    Description = "Персональное занятие 60 минут",
                    Category = "Разовые",
                    ColorTheme = "emerald",
                    DurationDays = 30,
                    IsActive = true
                },
                new ServicePlan
                {
                    Id = 7,
                    Title = "Активный пловец",
                    Price = 11500,
                    LessonsCount = 8,
                    Description = "Идеально для начинающих. 8 занятий, которые можете посетить в любые дни месяца по записи",
                    Category = "Абонементы",
                    ColorTheme = "emerald",
                    DurationDays = 30,
                    IsActive = true
                },
                new ServicePlan
                {
                    Id = 8,
                    Title = "Семейный Плюс",
                    Price = 14000,
                    LessonsCount = 8,
                    Description = "Занятия родителя, тренера и ребенка. 8 занятия в месяц",
                    Category = "Абонементы",
                    ColorTheme = "blue",
                    DurationDays = 45,
                    IsActive = true
                },
                new ServicePlan
                {
                    Id = 9,
                    Title = "Групповой абонемент",
                    Price = 4100,
                    LessonsCount = 4,
                    Description = "Абонемент за 4 групповых занятия",
                    Category = "Разовое",
                    ColorTheme = "amber",
                    DurationDays = 30,
                    IsActive = true
                },
                new ServicePlan
                {
                    Id = 10,
                    Title = "Групповой абонемент",
                    Price = 8000,
                    LessonsCount = 8,
                    Description = "Абонемент за 8 групповых занятия",
                    Category = "Разовое",
                    ColorTheme = "amber",
                    DurationDays = 30,
                    IsActive = true
                }
            );
                
            modelBuilder.Entity<Trainer>().HasData(
                new Trainer { Id = 1, Name = "Любовь", Specialization = "Специалист по грудничковому плаванию", PhotoUrl = "👩‍🏫", Certificates = "Специалист грудничкового и малышкового плавания. Специалист спортивного и детского массажа", Education = "ПГУФКСиТ, специализация тренер по плаванию",
                 SportsСareer = "12 лет спортивной карьеры", SportsСategory = "Мастер спорта по плаванию", Experience = "3 года"
                },
                new Trainer { Id = 2, Name = "Владислав", Specialization = "Раннее обучение плаванию", PhotoUrl = "👨‍🏫", Certificates = "Специалист грудничкового и малышкового плавания", Education = "ПГУФКСиТ, специализация тренер по плаванию", SportsСareer = "12 лет спортивной карьеры, участник всероссийских соревнований",
                 Experience = " 3 года", SportsСategory = "Кандидат мастера спорта по плаванию"
                },
                new Trainer { Id = 3, Name = "Лидия", Specialization = "Аквааэробика и ЛФК", PhotoUrl = "🏊‍♀️", Certificates = "Специалист грудничкового и малышкового плавания. Детский массажист/Преподаватель детского массажа и моторного развития", 
                 Education = "КГМУ Сестринское дело", SportsСareer = "Специалист физической терапии детей и взрослых", Experience = "2 года"
                }
            );

            modelBuilder.Entity<ScheduleItem>().HasData(
                new ScheduleItem { Id = 1, DayOfWeek = "Понедельник", Time = "15:00 - 15:45", GroupName = "Малыши (1-3 года)", AvailableSlots = 3, TrainerId = 1 },
                new ScheduleItem { Id = 2, DayOfWeek = "Понедельник", Time = "16:00 - 16:45", GroupName = "Головастики (4-6 лет)", AvailableSlots = 2, TrainerId = 2 },
                new ScheduleItem { Id = 3, DayOfWeek = "Среда", Time = "15:00 - 15:45", GroupName = "Малыши (1-3 года)", AvailableSlots = 4, TrainerId = 1 },
                new ScheduleItem { Id = 4, DayOfWeek = "Среда", Time = "17:00 - 17:45", GroupName = "Пловцы (7-10 лет)", AvailableSlots = 1, TrainerId = 3 },
                new ScheduleItem { Id = 5, DayOfWeek = "Пятница", Time = "16:00 - 16:45", GroupName = "Головастики (4-6 лет)", AvailableSlots = 5, TrainerId = 2 }
            );

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.User)
                .WithMany()
                .HasForeignKey(b => b.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.ScheduleItem)
                .WithMany()
                .HasForeignKey(b => b.ScheduleItemId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
