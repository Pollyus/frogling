using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Frogling.Api.Migrations
{
    /// <inheritdoc />
    public partial class ReplaceEndAtWithDurationMinutes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ClassDate",
                table: "ScheduleItems",
                newName: "StartAt");

            migrationBuilder.RenameColumn(
                name: "AgeCategory",
                table: "ScheduleItems",
                newName: "DurationMinutes");

            migrationBuilder.AddColumn<int>(
                name: "ScheduleItemId1",
                table: "Bookings",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ScheduleItems",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "AvailableSlots", "DurationMinutes", "GroupName", "StartAt" },
                values: new object[] { 6, 45, "Грудничковое плавание", new DateTime(2026, 10, 5, 10, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "ScheduleItems",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "AvailableSlots", "DurationMinutes", "GroupName", "StartAt" },
                values: new object[] { 5, 45, "Малыши 1–3 года", new DateTime(2026, 10, 6, 16, 30, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "ScheduleItems",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "DurationMinutes", "GroupName", "StartAt" },
                values: new object[] { 45, "Головастики 4–6 лет", new DateTime(2026, 10, 7, 15, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "ScheduleItems",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "AvailableSlots", "DurationMinutes", "GroupName", "StartAt" },
                values: new object[] { 4, 45, "Пловцы 7–10 лет", new DateTime(2026, 10, 8, 17, 15, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "ScheduleItems",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "AvailableSlots", "DurationMinutes", "StartAt" },
                values: new object[] { 5, 45, new DateTime(2026, 10, 9, 16, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "ScheduleItems",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "DurationMinutes", "StartAt" },
                values: new object[] { 45, new DateTime(2026, 10, 10, 10, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "ScheduleItems",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "DurationMinutes", "StartAt" },
                values: new object[] { 45, new DateTime(2026, 10, 11, 12, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_ScheduleItemId1",
                table: "Bookings",
                column: "ScheduleItemId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_ScheduleItems_ScheduleItemId1",
                table: "Bookings",
                column: "ScheduleItemId1",
                principalTable: "ScheduleItems",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_ScheduleItems_ScheduleItemId1",
                table: "Bookings");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_ScheduleItemId1",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "ScheduleItemId1",
                table: "Bookings");

            migrationBuilder.RenameColumn(
                name: "StartAt",
                table: "ScheduleItems",
                newName: "ClassDate");

            migrationBuilder.RenameColumn(
                name: "DurationMinutes",
                table: "ScheduleItems",
                newName: "AgeCategory");

            migrationBuilder.UpdateData(
                table: "ScheduleItems",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "AgeCategory", "AvailableSlots", "ClassDate", "GroupName" },
                values: new object[] { 3, 5, new DateTime(2026, 9, 21, 10, 0, 0, 0, DateTimeKind.Unspecified), "Груднички" });

            migrationBuilder.UpdateData(
                table: "ScheduleItems",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "AgeCategory", "AvailableSlots", "ClassDate", "GroupName" },
                values: new object[] { 3, 4, new DateTime(2026, 9, 22, 11, 30, 0, 0, DateTimeKind.Unspecified), "Малыши 1-3 года" });

            migrationBuilder.UpdateData(
                table: "ScheduleItems",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "AgeCategory", "ClassDate", "GroupName" },
                values: new object[] { 3, new DateTime(2026, 9, 23, 15, 0, 0, 0, DateTimeKind.Unspecified), "Головастики 4-6 лет" });

            migrationBuilder.UpdateData(
                table: "ScheduleItems",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "AgeCategory", "AvailableSlots", "ClassDate", "GroupName" },
                values: new object[] { 3, 3, new DateTime(2026, 9, 24, 17, 15, 0, 0, DateTimeKind.Unspecified), "Пловцы 7-10 лет" });

            migrationBuilder.UpdateData(
                table: "ScheduleItems",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "AgeCategory", "AvailableSlots", "ClassDate" },
                values: new object[] { 3, 2, new DateTime(2026, 9, 25, 16, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "ScheduleItems",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "AgeCategory", "ClassDate" },
                values: new object[] { 3, new DateTime(2026, 9, 26, 10, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "ScheduleItems",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "AgeCategory", "ClassDate" },
                values: new object[] { 3, new DateTime(2026, 9, 27, 12, 0, 0, 0, DateTimeKind.Unspecified) });
        }
    }
}
