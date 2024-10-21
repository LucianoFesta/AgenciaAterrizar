using System.Text;
using Newtonsoft.Json.Linq;

public class AuthenticatorAmadeus
{
    private const string Client_id = ;
    private const string Client_secret =;
    private const string Grant_type = ;
    private const string urlAmadeus = "https://test.api.amadeus.com/v1/security/oauth2/token";

    public async Task<string> ObtenerTokenAmadeus()
    {
        using (var client = new HttpClient())
        {
            var infoUser = $"grant_type={Grant_type}&client_id={Client_id}&client_secret={Client_secret}";
            var request = new HttpRequestMessage(HttpMethod.Post, urlAmadeus)
            {
                Content = new StringContent(infoUser, Encoding.UTF8, "application/x-www-form-urlencoded")
            };

            var response = await client.SendAsync(request);

            if(response.IsSuccessStatusCode)
            {
                var jsonResponse = await response.Content.ReadAsStringAsync();
                var jsonObject = Newtonsoft.Json.JsonConvert.DeserializeObject<JObject>(jsonResponse);
                return (string)jsonObject["access_token"];
            }
            else
            {
                throw new Exception($"Error al obtener token: {response.StatusCode}");
            }
        }
    }
}