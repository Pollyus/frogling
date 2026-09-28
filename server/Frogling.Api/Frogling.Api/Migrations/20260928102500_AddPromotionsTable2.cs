using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Frogling.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddPromotionsTable2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "DiscountPercentage",
                table: "Promotions",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<decimal>(
                name: "DiscountAmount",
                table: "Promotions",
                type: "decimal(18,2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 1,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 28, 10, 25, 0, 157, DateTimeKind.Utc).AddTicks(311));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 2,
                column: "ExpiryDate",
                value: new DateTime(2027, 9, 28, 10, 25, 0, 157, DateTimeKind.Utc).AddTicks(328));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 3,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 28, 10, 25, 0, 157, DateTimeKind.Utc).AddTicks(348));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 4,
                column: "ExpiryDate",
                value: new DateTime(2027, 9, 28, 10, 25, 0, 157, DateTimeKind.Utc).AddTicks(359));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 5,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 5, 10, 25, 0, 157, DateTimeKind.Utc).AddTicks(365));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 6,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 28, 10, 25, 0, 157, DateTimeKind.Utc).AddTicks(369));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 7,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 28, 10, 25, 0, 157, DateTimeKind.Utc).AddTicks(374));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 8,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 28, 10, 25, 0, 157, DateTimeKind.Utc).AddTicks(379));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 9, 28, 10, 25, 0, 156, DateTimeKind.Utc).AddTicks(9847), new DateTime(2026, 9, 28, 10, 25, 0, 156, DateTimeKind.Utc).AddTicks(9909), "$2a$11$rhBk/xAqW1agV6934Jl4wuRfVj7GtSe0elpG1wOvXifAaSVyApLem" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("22222222-2222-2222-2222-222222222222"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 9, 28, 10, 25, 0, 156, DateTimeKind.Utc).AddTicks(9926), new DateTime(2026, 9, 28, 10, 25, 0, 156, DateTimeKind.Utc).AddTicks(9925), "$2a$11$rUvopCN1rpMejPe7EPQLM.70PYNX/kiqe9X.Gr.W8VT1rIUnBGqKG" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("33333333-3333-3333-3333-333333333333"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 9, 28, 10, 25, 0, 156, DateTimeKind.Utc).AddTicks(9953), new DateTime(2026, 9, 28, 10, 25, 0, 156, DateTimeKind.Utc).AddTicks(9953), "$2a$11$rUvopCN1rpMejPe7EPQLM.70PYNX/kiqe9X.Gr.W8VT1rIUnBGqKG" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("44444444-4444-4444-4444-444444444444"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 9, 28, 10, 25, 0, 156, DateTimeKind.Utc).AddTicks(9920), new DateTime(2026, 9, 28, 10, 25, 0, 156, DateTimeKind.Utc).AddTicks(9919), "$2a$11$rUvopCN1rpMejPe7EPQLM.70PYNX/kiqe9X.Gr.W8VT1rIUnBGqKG" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "DiscountPercentage",
                table: "Promotions",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "DiscountAmount",
                table: "Promotions",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 1,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 28, 9, 45, 12, 17, DateTimeKind.Utc).AddTicks(819));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 2,
                column: "ExpiryDate",
                value: new DateTime(2027, 9, 28, 9, 45, 12, 17, DateTimeKind.Utc).AddTicks(838));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 3,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 28, 9, 45, 12, 17, DateTimeKind.Utc).AddTicks(856));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 4,
                column: "ExpiryDate",
                value: new DateTime(2027, 9, 28, 9, 45, 12, 17, DateTimeKind.Utc).AddTicks(870));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 5,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 5, 9, 45, 12, 17, DateTimeKind.Utc).AddTicks(876));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 6,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 28, 9, 45, 12, 17, DateTimeKind.Utc).AddTicks(880));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 7,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 28, 9, 45, 12, 17, DateTimeKind.Utc).AddTicks(885));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 8,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 28, 9, 45, 12, 17, DateTimeKind.Utc).AddTicks(889));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 9, 28, 9, 45, 12, 17, DateTimeKind.Utc).AddTicks(91), new DateTime(2026, 9, 28, 9, 45, 12, 17, DateTimeKind.Utc).AddTicks(145), "$2a$11$rrFKK1FuKHkDbQSIqp255uXq3c0Lfn6nd7wtfrVpT9IlW5mSo/gfa" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("22222222-2222-2222-2222-222222222222"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 9, 28, 9, 45, 12, 17, DateTimeKind.Utc).AddTicks(164), new DateTime(2026, 9, 28, 9, 45, 12, 17, DateTimeKind.Utc).AddTicks(163), "$2a$11$MyPvs0XuudzbOMb4o9VrEOzmVj4yM3AQ.xFX/R5ynLxqNNbResBXe" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("33333333-3333-3333-3333-333333333333"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 9, 28, 9, 45, 12, 17, DateTimeKind.Utc).AddTicks(169), new DateTime(2026, 9, 28, 9, 45, 12, 17, DateTimeKind.Utc).AddTicks(168), "$2a$11$MyPvs0XuudzbOMb4o9VrEOzmVj4yM3AQ.xFX/R5ynLxqNNbResBXe" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("44444444-4444-4444-4444-444444444444"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 9, 28, 9, 45, 12, 17, DateTimeKind.Utc).AddTicks(156), new DateTime(2026, 9, 28, 9, 45, 12, 17, DateTimeKind.Utc).AddTicks(156), "$2a$11$MyPvs0XuudzbOMb4o9VrEOzmVj4yM3AQ.xFX/R5ynLxqNNbResBXe" });
        }
    }
}
