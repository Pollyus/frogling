using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Frogling.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddAdminRoleAndMedicalCheck : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsMedicalExaminationValid",
                table: "Users",
                newName: "IsMedicalCheckValid");

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "FullName", "IsMedicalCheckValid", "ParentName", "PasswordHash", "Phone", "Role" },
                values: new object[] { new Guid("11111111-1111-1111-1111-111111111111"), new DateTime(2026, 9, 24, 7, 32, 31, 704, DateTimeKind.Utc).AddTicks(5196), "admin@frogling.ru", "Главный Администратор", true, "", "$2a$11$z3sBb1mpCpXH8JuA.oW6k.Q3XMrWZ/Bxif.qyx9bQ3IeJxAZA3Ype", "", "Admin" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"));

            migrationBuilder.DropColumn(
                name: "Role",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "IsMedicalCheckValid",
                table: "Users",
                newName: "IsMedicalExaminationValid");
        }
    }
}
