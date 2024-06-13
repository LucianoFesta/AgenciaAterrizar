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
        _httpClient.BaseAddress = new Uri($"https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode={VueloIda}&destinationLocationCode={VueloRegreso}&departureDate={FechaDesde}&returnDate={FechaHasta}&adults={CantPasajeros}&max=5&currencyCode=ARS");
    
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