using System.ComponentModel.DataAnnotations;

namespace AgenciaAterrizar.Models
{
    public class ReservaVuelo
    {
        [Key]
        public int ReservaVueloId { get; set; }
        public int UsuarioId { get; set; }
        public int CantidadPasajeros { get; set; }
        public ICollection<Acompaniante> Acompaniantes { get; set; }
        public int MedioDePagoId { get; set; }
        public int NroTarjeta { get; set; }
        public int CantidadCuotas { get; set; }
        public decimal MontoTotalCompra { get; set; }

        public virtual Usuario Usuario { get; set; }
        public virtual MedioDePago MedioDePago { get; set; }
        public virtual Acompaniante Acompaniante { get; set; }
    }
}