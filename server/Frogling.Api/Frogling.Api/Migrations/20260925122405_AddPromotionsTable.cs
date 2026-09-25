using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Frogling.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddPromotionsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Promotions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DiscountAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DiscountPercentage = table.Column<int>(type: "int", nullable: false),
                    ExpiryDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Promotions", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Promotions",
                columns: new[] { "Id", "Description", "DiscountAmount", "DiscountPercentage", "ExpiryDate", "IsActive", "Title" },
                values: new object[,]
                {
                    { 1, "Получите 10% скидку на покупку любого абонемента сразу после успешного пробного занятия. Отличный старт для новых приключений!", 0m, 10, new DateTime(2026, 10, 25, 12, 24, 4, 917, DateTimeKind.Utc).AddTicks(7695), true, "Первые шаги" },
                    { 2, "Если у вас двое и более детей, получите дополнительную скидку 10% на абонемент для второго и каждого следующего ребёнка!", 0m, 10, new DateTime(2027, 9, 25, 12, 24, 4, 917, DateTimeKind.Utc).AddTicks(7706), true, "Семейная выгода" },
                    { 3, "Поделитесь своими впечатлениями о нас в любой социальной сети и получите 5% скидку на следующий абонемент.", 0m, 5, new DateTime(2026, 10, 25, 12, 24, 4, 917, DateTimeKind.Utc).AddTicks(7716), true, "Бонус за отзыв" },
                    { 4, "Пригласите друга в наш бассейн, и после его первого оплаченного занятия вы получите одно занятие бесплатно!", 1600m, 0, new DateTime(2027, 9, 25, 12, 24, 4, 917, DateTimeKind.Utc).AddTicks(7722), true, "Двойная выгода: приведи друга!" },
                    { 5, "Мы дарим бесплатное занятие вашему малышу в его День рождения, а также в течение двух дней до или после него! Празднуем вместе!", 1600m, 0, new DateTime(2026, 10, 2, 12, 24, 4, 917, DateTimeKind.Utc).AddTicks(7726), true, "Подарок ко дню рождения малыша" },
                    { 6, "Для детей участников СВО предоставляется 20% скидка на любой вид абонементов. Мы ценим ваш вклад!", 0m, 20, new DateTime(2026, 10, 25, 12, 24, 4, 917, DateTimeKind.Utc).AddTicks(7729), true, "Поддержка героев" },
                    { 7, "Соберите две карточки лабиринта и получите бесплатное занятие! Отслеживайте прогресс и не платите за дополнительное занятие!", 1600m, 0, new DateTime(2026, 10, 25, 12, 24, 4, 917, DateTimeKind.Utc).AddTicks(7734), true, "Найди сокровища: карточки лабиринта" },
                    { 8, "Продлите свой абонемент сразу после окончания предыдущего и получите 10% скидку на следующий абонемент! Ценим вашу лояльность!", 0m, 10, new DateTime(2026, 10, 25, 12, 24, 4, 917, DateTimeKind.Utc).AddTicks(7737), true, "Верность: скидка за продление" }
                });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 9, 25, 12, 24, 4, 917, DateTimeKind.Utc).AddTicks(7405), new DateTime(2026, 9, 25, 12, 24, 4, 917, DateTimeKind.Utc).AddTicks(7443), "$2a$11$fNA4AlR12b/i7EjZlQH6t.A4gQjVHV.PKLlzzaBoG/MlLezEvuPXq" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("22222222-2222-2222-2222-222222222222"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 9, 25, 12, 24, 4, 917, DateTimeKind.Utc).AddTicks(7454), new DateTime(2026, 9, 25, 12, 24, 4, 917, DateTimeKind.Utc).AddTicks(7454), "$2a$11$uEPva3imuxUPE5xIxWIhtuTNFvN5YvRLahOpR1Ll5gbMa82GLAmRK" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("33333333-3333-3333-3333-333333333333"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 9, 25, 12, 24, 4, 917, DateTimeKind.Utc).AddTicks(7458), new DateTime(2026, 9, 25, 12, 24, 4, 917, DateTimeKind.Utc).AddTicks(7458), "$2a$11$uEPva3imuxUPE5xIxWIhtuTNFvN5YvRLahOpR1Ll5gbMa82GLAmRK" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("44444444-4444-4444-4444-444444444444"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 9, 25, 12, 24, 4, 917, DateTimeKind.Utc).AddTicks(7450), new DateTime(2026, 9, 25, 12, 24, 4, 917, DateTimeKind.Utc).AddTicks(7450), "$2a$11$uEPva3imuxUPE5xIxWIhtuTNFvN5YvRLahOpR1Ll5gbMa82GLAmRK" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Promotions");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 9, 25, 8, 23, 41, 481, DateTimeKind.Utc).AddTicks(3393), new DateTime(2026, 9, 25, 8, 23, 41, 481, DateTimeKind.Utc).AddTicks(3431), "$2a$11$z4Ygli8Z.polnSU12EiJMeYSqB4woIbWm02mdnyPxRIKErPPkAq52" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("22222222-2222-2222-2222-222222222222"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 9, 25, 8, 23, 41, 481, DateTimeKind.Utc).AddTicks(3442), new DateTime(2026, 9, 25, 8, 23, 41, 481, DateTimeKind.Utc).AddTicks(3441), "$2a$11$jPu9PCjT/qHI0GGIMc.rKORjqOzOYBv/Na/Q7yYMwF/8jBQQA5ZUe" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("33333333-3333-3333-3333-333333333333"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 9, 25, 8, 23, 41, 481, DateTimeKind.Utc).AddTicks(3444), new DateTime(2026, 9, 25, 8, 23, 41, 481, DateTimeKind.Utc).AddTicks(3444), "$2a$11$jPu9PCjT/qHI0GGIMc.rKORjqOzOYBv/Na/Q7yYMwF/8jBQQA5ZUe" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("44444444-4444-4444-4444-444444444444"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 9, 25, 8, 23, 41, 481, DateTimeKind.Utc).AddTicks(3438), new DateTime(2026, 9, 25, 8, 23, 41, 481, DateTimeKind.Utc).AddTicks(3438), "$2a$11$jPu9PCjT/qHI0GGIMc.rKORjqOzOYBv/Na/Q7yYMwF/8jBQQA5ZUe" });
        }
    }
}
