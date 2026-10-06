using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Frogling.Api.Migrations
{
    /// <inheritdoc />
    public partial class MakeEmojiNullableInChat : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Emoji",
                table: "ChatMessages",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 1,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 31, 14, 15, 8, 640, DateTimeKind.Utc).AddTicks(8135));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 2,
                column: "ExpiryDate",
                value: new DateTime(2027, 10, 1, 14, 15, 8, 640, DateTimeKind.Utc).AddTicks(8148));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 3,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 31, 14, 15, 8, 640, DateTimeKind.Utc).AddTicks(8158));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 4,
                column: "ExpiryDate",
                value: new DateTime(2027, 10, 1, 14, 15, 8, 640, DateTimeKind.Utc).AddTicks(8167));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 5,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 8, 14, 15, 8, 640, DateTimeKind.Utc).AddTicks(8170));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 6,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 31, 14, 15, 8, 640, DateTimeKind.Utc).AddTicks(8172));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 7,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 31, 14, 15, 8, 640, DateTimeKind.Utc).AddTicks(8174));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 8,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 31, 14, 15, 8, 640, DateTimeKind.Utc).AddTicks(8177));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 10, 1, 14, 15, 8, 640, DateTimeKind.Utc).AddTicks(7809), new DateTime(2026, 10, 1, 14, 15, 8, 640, DateTimeKind.Utc).AddTicks(7848), "$2a$11$DKGUPCHqBrxUTEU3W3hpBOMGUrFIddDYKPVDfUgZL6/oDmPkxY/qG" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("22222222-2222-2222-2222-222222222222"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 10, 1, 14, 15, 8, 640, DateTimeKind.Utc).AddTicks(7870), new DateTime(2026, 10, 1, 14, 15, 8, 640, DateTimeKind.Utc).AddTicks(7870), "$2a$11$ZCf.56lG6mEdY7n4gn/euurbG1W3v8H27IjzMbu0jNCVykoP2oLjS" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("33333333-3333-3333-3333-333333333333"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 10, 1, 14, 15, 8, 640, DateTimeKind.Utc).AddTicks(7875), new DateTime(2026, 10, 1, 14, 15, 8, 640, DateTimeKind.Utc).AddTicks(7874), "$2a$11$ZCf.56lG6mEdY7n4gn/euurbG1W3v8H27IjzMbu0jNCVykoP2oLjS" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("44444444-4444-4444-4444-444444444444"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 10, 1, 14, 15, 8, 640, DateTimeKind.Utc).AddTicks(7862), new DateTime(2026, 10, 1, 14, 15, 8, 640, DateTimeKind.Utc).AddTicks(7862), "$2a$11$ZCf.56lG6mEdY7n4gn/euurbG1W3v8H27IjzMbu0jNCVykoP2oLjS" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Emoji",
                table: "ChatMessages",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

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
    }
}
