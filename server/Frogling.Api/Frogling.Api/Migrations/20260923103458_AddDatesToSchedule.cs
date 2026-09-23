using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Frogling.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddDatesToSchedule : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DayOfWeek",
                table: "ScheduleItems");

            migrationBuilder.DropColumn(
                name: "Time",
                table: "ScheduleItems");

            migrationBuilder.AddColumn<DateTime>(
                name: "ClassDate",
                table: "ScheduleItems",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "ScheduleItems",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "AvailableSlots", "ClassDate", "GroupName" },
                values: new object[] { 5, new DateTime(2026, 9, 21, 10, 0, 0, 0, DateTimeKind.Unspecified), "Груднички" });

            migrationBuilder.UpdateData(
                table: "ScheduleItems",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "AvailableSlots", "ClassDate", "GroupName" },
                values: new object[] { 4, new DateTime(2026, 9, 22, 11, 30, 0, 0, DateTimeKind.Unspecified), "Малыши 1-3 года" });

            migrationBuilder.UpdateData(
                table: "ScheduleItems",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "AvailableSlots", "ClassDate", "GroupName" },
                values: new object[] { 6, new DateTime(2026, 9, 23, 15, 0, 0, 0, DateTimeKind.Unspecified), "Головастики 4-6 лет" });

            migrationBuilder.UpdateData(
                table: "ScheduleItems",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "AvailableSlots", "ClassDate", "GroupName" },
                values: new object[] { 3, new DateTime(2026, 9, 24, 17, 15, 0, 0, DateTimeKind.Unspecified), "Пловцы 7-10 лет" });

            migrationBuilder.UpdateData(
                table: "ScheduleItems",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "AvailableSlots", "ClassDate", "GroupName" },
                values: new object[] { 2, new DateTime(2026, 9, 25, 16, 0, 0, 0, DateTimeKind.Unspecified), "Интенсив" });

            migrationBuilder.InsertData(
                table: "ScheduleItems",
                columns: new[] { "Id", "AgeCategory", "AvailableSlots", "ClassDate", "GroupName", "TrainerId" },
                values: new object[,]
                {
                    { 6, 3, 8, new DateTime(2026, 9, 26, 10, 0, 0, 0, DateTimeKind.Unspecified), "Семейное плавание", 1 },
                    { 7, 3, 10, new DateTime(2026, 9, 27, 12, 0, 0, 0, DateTimeKind.Unspecified), "Свободное плавание", 3 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ScheduleItems",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "ScheduleItems",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DropColumn(
                name: "ClassDate",
                table: "ScheduleItems");

            migrationBuilder.AddColumn<string>(
                name: "DayOfWeek",
                table: "ScheduleItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Time",
                table: "ScheduleItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "ScheduleItems",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "AvailableSlots", "DayOfWeek", "GroupName", "Time" },
                values: new object[] { 3, "Понедельник", "Малыши (1-3 года)", "15:00 - 15:45" });

            migrationBuilder.UpdateData(
                table: "ScheduleItems",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "AvailableSlots", "DayOfWeek", "GroupName", "Time" },
                values: new object[] { 2, "Понедельник", "Головастики (4-6 лет)", "16:00 - 16:45" });

            migrationBuilder.UpdateData(
                table: "ScheduleItems",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "AvailableSlots", "DayOfWeek", "GroupName", "Time" },
                values: new object[] { 4, "Среда", "Малыши (1-3 года)", "15:00 - 15:45" });

            migrationBuilder.UpdateData(
                table: "ScheduleItems",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "AvailableSlots", "DayOfWeek", "GroupName", "Time" },
                values: new object[] { 1, "Среда", "Пловцы (7-10 лет)", "17:00 - 17:45" });

            migrationBuilder.UpdateData(
                table: "ScheduleItems",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "AvailableSlots", "DayOfWeek", "GroupName", "Time" },
                values: new object[] { 5, "Пятница", "Головастики (4-6 лет)", "16:00 - 16:45" });
        }
    }
}
