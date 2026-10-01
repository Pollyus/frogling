using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Frogling.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddTotalSlotsColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TotalSlots",
                table: "ScheduleItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

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
                table: "ScheduleItems",
                keyColumn: "Id",
                keyValue: 1,
                column: "TotalSlots",
                value: 3);

            migrationBuilder.UpdateData(
                table: "ScheduleItems",
                keyColumn: "Id",
                keyValue: 2,
                column: "TotalSlots",
                value: 3);

            migrationBuilder.UpdateData(
                table: "ScheduleItems",
                keyColumn: "Id",
                keyValue: 3,
                column: "TotalSlots",
                value: 3);

            migrationBuilder.UpdateData(
                table: "ScheduleItems",
                keyColumn: "Id",
                keyValue: 4,
                column: "TotalSlots",
                value: 3);

            migrationBuilder.UpdateData(
                table: "ScheduleItems",
                keyColumn: "Id",
                keyValue: 5,
                column: "TotalSlots",
                value: 3);

            migrationBuilder.UpdateData(
                table: "ScheduleItems",
                keyColumn: "Id",
                keyValue: 6,
                column: "TotalSlots",
                value: 3);

            migrationBuilder.UpdateData(
                table: "ScheduleItems",
                keyColumn: "Id",
                keyValue: 7,
                column: "TotalSlots",
                value: 3);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalSlots",
                table: "ScheduleItems");

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 1,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 28, 11, 1, 47, 728, DateTimeKind.Utc).AddTicks(7536));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 2,
                column: "ExpiryDate",
                value: new DateTime(2027, 9, 28, 11, 1, 47, 728, DateTimeKind.Utc).AddTicks(7556));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 3,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 28, 11, 1, 47, 728, DateTimeKind.Utc).AddTicks(7575));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 4,
                column: "ExpiryDate",
                value: new DateTime(2027, 9, 28, 11, 1, 47, 728, DateTimeKind.Utc).AddTicks(7587));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 5,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 5, 11, 1, 47, 728, DateTimeKind.Utc).AddTicks(7593));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 6,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 28, 11, 1, 47, 728, DateTimeKind.Utc).AddTicks(7599));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 7,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 28, 11, 1, 47, 728, DateTimeKind.Utc).AddTicks(7606));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 8,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 28, 11, 1, 47, 728, DateTimeKind.Utc).AddTicks(7610));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 9, 28, 11, 1, 47, 728, DateTimeKind.Utc).AddTicks(7082), new DateTime(2026, 9, 28, 11, 1, 47, 728, DateTimeKind.Utc).AddTicks(7136), "$2a$11$SvBLgzt78EvJ2j0n51FGo.dthh/2o9yx/hy26aJxgx3mnUk.KULuq" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("22222222-2222-2222-2222-222222222222"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 9, 28, 11, 1, 47, 728, DateTimeKind.Utc).AddTicks(7154), new DateTime(2026, 9, 28, 11, 1, 47, 728, DateTimeKind.Utc).AddTicks(7153), "$2a$11$yyP2uCVPlF4lWf3zN1AOxegtuPXYVCkCWgy.Csh7QCxqaS/x2jnFC" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("33333333-3333-3333-3333-333333333333"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 9, 28, 11, 1, 47, 728, DateTimeKind.Utc).AddTicks(7160), new DateTime(2026, 9, 28, 11, 1, 47, 728, DateTimeKind.Utc).AddTicks(7158), "$2a$11$yyP2uCVPlF4lWf3zN1AOxegtuPXYVCkCWgy.Csh7QCxqaS/x2jnFC" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("44444444-4444-4444-4444-444444444444"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 9, 28, 11, 1, 47, 728, DateTimeKind.Utc).AddTicks(7147), new DateTime(2026, 9, 28, 11, 1, 47, 728, DateTimeKind.Utc).AddTicks(7146), "$2a$11$yyP2uCVPlF4lWf3zN1AOxegtuPXYVCkCWgy.Csh7QCxqaS/x2jnFC" });
        }
    }
}
