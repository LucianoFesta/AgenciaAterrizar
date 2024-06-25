using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using AgenciaAterrizar.Models;
using AgenciaAterrizar.Data;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using System.IO.Compression;

namespace AgenciaAterrizar.Controllers;

public class HomeController : Controller
{
    private readonly ApplicationDbContext _context;

    private readonly AmadeusApiCliente _amadeusApiClient;

    public HomeController(ApplicationDbContext context, AmadeusApiCliente amadeusApiCliente)
    {
        _context = context;

        _amadeusApiClient = amadeusApiCliente;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
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

    public async Task<IActionResult> ObtenerVuelos( string VueloIda,  string VueloRegreso, string FechaDesde, string? FechaHasta, int CantPasajeros  )
    {
        if(string.IsNullOrEmpty(VueloIda) || string.IsNullOrEmpty(VueloRegreso) || string.IsNullOrEmpty(FechaDesde) || CantPasajeros <= 0)
        {
            return Ok(new { success = false, message = "Por favor, verificar los campos ingresados en el buscador." });
        }

        if( !string.IsNullOrEmpty(FechaHasta) )
        {
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

        var aeropuertoIda = aeropuertos.Where(a => a.AeropuertoID == Departure).FirstOrDefault();
        var aeropuertoVuelta = aeropuertos.Where(a => a.AeropuertoID == Arrival).FirstOrDefault();

        return Json(new { departure = aeropuertoIda, arrival = aeropuertoVuelta });
    }
}

