using System.ComponentModel.DataAnnotations;

namespace AgenciaAterrizar.Models
{
    public class Escala
    {
        [Key]
        public int EscalaID { get; set; }
        public string AerolineaID { get; set; }
        public string AeropuertoDestinoID { get; set; }
        public DateTime FechaLlegada { get; set; }
        public string AeropuertoOrigenID { get; set; }
        public DateTime FechaSalida { get; set; }
        public bool EscalaIda { get; set; }
        public bool EscalaVuelta { get; set; }
        public int NroEscala { get; set; }
        public string DuracionVuelo { get; set; }
        public string NumeroVuelo { get; set; }
        public int ReservaVueloID { get; set; }
        
        public virtual Aerolinea Aerolinea { get; set; }
        public virtual ReservaVuelo ReservasVuelos { get; set; }
    }
}