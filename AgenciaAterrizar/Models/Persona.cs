using System.ComponentModel.DataAnnotations;

namespace AgenciaAterrizar.Models
{
    public class Persona
    {
        [Key]
        public int PersonaID { get; set; }
        public int UsuarioID { get; set; } // VER DE AGREGAR LA RELACION CON LA TABLA USER.
        public string NombreCompleto { get; set; }
        public TipoDocumento TipoDocumento { get; set; }
        public int DNI { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public string Pasaporte { get; set; }
        public DateTime VencimientoPasaporte { get; set; }
        public string Pais { get; set; } //VER LA POSIBILIDAD DE USAR API Y NO ELEMENTOS EN DB:  https://apis.datos.gob.ar/georef/api/.
        public string Provincia { get; set; }
        public string Localidad { get; set; }
        public string Domicilio { get; set; }

        public virtual ICollection<ReservaVuelo>? ReservasVuelos { get; set; }
        public virtual ICollection<ReservaHotel>? ReservasHoteles { get; set; }

    }

    public enum TipoDocumento
    {
        DNI = 1,
        Libreta_Civica,
        Libreta_Enrolamiento,
        DNI_Extranjero,
        Pasaporte
    }
}