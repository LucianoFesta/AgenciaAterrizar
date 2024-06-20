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

    public async Task<IActionResult> ObtenerVuelos( string VueloIda,  string VueloRegreso, string FechaDesde, string FechaHasta, int CantPasajeros )
    {
        var vuelosOfertas = await _amadeusApiClient.ObtenerOfertaVuelos(VueloIda, VueloRegreso, FechaDesde, FechaHasta, CantPasajeros);
        var aeropuertoIda = _context.Aeropuertos.Where(a => a.AeropuertoID == VueloIda).FirstOrDefault();
        var aeropuertoVuelta = _context.Aeropuertos.Where(a => a.AeropuertoID == VueloRegreso).FirstOrDefault();
        //return Ok(vuelos);
        return Ok(new { listaOfertas = vuelosOfertas, ida = aeropuertoIda, vuelta = aeropuertoVuelta });
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

