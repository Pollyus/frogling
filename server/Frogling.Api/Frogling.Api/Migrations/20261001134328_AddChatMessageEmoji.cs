using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Frogling.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddChatMessageEmoji : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Emoji",
                table: "ChatMessages",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Emoji",
                table: "ChatMessages");

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 1,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 29, 9, 50, 23, 286, DateTimeKind.Utc).AddTicks(3866));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 2,
                column: "ExpiryDate",
                value: new DateTime(2027, 9, 29, 9, 50, 23, 286, DateTimeKind.Utc).AddTicks(3876));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 3,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 29, 9, 50, 23, 286, DateTimeKind.Utc).AddTicks(3882));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 4,
                column: "ExpiryDate",
                value: new DateTime(2027, 9, 29, 9, 50, 23, 286, DateTimeKind.Utc).AddTicks(3887));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 5,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 6, 9, 50, 23, 286, DateTimeKind.Utc).AddTicks(3890));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 6,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 29, 9, 50, 23, 286, DateTimeKind.Utc).AddTicks(3892));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 7,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 29, 9, 50, 23, 286, DateTimeKind.Utc).AddTicks(3895));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 8,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 29, 9, 50, 23, 286, DateTimeKind.Utc).AddTicks(3897));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 9, 29, 9, 50, 23, 286, DateTimeKind.Utc).AddTicks(3656), new DateTime(2026, 9, 29, 9, 50, 23, 286, DateTimeKind.Utc).AddTicks(3681), "$2a$11$.qmAhSIlc702DD8z4sLcDuxe4XjOgrCXodAFDcZapAs/1QEl09esq" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("22222222-2222-2222-2222-222222222222"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 9, 29, 9, 50, 23, 286, DateTimeKind.Utc).AddTicks(3692), new DateTime(2026, 9, 29, 9, 50, 23, 286, DateTimeKind.Utc).AddTicks(3692), "$2a$11$x2VxzkvArWsOilEOTXPEoeiywqBsBIFDjVjYx1sdyyZO2h8ULUcrq" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("33333333-3333-3333-3333-333333333333"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 9, 29, 9, 50, 23, 286, DateTimeKind.Utc).AddTicks(3697), new DateTime(2026, 9, 29, 9, 50, 23, 286, DateTimeKind.Utc).AddTicks(3697), "$2a$11$x2VxzkvArWsOilEOTXPEoeiywqBsBIFDjVjYx1sdyyZO2h8ULUcrq" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("44444444-4444-4444-4444-444444444444"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 9, 29, 9, 50, 23, 286, DateTimeKind.Utc).AddTicks(3689), new DateTime(2026, 9, 29, 9, 50, 23, 286, DateTimeKind.Utc).AddTicks(3689), "$2a$11$x2VxzkvArWsOilEOTXPEoeiywqBsBIFDjVjYx1sdyyZO2h8ULUcrq" });
        }
    }
}
