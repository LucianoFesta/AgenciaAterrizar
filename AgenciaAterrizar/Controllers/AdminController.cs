using AgenciaAterrizar.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components.Server;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AgenciaAterrizar.Controllers;

[Authorize]
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
            .Where(rv => rv.Eliminado == false)
            .ToListAsync();

        return PartialView("_vuelosVendidos", listaVuelosVendidos);
    }

    public JsonResult EliminarReserva(int ID)
    {
        if(ID > 0){
            var reserva = _context.ReservaVuelos.Where(r => r.ReservaVueloID == ID).SingleOrDefault();

            if(reserva != null){

                reserva.Eliminado = true;
                _context.SaveChanges();

                return Json(new { result = true });

            }else{
                return Json(new { result = false, message = "No existe la reserva a eliminar." });

            }

        }else{
            return Json(new { result = false, message = "No se pasó un id de reserva a eliminar." });
        }
    }
}