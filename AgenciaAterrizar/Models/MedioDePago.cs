using System.ComponentModel.DataAnnotations;

namespace AgenciaAterrizar.Models
{
    public class MedioDePago
    {
        [Key]
        public int MedioDePagoId { get; set; }
        public MedioDePagoEnum Descripcion { get; set; }

        public ICollection<ReservaVuelo> ReservasVuelos { get; set; }
        public virtual ICollection<ReservaHotel>? ReservasHoteles { get; set; }
    }

    public enum MedioDePagoEnum
    {
        TarjetaDeCredito = 1,
        TarjetaDeDebito,

    }
}