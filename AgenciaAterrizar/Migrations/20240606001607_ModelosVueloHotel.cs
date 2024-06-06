using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgenciaAterrizar.Migrations
{
    /// <inheritdoc />
    public partial class ModelosVueloHotel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReservaHoteles_Ciudades_CiudadID1",
                table: "ReservaHoteles");

            migrationBuilder.DropIndex(
                name: "IX_ReservaHoteles_CiudadID1",
                table: "ReservaHoteles");

            migrationBuilder.DropColumn(
                name: "CiudadID1",
                table: "ReservaHoteles");

            migrationBuilder.AlterColumn<string>(
                name: "CiudadID",
                table: "ReservaHoteles",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_ReservaHoteles_CiudadID",
                table: "ReservaHoteles",
                column: "CiudadID");

            migrationBuilder.AddForeignKey(
                name: "FK_ReservaHoteles_Ciudades_CiudadID",
                table: "ReservaHoteles",
                column: "CiudadID",
                principalTable: "Ciudades",
                principalColumn: "CiudadID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReservaHoteles_Ciudades_CiudadID",
                table: "ReservaHoteles");

            migrationBuilder.DropIndex(
                name: "IX_ReservaHoteles_CiudadID",
                table: "ReservaHoteles");

            migrationBuilder.AlterColumn<int>(
                name: "CiudadID",
                table: "ReservaHoteles",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "CiudadID1",
                table: "ReservaHoteles",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_ReservaHoteles_CiudadID1",
                table: "ReservaHoteles",
                column: "CiudadID1");

            migrationBuilder.AddForeignKey(
                name: "FK_ReservaHoteles_Ciudades_CiudadID1",
                table: "ReservaHoteles",
                column: "CiudadID1",
                principalTable: "Ciudades",
                principalColumn: "CiudadID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
