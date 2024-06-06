using System.ComponentModel.DataAnnotations;

namespace AgenciaAterrizar.Models
{
    public class Acompaniante
    {
        [Key]
        public int AcompanianteID { get; set; }
        public int AcompanianteReservaID{ get; set; }
        public string NombreCompleto { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public TipoDocumento TipoDocumento { get; set; }
        public string Documento { get; set; }
        public DateTime VencimientoDocumento { get; set; }

        public ICollection<AcompanianteReserva> AcompampanianteReservas { get; set; }
        public ICollection<ReservaVuelo> ReservasVuelos { get; set; }
    }

}