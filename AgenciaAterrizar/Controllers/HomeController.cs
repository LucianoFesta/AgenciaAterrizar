using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using AgenciaAterrizar.Models;
using AgenciaAterrizar.Data;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

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
        var vuelos = await _amadeusApiClient.ObtenerOfertaVuelos(VueloIda, VueloRegreso, FechaDesde, FechaHasta, CantPasajeros);

        return Ok(vuelos);
    }
}

