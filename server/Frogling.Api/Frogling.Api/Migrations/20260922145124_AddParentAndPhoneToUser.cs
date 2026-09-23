using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Frogling.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddParentAndPhoneToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PhoneNumber",
                table: "Users",
                newName: "Phone");

            migrationBuilder.RenameColumn(
                name: "ParentsName",
                table: "Users",
                newName: "ParentName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Phone",
                table: "Users",
                newName: "PhoneNumber");

            migrationBuilder.RenameColumn(
                name: "ParentName",
                table: "Users",
                newName: "ParentsName");
        }
    }
}
