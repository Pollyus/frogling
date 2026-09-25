using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Frogling.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ChatMessages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SenderId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ReceiverId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SentAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsRead = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChatMessages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ServicePlans",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    LessonsCount = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ColorTheme = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DurationDays = table.Column<int>(type: "int", nullable: false),
                    IsTrial = table.Column<bool>(type: "bit", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServicePlans", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ParentName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MedicalCheckDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Subscriptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalLessons = table.Column<int>(type: "int", nullable: false),
                    RemainingLessons = table.Column<int>(type: "int", nullable: false),
                    PurchaseDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ExpiryDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subscriptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Subscriptions_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Trainers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Specialization = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhotoUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Certificates = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SportsСategory = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SportsСareer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Education = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Experience = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trainers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Trainers_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "ScheduleItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StartAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DurationMinutes = table.Column<int>(type: "int", nullable: false),
                    GroupName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AvailableSlots = table.Column<int>(type: "int", nullable: false),
                    TrainerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScheduleItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ScheduleItems_Trainers_TrainerId",
                        column: x => x.TrainerId,
                        principalTable: "Trainers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Bookings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BookedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ScheduledAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ScheduleItemId = table.Column<int>(type: "int", nullable: false),
                    SubscriptionId = table.Column<int>(type: "int", nullable: false),
                    ScheduleItemId1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bookings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Bookings_ScheduleItems_ScheduleItemId",
                        column: x => x.ScheduleItemId,
                        principalTable: "ScheduleItems",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Bookings_ScheduleItems_ScheduleItemId1",
                        column: x => x.ScheduleItemId1,
                        principalTable: "ScheduleItems",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Bookings_Subscriptions_SubscriptionId",
                        column: x => x.SubscriptionId,
                        principalTable: "Subscriptions",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Bookings_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "ServicePlans",
                columns: new[] { "Id", "Category", "ColorTheme", "Description", "DurationDays", "IsActive", "IsTrial", "LessonsCount", "Price", "Title" },
                values: new object[,]
                {
                    { 1, "Разовые", "emerald", "Знакомство с тренером и водой для малышей от 2 месяцев.", 7, true, false, 1, 0m, "Пробное занятие" },
                    { 2, "Абонементы", "emerald", "Идеально для начинающих. 4 занятия, которые можете посетить в любые дни месяца по записи", 30, true, false, 4, 6000m, "Юный пловец" },
                    { 3, "Абонементы", "blue", "Занятия родителя, тренера и ребенка. 4 занятия в месяц", 45, true, false, 4, 7400m, "Семейный абонемент" },
                    { 4, "Разовое", "amber", "Разовое занятие групповое", 30, true, false, 1, 1100m, "Групповое посещение" },
                    { 5, "Персональные", "blue", "Персональное 45-минутное занятие один на один с инструктором.", 14, true, false, 1, 1600m, "Индивидуальное с тренером" },
                    { 6, "Разовые", "emerald", "Персональное занятие 60 минут", 30, true, false, 1, 1600m, "Разовые посещение" },
                    { 7, "Абонементы", "emerald", "Идеально для начинающих. 8 занятий, которые можете посетить в любые дни месяца по записи", 30, true, false, 8, 11500m, "Активный пловец" },
                    { 8, "Абонементы", "blue", "Занятия родителя, тренера и ребенка. 8 занятия в месяц", 45, true, false, 8, 14000m, "Семейный Плюс" },
                    { 9, "Разовое", "amber", "Абонемент за 4 групповых занятия", 30, true, false, 4, 4100m, "Групповой абонемент" },
                    { 10, "Разовое", "amber", "Абонемент за 8 групповых занятия", 30, true, false, 8, 8000m, "Групповой абонемент" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "FullName", "MedicalCheckDate", "ParentName", "PasswordHash", "Phone", "Role" },
                values: new object[,]
                {
                    { new Guid("11111111-1111-1111-1111-111111111111"), new DateTime(2026, 9, 25, 8, 23, 41, 481, DateTimeKind.Utc).AddTicks(3393), "admin@frogling.ru", "Главный Администратор", new DateTime(2026, 9, 25, 8, 23, 41, 481, DateTimeKind.Utc).AddTicks(3431), "", "$2a$11$z4Ygli8Z.polnSU12EiJMeYSqB4woIbWm02mdnyPxRIKErPPkAq52", "", "Admin" },
                    { new Guid("22222222-2222-2222-2222-222222222222"), new DateTime(2026, 9, 25, 8, 23, 41, 481, DateTimeKind.Utc).AddTicks(3442), "vlad@frogling.ru", "Владислав (Тренер)", new DateTime(2026, 9, 25, 8, 23, 41, 481, DateTimeKind.Utc).AddTicks(3441), "", "$2a$11$jPu9PCjT/qHI0GGIMc.rKORjqOzOYBv/Na/Q7yYMwF/8jBQQA5ZUe", "", "Trainer" },
                    { new Guid("33333333-3333-3333-3333-333333333333"), new DateTime(2026, 9, 25, 8, 23, 41, 481, DateTimeKind.Utc).AddTicks(3444), "lida@frogling.ru", "Лидия (Тренер)", new DateTime(2026, 9, 25, 8, 23, 41, 481, DateTimeKind.Utc).AddTicks(3444), "", "$2a$11$jPu9PCjT/qHI0GGIMc.rKORjqOzOYBv/Na/Q7yYMwF/8jBQQA5ZUe", "", "Trainer" },
                    { new Guid("44444444-4444-4444-4444-444444444444"), new DateTime(2026, 9, 25, 8, 23, 41, 481, DateTimeKind.Utc).AddTicks(3438), "luba@frogling.ru", "Любовь (Тренер)", new DateTime(2026, 9, 25, 8, 23, 41, 481, DateTimeKind.Utc).AddTicks(3438), "", "$2a$11$jPu9PCjT/qHI0GGIMc.rKORjqOzOYBv/Na/Q7yYMwF/8jBQQA5ZUe", "", "Trainer" }
                });

            migrationBuilder.InsertData(
                table: "Trainers",
                columns: new[] { "Id", "Certificates", "Education", "Experience", "Name", "PhotoUrl", "Specialization", "SportsСareer", "SportsСategory", "UserId" },
                values: new object[,]
                {
                    { 1, "Специалист грудничкового и малышкового плавания.", "ПГУФКСиТ, специализация тренер по плаванию", "3 года", "Любовь", "👩‍🏫", "Специалист по грудничковому плаванию", "12 лет спортивной карьеры", "Мастер спорта по плаванию", new Guid("44444444-4444-4444-4444-444444444444") },
                    { 2, "Специалист грудничкового и малышкового плавания", "ПГУФКСиТ, специализация тренер по плаванию", "3 года", "Владислав", "👨‍🏫", "Раннее обучение плаванию", "12 лет спортивной карьеры", "Кандидат мастера спорта по плаванию", new Guid("22222222-2222-2222-2222-222222222222") },
                    { 3, "Специалист грудничкового и малышкового плавания.", "КГМУ Сестринское дело", "2 года", "Лидия", "🏊‍♀️", "Аквааэробика и ЛФК", "Специалист физической терапии детей и взрослых", "", new Guid("33333333-3333-3333-3333-333333333333") }
                });

            migrationBuilder.InsertData(
                table: "ScheduleItems",
                columns: new[] { "Id", "AvailableSlots", "DurationMinutes", "GroupName", "StartAt", "TrainerId" },
                values: new object[,]
                {
                    { 1, 6, 45, "Грудничковое плавание", new DateTime(2026, 10, 5, 10, 0, 0, 0, DateTimeKind.Utc), 1 },
                    { 2, 5, 45, "Малыши 1–3 года", new DateTime(2026, 10, 6, 16, 30, 0, 0, DateTimeKind.Utc), 2 },
                    { 3, 6, 45, "Головастики 4–6 лет", new DateTime(2026, 10, 7, 15, 0, 0, 0, DateTimeKind.Utc), 1 },
                    { 4, 4, 45, "Пловцы 7–10 лет", new DateTime(2026, 10, 8, 17, 15, 0, 0, DateTimeKind.Utc), 3 },
                    { 5, 5, 45, "Интенсив", new DateTime(2026, 10, 9, 16, 0, 0, 0, DateTimeKind.Utc), 2 },
                    { 6, 8, 45, "Семейное плавание", new DateTime(2026, 10, 10, 10, 0, 0, 0, DateTimeKind.Utc), 1 },
                    { 7, 10, 45, "Свободное плавание", new DateTime(2026, 10, 11, 12, 0, 0, 0, DateTimeKind.Utc), 3 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_ScheduleItemId",
                table: "Bookings",
                column: "ScheduleItemId");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_ScheduleItemId1",
                table: "Bookings",
                column: "ScheduleItemId1");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_SubscriptionId",
                table: "Bookings",
                column: "SubscriptionId");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_UserId",
                table: "Bookings",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ScheduleItems_TrainerId",
                table: "ScheduleItems",
                column: "TrainerId");

            migrationBuilder.CreateIndex(
                name: "IX_Subscriptions_UserId",
                table: "Subscriptions",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Trainers_UserId",
                table: "Trainers",
                column: "UserId",
                unique: true,
                filter: "[UserId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Bookings");

            migrationBuilder.DropTable(
                name: "ChatMessages");

            migrationBuilder.DropTable(
                name: "ServicePlans");

            migrationBuilder.DropTable(
                name: "ScheduleItems");

            migrationBuilder.DropTable(
                name: "Subscriptions");

            migrationBuilder.DropTable(
                name: "Trainers");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
