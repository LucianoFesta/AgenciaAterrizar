using System.ComponentModel.DataAnnotations;

namespace AgenciaAterrizar.Models
{
    public class TipoUsuario
    {
        [Key]
        public int TipoUsuarioID { get; set; }
        public DescripcionEnum Descripcion { get; set; }

        public virtual ICollection<Usuario> Usuarios { get; set; }

    }

    public enum DescripcionEnum{
        SuperAdministrador = 1,
        Administrador,
        Cliente
    }
}
