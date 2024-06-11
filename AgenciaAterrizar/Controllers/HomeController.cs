using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using AgenciaAterrizar.Models;
using AgenciaAterrizar.Data;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace AgenciaAterrizar.Controllers;

public class HomeController : Controller
{
    private readonly ApplicationDbContext _context;

    public HomeController(ApplicationDbContext context)
    {
        _context = context;
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

    public JsonResult GetAeropuertos(string keyword)
    {
        var listaFiltradaEropuertos = _context.Aeropuertos
            .Where(a => a.Ciudad.ToLower().Contains(keyword.ToLower()))
            .Select(a => new
            {
                id = a.AeropuertoID,
                text = $"{a.Nombre} - ({a.Ciudad})"
            })
            .ToList();

        return Json(listaFiltradaEropuertos);
    }

    public JsonResult Console()
    {
        return Json(true);
    }
}

