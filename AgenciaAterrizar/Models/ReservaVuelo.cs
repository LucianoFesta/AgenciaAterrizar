using System.ComponentModel.DataAnnotations;

namespace AgenciaAterrizar.Models
{
    public class ReservaVuelo
    {
        [Key]
        public int? ReservaVueloID { get; set; }
        public int? PersonaId { get; set; }
        public string NroVoucher { get; set; }
        public string AeropuertoOrigenID { get; set; }
        public string NombreAeropuertoOrigen { get; set; }
        public string AeropuertoDestinoID { get; set; }
        public string NombreAeropuertoDestino { get; set; }
        public DateTime FechaSalida { get; set; }
        public DateTime? FechaRegreso { get; set; }
        public int? EscalaID { get; set; }
        public int? AcompanianteID { get; set; }
        public string AerolineaID { get; set; }
        public string AerolineaNombre { get; set; }
        public string DuracionVueloIda { get; set; }
        public string? DuracionVueloRegreso { get; set; }
        public int CantidadPasajeros { get; set; }
        public string Email { get; set; }
        public string MedioDePago { get; set; }
        public string NroTarjeta { get; set; }
        public int CantidadCuotas { get; set; }
        public decimal MontoTotalCompra { get; set; }

        public virtual Persona Persona { get; set; }
        public ICollection<Escala>? Escalas { get; set; }
        public ICollection<Acompaniante> Acompaniantes { get; set; }

    }
}