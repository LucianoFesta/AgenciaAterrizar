using System.ComponentModel.DataAnnotations;

namespace AgenciaAterrizar.Models
{
    public class ReservaHotel
    {
        [Key]
        public int ReservaHotelID { get; set; }
        public string? CodigoHotel { get; set; }
        public string? NombreHotel { get; set; }
        public int PersonaID { get; set; }
        public string CiudadID { get; set; }
        public DateTime FechaCheckIn { get; set; }
        public DateTime FechaCheckout { get; set; }
        public decimal PrecioNoche { get; set; }
        public decimal PrecioTotal { get; set; }
        public decimal MontoPagado { get; set; }
        public int CantidadHuespedes { get; set; }
        public int MedioDePagoID { get; set; }
        public int NroTarjeta { get; set; }
        public int CantidadCuotas { get; set; }

        public virtual Persona Persona { get; set; }
        public virtual Ciudad Ciudad { get; set; }
        public virtual MedioDePago MedioDePago { get; set; }

    }
}