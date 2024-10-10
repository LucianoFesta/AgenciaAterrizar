using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgenciaAterrizar.Migrations
{
    /// <inheritdoc />
    public partial class Vaucher : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TipoVaucher",
                table: "ReservaVuelos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "Vaucher",
                table: "ReservaVuelos",
                type: "varbinary(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TipoVaucher",
                table: "ReservaVuelos");

            migrationBuilder.DropColumn(
                name: "Vaucher",
                table: "ReservaVuelos");
        }
    }
}
