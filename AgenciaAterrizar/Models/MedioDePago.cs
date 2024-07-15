using System.ComponentModel.DataAnnotations;

namespace AgenciaAterrizar.Models
{
    public class MedioDePago
    {
        [Key]
        public int MedioDePagoID { get; set; }
        public MedioDePagoEnum Descripcion { get; set; }

        public ICollection<ReservaVuelo> ReservasVuelos { get; set; }
        public virtual ICollection<ReservaHotel> ReservasHoteles { get; set; }
    }

    public enum MedioDePagoEnum
    {
        Tarjeta_Credito = 1,
        Tarjeta_Debito

    }
}