using System.ComponentModel.DataAnnotations;

namespace AgenciaAterrizar.Models
{
    public class Acompaniante
    {
        [Key]
        public int AcompanianteID { get; set; }
        public int ReservaVueloID { get; set; }
        public string NombreCompleto { get; set; }
        public string Apellido { get; set; }
        public string Pais { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public string TipoDocumento { get; set; }
        public string NroDocumento { get; set; }
        public string Genero { get; set; }
        public virtual ReservaVuelo ReservasVuelos { get; set; }

    }

}