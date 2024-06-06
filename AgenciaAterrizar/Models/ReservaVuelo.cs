using System.ComponentModel.DataAnnotations;

namespace AgenciaAterrizar.Models
{
    public class ReservaVuelo
    {
        [Key]
        public int ReservaVueloID { get; set; }
        public int AcompanianteReservaID{ get; set; }
        public int PersonaId { get; set; }
        public int AeropuertoOrigenID { get; set; }
        public string TerminalAeropuertoOrigen { get; set; }
        public int AeropuertoDestinoID { get; set; }
        public string TerminalAeropuertoDestino { get; set; }
        public DateTime FechaSalida { get; set; }
        public DateTime FechaRegreso { get; set; }
        public int EscalaID { get; set; }
        public int AerolineaID { get; set; }

        // public string? NumeroVuelo { get; set; }
        public string DuracionVuelo { get; set; }
        public int CantidadPasajeros { get; set; }
        public int MedioDePagoID { get; set; }
        public int NroTarjeta { get; set; }
        public int CantidadCuotas { get; set; }
        public decimal MontoTotalCompra { get; set; }

        public virtual Persona Persona { get; set; }
        public virtual MedioDePago MedioDePago { get; set; }
        
        public ICollection<Escala> Escalas { get; set; }
        public ICollection<AcompanianteReserva> AcompampanianteReservas { get; set; }
    }
}