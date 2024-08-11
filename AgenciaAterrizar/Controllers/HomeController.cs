using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using AgenciaAterrizar.Models;
using AgenciaAterrizar.Data;
using Microsoft.AspNetCore.Identity;

namespace AgenciaAterrizar.Controllers;

public class HomeController : Controller
{
    private readonly ApplicationDbContext _context;

    private readonly AmadeusApiCliente _amadeusApiClient;
    private readonly UserManager<IdentityUser> _userManager;
    private readonly RoleManager<IdentityRole> _rolManager;

    public HomeController(ApplicationDbContext context, UserManager<IdentityUser> userManager, RoleManager<IdentityRole> rolManager, AmadeusApiCliente amadeusApiCliente)
    {
        _context = context;

        _amadeusApiClient = amadeusApiCliente;

        _userManager = userManager;
        
        _rolManager = rolManager;
    }

public async Task<IActionResult> Index()
    {
        await CrearRol();
        return View();
    }

    public async Task<JsonResult> CrearRol(){
        var nombreRolExiste = _context.Roles.Where(r => r.Name == "Cliente").SingleOrDefault();
        var rolAdminExiste = _context.Roles.Where(r => r.Name == "Administrador").SingleOrDefault();

        if (nombreRolExiste == null) {
            var rol = await _rolManager.CreateAsync(new IdentityRole("Cliente"));
        }

        if (rolAdminExiste == null) {
            var rol = await _rolManager.CreateAsync(new IdentityRole("Administrador"));
        }

        //Crear usuario admin si no existe
        bool userAdminCreado = false;
        var admin = _context.Users.Where(u => u.Email == "admin@agenciaaterrizar.com").SingleOrDefault();

        if(admin == null){
            var userAdmin = new IdentityUser { UserName = "admin@agenciaaterrizar.com", Email = "admin@agenciaaterrizar.com" };
            var result = await _userManager.CreateAsync(userAdmin, "agencia2024");

            await _userManager.AddToRoleAsync(userAdmin, "Administrador");
            userAdminCreado = result.Succeeded;
        }


        return Json(userAdminCreado);
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }

    public JsonResult ObtenerAeropuertos(string keyword)
    {
        var listaFiltradaAeropuertos = _context.Aeropuertos
            .Where(a => a.Ciudad.ToLower().Contains(keyword.ToLower()) || a.Pais.Nombre.ToLower().Contains(keyword.ToLower()))
            .Select(a => new
            {
                id = a.AeropuertoID,
                text = $"{a.Ciudad}, {a.Pais.Nombre} - ({a.AeropuertoID} - {a.Nombre})"
            })
            .ToList();

        return Json(listaFiltradaAeropuertos);
    }

    public async Task<IActionResult> ObtenerVuelos( string VueloIda,  string VueloRegreso, string FechaDesde, string? FechaHasta, int CantPasajeros, bool EsVueloIdaVuelta  )
    {
        if(string.IsNullOrEmpty(VueloIda) || string.IsNullOrEmpty(VueloRegreso) || string.IsNullOrEmpty(FechaDesde) || CantPasajeros <= 0)
        {
            return Ok(new { success = false, message = "Por favor, verificar los campos ingresados en el buscador." });
        }

        if( EsVueloIdaVuelta )
        {
            if(string.IsNullOrEmpty(FechaHasta))
            {
                return Ok(new { success = false, message = "Por favor, completa la fecha de regreso de tu vuelo." });
            }
            
            DateTime fechaDesdeParsed;
            DateTime fechaHastaParsed;
            string formatoFecha = "yyyy-MM-dd"; // Formato de fecha específico

            if (!DateTime.TryParseExact(FechaDesde, formatoFecha, null, System.Globalization.DateTimeStyles.None, out fechaDesdeParsed) ||
                !DateTime.TryParseExact(FechaHasta, formatoFecha, null, System.Globalization.DateTimeStyles.None, out fechaHastaParsed))
            {
                return Ok(new { success = false, message = "Las fechas ingresadas no tienen un formato válido." });
            }

            if (fechaDesdeParsed > fechaHastaParsed)
            {
                return Ok(new { success = false, message = "La fecha de inicio no puede ser posterior a la fecha de fin." });
            }
        }

        try
        {
            var vuelosOfertas = await _amadeusApiClient.ObtenerOfertaVuelos(VueloIda, VueloRegreso, FechaDesde, FechaHasta, CantPasajeros);

            var aeropuertoIda = _context.Aeropuertos.Where(a => a.AeropuertoID == VueloIda).FirstOrDefault();
            var aeropuertoVuelta = _context.Aeropuertos.Where(a => a.AeropuertoID == VueloRegreso).FirstOrDefault();

            return Ok(new {success = true, listaOfertas = vuelosOfertas, ida = aeropuertoIda, vuelta = aeropuertoVuelta });

        }
        catch (Exception ex)
        {
            return Ok(new { success = false, message = "Ocurrió un error al obtener las ofertas de vuelos. Por favor, inténtelo de nuevo más tarde.", error = ex.Message });
        }
    }

    public JsonResult BuscarCodigoAerolinea(string CodigoAerolinea)
    {
        var nombreAerolinea = _context.Aerolineas.Where(a => a.AerolineaID == CodigoAerolinea).FirstOrDefault();

        if(nombreAerolinea == null){
            nombreAerolinea = new Aerolinea(){
                AerolineaID = "00",
                Nombre = "Aerolínea sin nombre"
            };
        }

        return Json(nombreAerolinea.Nombre);
    }

    public JsonResult BuscarAeropuertosEscalas(string Departure, string Arrival)
    {
        var aeropuertos = _context.Aeropuertos.ToList();
        var paises = _context.Paises.Select(p => 
            new Pais{ 
                PaisID = p.PaisID, 
                Nombre = p.Nombre }).ToList();
                
        foreach (var aeropuerto in aeropuertos)
        {
            aeropuerto.PaisNombre = paises.Where(p => p.PaisID == aeropuerto.PaisID).Select(p => p.Nombre).SingleOrDefault();
        }
        
        var aeropuertoIda = aeropuertos.Where(a => a.AeropuertoID == Departure).FirstOrDefault();
        var aeropuertoVuelta = aeropuertos.Where(a => a.AeropuertoID == Arrival).FirstOrDefault();

        return Json(new { departure = aeropuertoIda, arrival = aeropuertoVuelta });
    }
}

