using System.ComponentModel.DataAnnotations;

namespace AgenciaAterrizar.Models
{
    public class Usuario
    {
        [Key]
        public int UsuarioId { get; set; }
        public int TipoUsuarioID { get; set; }
        public string? Nombres { get; set; }
        public string? Apellido { get; set; }
        public TipoDocumento TipoDocumento { get; set; }
        public int DNI { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public string? Pasaporte { get; set; }
        public DateTime VencimientoPasaporte { get; set; }
        public string? Pais { get; set; } //VER LA POSIBILIDAD DE USAR API Y NO ELEMENTOS EN DB:  https://apis.datos.gob.ar/georef/api/.
        public string? Provincia { get; set; }
        public string? Localidad { get; set; }
        public string? Domicilio { get; set; }
        public string? Email { get; set; }
        public string? Telefono { get; set; }
        public string? Contraseña { get; set; }

        public virtual TipoUsuario? TipoUsuario { get; set; }
        public virtual ICollection<ReservaVuelo>? ReservasVuelos { get; set; }

    }

    public enum TipoDocumento
    {
        DocumentoNacionalDeIdentidad = 1,
        LibretaCivica,
        LibretaDeEnrolamiento,
        DNIExtranjero,
        Pasaporte
    }
}