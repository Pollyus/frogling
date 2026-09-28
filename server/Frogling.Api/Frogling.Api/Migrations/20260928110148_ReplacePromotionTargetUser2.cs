using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Frogling.Api.Migrations
{
    /// <inheritdoc />
    public partial class ReplacePromotionTargetUser2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TargetUserId",
                table: "Promotions");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "TargetUserId",
                table: "Promotions",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ExpiryDate", "TargetUserId" },
                values: new object[] { new DateTime(2026, 10, 28, 11, 0, 52, 330, DateTimeKind.Utc).AddTicks(7678), null });

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ExpiryDate", "TargetUserId" },
                values: new object[] { new DateTime(2027, 9, 28, 11, 0, 52, 330, DateTimeKind.Utc).AddTicks(7705), null });

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ExpiryDate", "TargetUserId" },
                values: new object[] { new DateTime(2026, 10, 28, 11, 0, 52, 330, DateTimeKind.Utc).AddTicks(7717), null });

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ExpiryDate", "TargetUserId" },
                values: new object[] { new DateTime(2027, 9, 28, 11, 0, 52, 330, DateTimeKind.Utc).AddTicks(7729), null });

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "ExpiryDate", "TargetUserId" },
                values: new object[] { new DateTime(2026, 10, 5, 11, 0, 52, 330, DateTimeKind.Utc).AddTicks(7734), null });

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "ExpiryDate", "TargetUserId" },
                values: new object[] { new DateTime(2026, 10, 28, 11, 0, 52, 330, DateTimeKind.Utc).AddTicks(7740), null });

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "ExpiryDate", "TargetUserId" },
                values: new object[] { new DateTime(2026, 10, 28, 11, 0, 52, 330, DateTimeKind.Utc).AddTicks(7745), null });

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "ExpiryDate", "TargetUserId" },
                values: new object[] { new DateTime(2026, 10, 28, 11, 0, 52, 330, DateTimeKind.Utc).AddTicks(7749), null });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 9, 28, 11, 0, 52, 330, DateTimeKind.Utc).AddTicks(7235), new DateTime(2026, 9, 28, 11, 0, 52, 330, DateTimeKind.Utc).AddTicks(7290), "$2a$11$b3fCCKP4SDX/MUSBb01XJOB4uwElQB5lpBguS7B48VLSR/P6EbBx2" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("22222222-2222-2222-2222-222222222222"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 9, 28, 11, 0, 52, 330, DateTimeKind.Utc).AddTicks(7312), new DateTime(2026, 9, 28, 11, 0, 52, 330, DateTimeKind.Utc).AddTicks(7311), "$2a$11$mZSewm27y5df8QWXzsOqNuo9ozDvBoEjE4sPom5H6/lLXZs/F6HsK" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("33333333-3333-3333-3333-333333333333"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 9, 28, 11, 0, 52, 330, DateTimeKind.Utc).AddTicks(7319), new DateTime(2026, 9, 28, 11, 0, 52, 330, DateTimeKind.Utc).AddTicks(7318), "$2a$11$mZSewm27y5df8QWXzsOqNuo9ozDvBoEjE4sPom5H6/lLXZs/F6HsK" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("44444444-4444-4444-4444-444444444444"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 9, 28, 11, 0, 52, 330, DateTimeKind.Utc).AddTicks(7302), new DateTime(2026, 9, 28, 11, 0, 52, 330, DateTimeKind.Utc).AddTicks(7302), "$2a$11$mZSewm27y5df8QWXzsOqNuo9ozDvBoEjE4sPom5H6/lLXZs/F6HsK" });
        }
    }
}
