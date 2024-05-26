using System.ComponentModel.DataAnnotations;

namespace AgenciaAterrizar.Models
{
    public class Acompaniante
    {
        [Key]
        public int AcompanianteId { get; set; }
        public string? NombreCompleto { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public TipoDocumento TipoDocumento { get; set; }
        public string? Documento { get; set; }
        public DateTime VencimientoDocumento { get; set; }


        public ICollection<ReservaVuelo> ReservasVuelos { get; set; }
    }

}