using System.ComponentModel.DataAnnotations;

namespace AgenciaAterrizar.Models
{
    public class ReservaVuelo
    {
        [Key]
        public int ReservaVueloId { get; set; }
        public int UsuarioId { get; set; }
        public int AeropuertoOrigenId { get; set; }
        public string? TerminalAeropuertoOrigen { get; set; }
        public int AeropuertoDestinoId { get; set; }
        public string? TerminalAeropuertoDestino { get; set; }
        public DateTime FechaSalida { get; set; }
        public DateTime FechaRegreso { get; set; }
        public int AerolineaId { get; set; }
        public string? NumeroVuelo { get; set; }
        public ICollection<Escala> Escalas { get; set; }
        public string? DuracionVuelo { get; set; }
        public int CantidadPasajeros { get; set; }
        public ICollection<Acompaniante> Acompaniantes { get; set; }
        public int MedioDePagoId { get; set; }
        public int NroTarjeta { get; set; }
        public int CantidadCuotas { get; set; }
        public decimal MontoTotalCompra { get; set; }

        public virtual Usuario Usuario { get; set; }
        public virtual MedioDePago MedioDePago { get; set; }
        public virtual Acompaniante Acompaniante { get; set; }
        public virtual Escala Escala { get; set; }
    }
}