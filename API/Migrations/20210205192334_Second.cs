using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class Second : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Usuarios_Usuarios_SupervisorId",
                table: "Usuarios");

            migrationBuilder.AlterColumn<int>(
                name: "SupervisorId",
                table: "Usuarios",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.UpdateData(
                table: "Departamentos",
                keyColumn: "Id",
                keyValue: 1,
                column: "Codigo",
                value: "VEN471");

            migrationBuilder.UpdateData(
                table: "Departamentos",
                keyColumn: "Id",
                keyValue: 2,
                column: "Codigo",
                value: "PRO474");

            migrationBuilder.AddForeignKey(
                name: "FK_Usuarios_Usuarios_SupervisorId",
                table: "Usuarios",
                column: "SupervisorId",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Usuarios_Usuarios_SupervisorId",
                table: "Usuarios");

            migrationBuilder.AlterColumn<int>(
                name: "SupervisorId",
                table: "Usuarios",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Departamentos",
                keyColumn: "Id",
                keyValue: 1,
                column: "Codigo",
                value: "VEN324");

            migrationBuilder.UpdateData(
                table: "Departamentos",
                keyColumn: "Id",
                keyValue: 2,
                column: "Codigo",
                value: "PRO326");

            migrationBuilder.AddForeignKey(
                name: "FK_Usuarios_Usuarios_SupervisorId",
                table: "Usuarios",
                column: "SupervisorId",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }
    }
}
