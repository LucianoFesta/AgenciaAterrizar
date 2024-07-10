using AgenciaAterrizar.Data;
using AgenciaAterrizar.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AgenciaAterrizar.Controllers;

public class ReservaVueloController : Controller
{
    private readonly ApplicationDbContext _context;

    public ReservaVueloController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Index(string oferta)
    {
        var ofertaObjeto = JsonConvert.DeserializeObject<OfertaVueloApi> (oferta);
        
        return View(ofertaObjeto);
    }
}