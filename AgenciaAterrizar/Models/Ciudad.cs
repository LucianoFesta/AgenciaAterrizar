using System.ComponentModel.DataAnnotations;

namespace AgenciaAterrizar.Models
{
    public class Ciudad
    {
        [Key]
        public string CiudadID { get; set; }  //Código IATA almacenados a mano.
        public string Nombre { get; set; }

        public virtual Pais Pais { get; set; }
        public virtual ICollection<ReservaHotel> ReservaHoteles { get; set; }

    }
}