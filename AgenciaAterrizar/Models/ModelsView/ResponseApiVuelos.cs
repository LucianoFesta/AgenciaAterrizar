namespace AgenciaAterrizar.Models
{
    public class OfertaVueloApi
    {
        public int idOferta { get; set; }
        public int pasajeros { get; set; }
        public bool idaYvuelta { get; set; }
        public int asientosDisponibles { get; set; }
        public int cantEscalasIda { get; set; }
        public int cantEscalasVuelta { get; set; }
        public string codigoAerolinea { get; set; }
        public int equipaje { get; set; }
        public List<EscalaOferta> escalasIda { get; set; }
        public List<EscalaOferta> escalasVuelta { get; set; }
        public List<IntinerarioOferta> intinerario { get; set; }
        public string nombreAerolinea { get; set; }
        public Precio precio { get; set; }

    }

    public class EscalaOferta
    {
        public string airline { get; set; }
        public string arrival { get; set; }
        public AeropuertoOferta arrivalAirport { get; set; }
        public DateTime arrivalDate { get; set; }
        public string fechaArrivalFormateada { get{return arrivalDate.ToString("dd-MM-yyyy HH:mm");} }
        public string departure { get; set; }
        public AeropuertoOferta departureAirport { get; set; }
        public DateTime departureDate { get; set; }
        public string fechaDepartureFormateada { get{return departureDate.ToString("dd-MM-yyyy HH:mm");} }
        public string duration { get; set; }
        public int escalaNumber { get; set; }
        public string fligthNumber { get; set; }
        public bool ida { get; set; }
        public bool vuelta { get; set; }
    }

    public class AeropuertoOferta
    {
        public string aeropuertoID { get; set; }
        public string ciudad { get; set; }
        public string nombre { get; set; }
        public string paisID { get; set; }
        public string paisNombre { get; set; }
    }

    public class IntinerarioOferta
    {
        public string duration { get; set; }     
        public string durationFormateada {get {return ConvertirAHorayMinutos(duration);}}
        public List<SegmentoOferta> segments{ get; set; }  

        private static string ConvertirAHorayMinutos(string duracion)
        {
            // Expresión regular para capturar horas y opcionalmente minutos.
            var regex = new System.Text.RegularExpressions.Regex(@"PT(\d+)H(?:(\d+)M)?");
            var match = regex.Match(duracion);

            int horas = match.Success && match.Groups[1].Success ? int.Parse(match.Groups[1].Value) : 0;
            int minutos = match.Success && match.Groups[2].Success ? int.Parse(match.Groups[2].Value) : 0;

            return $"{horas} Horas {minutos} Minutos";
        }
    }


    public class SegmentoOferta
    {
        public Aircraft aircraft { get; set; }
        public DatosEscala arrival { get; set; }  
        public bool blacklistedInEU { get; set; }    
        public string carrierCode { get; set; } 
        public DatosEscala departure { get; set; }    
        public string duration { get; set; }       
        public string id { get; set; }       
        public string number { get; set; }       
        public int numberOfStops { get; set; }  
        public Operating operating  { get; set; }  
    }

    public class Aircraft
    {
        public string code { get; set; }
    }

    public class DatosEscala
    {
        public string at { get; set; }
        public string iataCode { get; set; }
    }

    public class Operating
    {
        public string carrierCode { get; set; }
    }

    public class Precio
    {
        public List<Adicionales> additionalServices { get; set; }
        public string bases { get; set; }
        public string currency { get; set; }
        public List<Fee> fees { get; set; }
        public string grandTotal { get; set; }
        public string total { get; set; }
    }

    public class Adicionales
    {
        public string amount { get; set; }
        public string type { get; set; }
    }

    public class Fee
    {
        public string amount { get; set; }
        public string type { get; set; }
    }
}

