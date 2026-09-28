using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Frogling.Api.Migrations
{
    /// <inheritdoc />
    public partial class ReplacePromotionTargetUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Promotions_Users_TargetUserId",
                table: "Promotions");

            migrationBuilder.DropIndex(
                name: "IX_Promotions_TargetUserId",
                table: "Promotions");

            migrationBuilder.AddColumn<string>(
                name: "TargetUserIds",
                table: "Promotions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ExpiryDate", "TargetUserIds" },
                values: new object[] { new DateTime(2026, 10, 28, 11, 0, 52, 330, DateTimeKind.Utc).AddTicks(7678), null });

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ExpiryDate", "TargetUserIds" },
                values: new object[] { new DateTime(2027, 9, 28, 11, 0, 52, 330, DateTimeKind.Utc).AddTicks(7705), null });

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ExpiryDate", "TargetUserIds" },
                values: new object[] { new DateTime(2026, 10, 28, 11, 0, 52, 330, DateTimeKind.Utc).AddTicks(7717), null });

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ExpiryDate", "TargetUserIds" },
                values: new object[] { new DateTime(2027, 9, 28, 11, 0, 52, 330, DateTimeKind.Utc).AddTicks(7729), null });

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "ExpiryDate", "TargetUserIds" },
                values: new object[] { new DateTime(2026, 10, 5, 11, 0, 52, 330, DateTimeKind.Utc).AddTicks(7734), null });

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "ExpiryDate", "TargetUserIds" },
                values: new object[] { new DateTime(2026, 10, 28, 11, 0, 52, 330, DateTimeKind.Utc).AddTicks(7740), null });

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "ExpiryDate", "TargetUserIds" },
                values: new object[] { new DateTime(2026, 10, 28, 11, 0, 52, 330, DateTimeKind.Utc).AddTicks(7745), null });

            migrationBuilder.UpdateData(
                table: "Promotions",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "ExpiryDate", "TargetUserIds" },
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TargetUserIds",
                table: "Promotions");

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
    }
}
