using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Frogling.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddServicePlansCatalog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServicePlans", x => x.Id);
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

            migrationBuilder.InsertData(
                table: "ServicePlans",
                columns: new[] { "Id", "Category", "ColorTheme", "Description", "DurationDays", "IsActive", "LessonsCount", "Price", "Title" },
                values: new object[,]
                {
                    { 1, "Разовые", "emerald", "Знакомство с тренером и водой для малышей от 2 месяцев.", 7, true, 1, 0m, "Пробное занятие" },
                    { 2, "Абонементы", "emerald", "Идеально для начинающих. 4 занятия, которые можете посетить в любые дни месяца по записи", 30, true, 4, 6000m, "Юный пловец" },
                    { 3, "Абонементы", "blue", "Занятия родителя, тренера и ребенка. 4 занятия в месяц", 45, true, 4, 7400m, "Семейный абонемент" },
                    { 4, "Разовое", "amber", "Разовое занятие групповое", 30, true, 30, 1100m, "Групповое посещение" },
                    { 5, "Персональные", "blue", "Персональное 45-минутное занятие один на один с инструктором.", 14, true, 1, 1600m, "Индивидуальное с тренером" },
                    { 6, "Разовые", "emerald", "Персональное занятие 60 минут", 30, true, 1, 1600m, "Разовые посещение" },
                    { 7, "Абонементы", "emerald", "Идеально для начинающих. 8 занятий, которые можете посетить в любые дни месяца по записи", 30, true, 8, 11500m, "Активный пловец" },
                    { 8, "Абонементы", "blue", "Занятия родителя, тренера и ребенка. 8 занятия в месяц", 45, true, 8, 14000m, "Семейный Плюс" },
                    { 9, "Разовое", "amber", "Абонемент за 4 групповых занятия", 30, true, 4, 4100m, "Групповой абонемент" },
                    { 10, "Разовое", "amber", "Абонемент за 8 групповых занятия", 30, true, 8, 8000m, "Групповой абонемент" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Subscriptions_UserId",
                table: "Subscriptions",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ServicePlans");

            migrationBuilder.DropTable(
                name: "Subscriptions");
        }
    }
}
