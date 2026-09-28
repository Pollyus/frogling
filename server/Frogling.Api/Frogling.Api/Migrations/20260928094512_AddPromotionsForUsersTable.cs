using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Frogling.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddPromotionsForUsersTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ColorTheme",
                table: "Promotions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<Guid>(
                name: "TargetUserId",
                table: "Promotions",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ColorTheme", "ExpiryDate", "TargetUserId" },
                values: new object[] { "emerald", new DateTime(2026, 10, 28, 9, 45, 12, 17, DateTimeKind.Utc).AddTicks(819), null });

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ColorTheme", "ExpiryDate", "TargetUserId" },
                values: new object[] { "emerald", new DateTime(2027, 9, 28, 9, 45, 12, 17, DateTimeKind.Utc).AddTicks(838), null });

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ColorTheme", "ExpiryDate", "TargetUserId" },
                values: new object[] { "emerald", new DateTime(2026, 10, 28, 9, 45, 12, 17, DateTimeKind.Utc).AddTicks(856), null });

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ColorTheme", "ExpiryDate", "TargetUserId" },
                values: new object[] { "emerald", new DateTime(2027, 9, 28, 9, 45, 12, 17, DateTimeKind.Utc).AddTicks(870), null });

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "ColorTheme", "ExpiryDate", "TargetUserId" },
                values: new object[] { "emerald", new DateTime(2026, 10, 5, 9, 45, 12, 17, DateTimeKind.Utc).AddTicks(876), null });

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "ColorTheme", "ExpiryDate", "TargetUserId" },
                values: new object[] { "emerald", new DateTime(2026, 10, 28, 9, 45, 12, 17, DateTimeKind.Utc).AddTicks(880), null });

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "ColorTheme", "ExpiryDate", "TargetUserId" },
                values: new object[] { "emerald", new DateTime(2026, 10, 28, 9, 45, 12, 17, DateTimeKind.Utc).AddTicks(885), null });

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "ColorTheme", "ExpiryDate", "TargetUserId" },
                values: new object[] { "emerald", new DateTime(2026, 10, 28, 9, 45, 12, 17, DateTimeKind.Utc).AddTicks(889), null });

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

            migrationBuilder.CreateIndex(
                name: "IX_Promotions_TargetUserId",
                table: "Promotions",
                column: "TargetUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Promotions_Users_TargetUserId",
                table: "Promotions",
                column: "TargetUserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Promotions_Users_TargetUserId",
                table: "Promotions");

            migrationBuilder.DropIndex(
                name: "IX_Promotions_TargetUserId",
                table: "Promotions");

            migrationBuilder.DropColumn(
                name: "ColorTheme",
                table: "Promotions");

            migrationBuilder.DropColumn(
                name: "TargetUserId",
                table: "Promotions");

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 1,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 25, 12, 24, 4, 917, DateTimeKind.Utc).AddTicks(7695));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 2,
                column: "ExpiryDate",
                value: new DateTime(2027, 9, 25, 12, 24, 4, 917, DateTimeKind.Utc).AddTicks(7706));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 3,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 25, 12, 24, 4, 917, DateTimeKind.Utc).AddTicks(7716));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 4,
                column: "ExpiryDate",
                value: new DateTime(2027, 9, 25, 12, 24, 4, 917, DateTimeKind.Utc).AddTicks(7722));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 5,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 2, 12, 24, 4, 917, DateTimeKind.Utc).AddTicks(7726));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 6,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 25, 12, 24, 4, 917, DateTimeKind.Utc).AddTicks(7729));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 7,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 25, 12, 24, 4, 917, DateTimeKind.Utc).AddTicks(7734));

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 8,
                column: "ExpiryDate",
                value: new DateTime(2026, 10, 25, 12, 24, 4, 917, DateTimeKind.Utc).AddTicks(7737));

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
    }
}
