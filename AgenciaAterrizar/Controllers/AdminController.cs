using AgenciaAterrizar.Data;
using Microsoft.AspNetCore.Components.Server;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AgenciaAterrizar.Controllers;

public class AdminController : Controller
{
    private readonly ApplicationDbContext _context;

    public AdminController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Index()
    {
        return View();
    }

    [HttpGet("vuelosVendidos")]
    public async Task<IActionResult> VuelosVendidos()
    {
        var listaVuelosVendidos = await _context.ReservaVuelos
            .Include(rv => rv.Acompaniantes)
            .Include(rv => rv.Escalas)
            .ToListAsync();

        return PartialView("_vuelosVendidos", listaVuelosVendidos);
    }
}