namespace AgenciaAterrizar.Models
{
    public class VueloCookie
    {
        public string VueloIda { get; set; }
        public string VueloRegreso { get; set; }
        public string FechaDesde { get; set; }
        public string? FechaHasta { get; set; }
        public int CantPasajeros { get; set; }

        public bool VueloIdaVuelta { get; set; }
    }
}

