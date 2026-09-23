using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Frogling.Api.Migrations
{
    /// <inheritdoc />
    public partial class FixCascadeBookingSubscription : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SubscriptionId",
                table: "Bookings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_SubscriptionId",
                table: "Bookings",
                column: "SubscriptionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Subscriptions_SubscriptionId",
                table: "Bookings",
                column: "SubscriptionId",
                principalTable: "Subscriptions",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Subscriptions_SubscriptionId",
                table: "Bookings");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_SubscriptionId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "SubscriptionId",
                table: "Bookings");
        }
    }
}
