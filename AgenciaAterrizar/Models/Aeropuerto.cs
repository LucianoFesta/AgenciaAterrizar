using System.ComponentModel.DataAnnotations;

namespace AgenciaAterrizar.Models
{
    public class Aeropuerto
    {
        [Key]
        public string? AeropuertoId { get; set; }  //Código IATA almacenados a mano.
        public string? Nombre { get; set; }
        public string? Pais { get; set; }
        public string? Ciudad { get; set; }
    }
}