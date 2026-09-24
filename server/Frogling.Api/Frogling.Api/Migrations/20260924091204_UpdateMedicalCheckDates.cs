using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Frogling.Api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateMedicalCheckDates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsMedicalCheckValid",
                table: "Users");

            migrationBuilder.AddColumn<DateTime>(
                name: "MedicalCheckDate",
                table: "Users",
                type: "datetime2",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "CreatedAt", "MedicalCheckDate", "PasswordHash" },
                values: new object[] { new DateTime(2026, 9, 24, 9, 12, 4, 488, DateTimeKind.Utc).AddTicks(279), new DateTime(2026, 9, 24, 9, 12, 4, 488, DateTimeKind.Utc).AddTicks(382), "$2a$11$XWm3S3X3LuGkJbR7s10u2OQUngr.sMYcWRvUBQ3pZeWkSaCB1R.Bu" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MedicalCheckDate",
                table: "Users");

            migrationBuilder.AddColumn<bool>(
                name: "IsMedicalCheckValid",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"),
                columns: new[] { "CreatedAt", "IsMedicalCheckValid", "PasswordHash" },
                values: new object[] { new DateTime(2026, 9, 24, 7, 32, 31, 704, DateTimeKind.Utc).AddTicks(5196), true, "$2a$11$z3sBb1mpCpXH8JuA.oW6k.Q3XMrWZ/Bxif.qyx9bQ3IeJxAZA3Ype" });
        }
    }
}
