using System.ComponentModel.DataAnnotations;

namespace AgenciaAterrizar.Models
{
    public class Escala
    {
        [Key]
        public int EscalaId { get; set; }
        public int NroEscala { get; set; }
        public bool EscalaIda { get; set; }
        public bool EscalaVuelta { get; set; }
        public int AeropuertoOrigenId { get; set; }
        public DateTime FechaSalida { get; set; }
        public int AeropuertoDestinoId { get; set; }
        public DateTime FechaLlegada { get; set; }
        public int AerolineaId { get; set; }
        public string? NumeroVuelo { get; set; }
        public string? DuracionVuelo { get; set; }

        public virtual Aerolinea Aerolinea { get; set; }
        public virtual ReservaVuelo ReservasVuelos { get; set; }
    }
}