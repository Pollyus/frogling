using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Frogling.Api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateChatMessages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 1,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 31, 14, 11, 34, 39, DateTimeKind.Utc).AddTicks(3083));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 2,
                column: "ExpiryDate",
                value: new DateTime(2027, 10, 1, 14, 11, 34, 39, DateTimeKind.Utc).AddTicks(3093));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 3,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 31, 14, 11, 34, 39, DateTimeKind.Utc).AddTicks(3099));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 4,
                column: "ExpiryDate",
                value: new DateTime(2027, 10, 1, 14, 11, 34, 39, DateTimeKind.Utc).AddTicks(3105));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 5,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 8, 14, 11, 34, 39, DateTimeKind.Utc).AddTicks(3108));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 6,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 31, 14, 11, 34, 39, DateTimeKind.Utc).AddTicks(3110));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 7,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 31, 14, 11, 34, 39, DateTimeKind.Utc).AddTicks(3113));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 8,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 31, 14, 11, 34, 39, DateTimeKind.Utc).AddTicks(3116));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 10, 1, 14, 11, 34, 39, DateTimeKind.Utc).AddTicks(2691), new DateTime(2026, 10, 1, 14, 11, 34, 39, DateTimeKind.Utc).AddTicks(2714), "$2a$11$.zf6.//HwVNInJRF9l0o6OUCf28X3ouUgMjM5.nZyYa/q48fsd5za" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("22222222-2222-2222-2222-222222222222"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 10, 1, 14, 11, 34, 39, DateTimeKind.Utc).AddTicks(2727), new DateTime(2026, 10, 1, 14, 11, 34, 39, DateTimeKind.Utc).AddTicks(2727), "$2a$11$sUA/aQEfoVe4OkVSzaRykerHyg.TSbsI4rJ2fNZ7.kNY0fuP5j95q" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("33333333-3333-3333-3333-333333333333"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 10, 1, 14, 11, 34, 39, DateTimeKind.Utc).AddTicks(2730), new DateTime(2026, 10, 1, 14, 11, 34, 39, DateTimeKind.Utc).AddTicks(2730), "$2a$11$sUA/aQEfoVe4OkVSzaRykerHyg.TSbsI4rJ2fNZ7.kNY0fuP5j95q" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("44444444-4444-4444-4444-444444444444"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 10, 1, 14, 11, 34, 39, DateTimeKind.Utc).AddTicks(2724), new DateTime(2026, 10, 1, 14, 11, 34, 39, DateTimeKind.Utc).AddTicks(2724), "$2a$11$sUA/aQEfoVe4OkVSzaRykerHyg.TSbsI4rJ2fNZ7.kNY0fuP5j95q" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 1,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 31, 13, 43, 27, 984, DateTimeKind.Utc).AddTicks(6086));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 2,
                column: "ExpiryDate",
                value: new DateTime(2027, 10, 1, 13, 43, 27, 984, DateTimeKind.Utc).AddTicks(6100));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 3,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 31, 13, 43, 27, 984, DateTimeKind.Utc).AddTicks(6109));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 4,
                column: "ExpiryDate",
                value: new DateTime(2027, 10, 1, 13, 43, 27, 984, DateTimeKind.Utc).AddTicks(6116));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 5,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 8, 13, 43, 27, 984, DateTimeKind.Utc).AddTicks(6119));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 6,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 31, 13, 43, 27, 984, DateTimeKind.Utc).AddTicks(6122));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 7,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 31, 13, 43, 27, 984, DateTimeKind.Utc).AddTicks(6124));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 8,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 31, 13, 43, 27, 984, DateTimeKind.Utc).AddTicks(6126));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 10, 1, 13, 43, 27, 984, DateTimeKind.Utc).AddTicks(5733), new DateTime(2026, 10, 1, 13, 43, 27, 984, DateTimeKind.Utc).AddTicks(5769), "$2a$11$Qfy3Xc.BUAwTI8i5Rza60.aFOqJRoivd9TdTC/0Op0L65udXC6Roi" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("22222222-2222-2222-2222-222222222222"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 10, 1, 13, 43, 27, 984, DateTimeKind.Utc).AddTicks(5783), new DateTime(2026, 10, 1, 13, 43, 27, 984, DateTimeKind.Utc).AddTicks(5783), "$2a$11$FnGy4Ey3L6fYHEXylAyCkeyLieIcXJXiRikxTPWsGL3FBf/SVmeo6" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("33333333-3333-3333-3333-333333333333"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 10, 1, 13, 43, 27, 984, DateTimeKind.Utc).AddTicks(5787), new DateTime(2026, 10, 1, 13, 43, 27, 984, DateTimeKind.Utc).AddTicks(5787), "$2a$11$FnGy4Ey3L6fYHEXylAyCkeyLieIcXJXiRikxTPWsGL3FBf/SVmeo6" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("44444444-4444-4444-4444-444444444444"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 10, 1, 13, 43, 27, 984, DateTimeKind.Utc).AddTicks(5777), new DateTime(2026, 10, 1, 13, 43, 27, 984, DateTimeKind.Utc).AddTicks(5777), "$2a$11$FnGy4Ey3L6fYHEXylAyCkeyLieIcXJXiRikxTPWsGL3FBf/SVmeo6" });
        }
    }
}
