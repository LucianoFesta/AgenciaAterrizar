using System.ComponentModel.DataAnnotations;

namespace AgenciaAterrizar.Models
{
    public class Acompaniante
    {
        [Key]
        public int AcompanianteId { get; set; }
        public string? Nombre { get; set; }
        public string? Apellido { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public string? Pasaporte { get; set; }
        public DateTime VencimientoPasaporte { get; set; }


        public ICollection<ReservaVuelo> ReservasVuelos { get; set; }
    }
}