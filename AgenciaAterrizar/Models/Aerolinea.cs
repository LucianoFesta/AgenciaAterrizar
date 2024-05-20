using System.ComponentModel.DataAnnotations;

namespace AgenciaAterrizar.Models
{
    public class Aerolinea
    {
        [Key]
        public string? AerolineaId { get; set; }  //Código IATA almacenados a mano.
        public string? Nombre { get; set; }

        //Ver la posibilidad de guardar un nombre de archivo para mostrar logo de aerolinea.
    }
}