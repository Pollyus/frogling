using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Frogling.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddScheduleCatalog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Trainers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Specialization = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhotoUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Certificates = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SportsСategory = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SportsСareer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Education = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Experience = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trainers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ScheduleItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DayOfWeek = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Time = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GroupName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AgeCategory = table.Column<int>(type: "int", nullable: false),
                    AvailableSlots = table.Column<int>(type: "int", nullable: false),
                    TrainerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScheduleItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ScheduleItems_Trainers_TrainerId",
                        column: x => x.TrainerId,
                        principalTable: "Trainers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Trainers",
                columns: new[] { "Id", "Certificates", "Education", "Experience", "Name", "PhotoUrl", "Specialization", "SportsСareer", "SportsСategory" },
                values: new object[,]
                {
                    { 1, "Специалист грудничкового и малышкового плавания. Специалист спортивного и детского массажа", "ПГУФКСиТ, специализация тренер по плаванию", "3 года", "Любовь", "👩‍🏫", "Специалист по грудничковому плаванию", "12 лет спортивной карьеры", "Мастер спорта по плаванию" },
                    { 2, "Специалист грудничкового и малышкового плавания", "ПГУФКСиТ, специализация тренер по плаванию", " 3 года", "Владислав", "👨‍🏫", "Раннее обучение плаванию", "12 лет спортивной карьеры, участник всероссийских соревнований", "Кандидат мастера спорта по плаванию" },
                    { 3, "Специалист грудничкового и малышкового плавания. Детский массажист/Преподаватель детского массажа и моторного развития", "КГМУ Сестринское дело", "2 года", "Лидия", "🏊‍♀️", "Аквааэробика и ЛФК", "Специалист физической терапии детей и взрослых", "" }
                });

            migrationBuilder.InsertData(
                table: "ScheduleItems",
                columns: new[] { "Id", "AgeCategory", "AvailableSlots", "DayOfWeek", "GroupName", "Time", "TrainerId" },
                values: new object[,]
                {
                    { 1, 3, 3, "Понедельник", "Малыши (1-3 года)", "15:00 - 15:45", 1 },
                    { 2, 3, 2, "Понедельник", "Головастики (4-6 лет)", "16:00 - 16:45", 2 },
                    { 3, 3, 4, "Среда", "Малыши (1-3 года)", "15:00 - 15:45", 1 },
                    { 4, 3, 1, "Среда", "Пловцы (7-10 лет)", "17:00 - 17:45", 3 },
                    { 5, 3, 5, "Пятница", "Головастики (4-6 лет)", "16:00 - 16:45", 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ScheduleItems_TrainerId",
                table: "ScheduleItems",
                column: "TrainerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ScheduleItems");

            migrationBuilder.DropTable(
                name: "Trainers");
        }
    }
}
