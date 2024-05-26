using System.ComponentModel.DataAnnotations;

namespace AgenciaAterrizar.Models
{
    public class RegimenComida
    {
        [Key]
        public int RegimenId { get; set; }
        public TipoRegimen Descripcion { get; set; }

    }

    public enum TipoRegimen
    {
        ROOM_ONLY = 1,
        BREAKFAST,
        HALF_BOARD,
        FULL_BOARD,
        ALL_INCLUSIVE
    }
}