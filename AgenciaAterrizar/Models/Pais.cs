using System.ComponentModel.DataAnnotations;

namespace AgenciaAterrizar.Models
{
    public class Pais
    {
        [Key]
        public string? PaisId { get; set; }  //Código IATA almacenados a mano.
        public string? Nombre { get; set; }

        public virtual ICollection<Aeropuerto> Aeropuertos { get; set; }
        public virtual ICollection<Ciudad> Ciudades { get; set; }
    }
}