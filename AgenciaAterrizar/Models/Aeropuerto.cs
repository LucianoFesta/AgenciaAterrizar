using System.ComponentModel.DataAnnotations;

namespace AgenciaAterrizar.Models
{
    public class Aeropuerto
    {
        [Key]
        public string? AeropuertoID { get; set; }  //Código IATA almacenados a mano.
        public string? Nombre { get; set; }
        public string? Ciudad { get; set; }

        public virtual Pais? Pais { get; set; }
    }
}