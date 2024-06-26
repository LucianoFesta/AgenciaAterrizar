using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Drawing;

namespace AgenciaAterrizar.Models
{
    public class Aeropuerto
    {
        [Key]
        public string AeropuertoID { get; set; }  //Código IATA almacenados a mano.
        public string Nombre { get; set; }
        public string Ciudad { get; set; }
        public string PaisID { get; set; }

        [NotMapped]
         public string PaisNombre { get; set; }

        public virtual Pais Pais { get; set; }
        public ICollection<Escala> Escalas { get; set; }
    }
    
}