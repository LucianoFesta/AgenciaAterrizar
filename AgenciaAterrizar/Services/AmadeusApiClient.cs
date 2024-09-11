public class AmadeusApiCliente
{
    private readonly AuthenticatorAmadeus _authenticator;
    private readonly HttpClient _httpClient;

    public AmadeusApiCliente(AuthenticatorAmadeus authenticator)
    {
        _authenticator = authenticator;
        _httpClient = new HttpClient();
    }

    public async Task<string> ObtenerOfertaVuelos( string VueloIda,  string VueloRegreso, string FechaDesde, string FechaHasta, int CantPasajeros )
    {
        var tokenUser = await _authenticator.ObtenerTokenAmadeus();

        _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", tokenUser);
        
        //Determinar si es un vuelo ida y vuelta o solo un vuelo de ida.
        if(!string.IsNullOrEmpty(FechaHasta)){
            _httpClient.BaseAddress = new Uri($"https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode={VueloIda}&destinationLocationCode={VueloRegreso}&departureDate={FechaDesde}&returnDate={FechaHasta}&adults={CantPasajeros}&max=10&currencyCode=ARS");
        }else{
            _httpClient.BaseAddress = new Uri($"https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode={VueloIda}&destinationLocationCode={VueloRegreso}&departureDate={FechaDesde}&adults={CantPasajeros}&max=10&currencyCode=ARS");
        }
    
        var response = await _httpClient.GetAsync("");
        
        if(response.IsSuccessStatusCode)
        {
            return await response.Content.ReadAsStringAsync();
        }
        else
        {
            throw new Exception($"Error al obtener destinos aéreos: {response.StatusCode}");
        }
    }

    public async Task<string> OfertaUltimaBusqueda( string VueloIda,  string VueloRegreso, string FechaDesde, string FechaHasta, int CantPasajeros )
    {
        var tokenUser = await _authenticator.ObtenerTokenAmadeus();

        _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", tokenUser);
        
        //Determinar si es un vuelo ida y vuelta o solo un vuelo de ida.
        if(!string.IsNullOrEmpty(FechaHasta)){
            _httpClient.BaseAddress = new Uri($"https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode={VueloIda}&destinationLocationCode={VueloRegreso}&departureDate={FechaDesde}&returnDate={FechaHasta}&adults={CantPasajeros}&max=1&currencyCode=ARS");
        }else{
            _httpClient.BaseAddress = new Uri($"https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode={VueloIda}&destinationLocationCode={VueloRegreso}&departureDate={FechaDesde}&adults={CantPasajeros}&max=1&currencyCode=ARS");
        }
    
        var response = await _httpClient.GetAsync("");
        
        if(response.IsSuccessStatusCode)
        {
            return await response.Content.ReadAsStringAsync();
        }
        else
        {
            throw new Exception($"Error al obtener destinos aéreos: {response.StatusCode}");
        }
    }
}

// using AgenciaAterrizar.Models;
// using Newtonsoft.Json;

// public class AmadeusApiCliente
// {
//     private readonly AuthenticatorAmadeus _authenticator;
//     private readonly HttpClient _httpClient;

//     public AmadeusApiCliente(AuthenticatorAmadeus authenticator)
//     {
//         _authenticator = authenticator;
//         _httpClient = new HttpClient();
//     }

// public async Task<List<OfertaVuelo>> ObtenerOfertaVuelos(string VueloIda, string VueloRegreso, string FechaDesde, string FechaHasta, int CantPasajeros)
// {
//     var tokenUser = await _authenticator.ObtenerTokenAmadeus();

//     _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", tokenUser);
//     _httpClient.BaseAddress = new Uri($"https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode={VueloIda}&destinationLocationCode={VueloRegreso}&departureDate={FechaDesde}&returnDate={FechaHasta}&adults={CantPasajeros}&max=5&currencyCode=ARS");

//     var response = await _httpClient.GetAsync("");

//     if (response.IsSuccessStatusCode)
//     {
//         var content = await response.Content.ReadAsStringAsync();
//         Console.WriteLine(content); // Imprime el contenido de la respuesta para revisar su estructura

//         dynamic respuestaAnonima = JsonConvert.DeserializeObject<dynamic>(content);
//         if (respuestaAnonima == null || respuestaAnonima.ofertas == null)
//         {
//             throw new Exception("La respuesta no contiene datos válidos.");
//         }

//         var ofertaVuelos = new List<OfertaVuelo>();

//         foreach (var oferta in respuestaAnonima.ofertas)
//         {
//             ofertaVuelos.Add(new OfertaVuelo
//             {
//                 Itinerarios = oferta.itineraries,
//                 Directo = oferta.oneWay,
//                 AsientosDisponibles = oferta.numberOfBookableSeats,
//                 Precio = oferta.price,
//                 Adicionales = oferta.pricingOptions,
//                 SegmentosVuelta = 1
//             });
//         }

//         return ofertaVuelos;
//     }
//     else
//     {
//         throw new Exception($"Error al obtener destinos aéreos: {response.StatusCode}");
//     }
// }
// }