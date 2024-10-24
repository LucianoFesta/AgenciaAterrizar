using AgenciaAterrizar.Data;
using AgenciaAterrizar.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components.Server;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AgenciaAterrizar.Controllers;

// [Authorize]
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

    public IActionResult VuelosVendidosLista()
    {
        return View();
    }

    public JsonResult ListaVuelosVendidos(DateTime? desde, DateTime? hasta)
    {
        var listaVuelosVendidos = _context.ReservaVuelos
            .Include(rv => rv.Acompaniantes)
            .Include(rv => rv.Escalas)
            .Where(rv => rv.Eliminado == false)
            .AsQueryable();

        if (desde.HasValue)
        {
            listaVuelosVendidos = listaVuelosVendidos.Where(rv => rv.FechaSalida >= desde.Value);
        }

        if (hasta.HasValue)
        {
            listaVuelosVendidos = listaVuelosVendidos.Where(rv => rv.FechaSalida <= hasta.Value);
        }

        var lista = listaVuelosVendidos
            .ToList().Select(v => new {
                v.ReservaVueloID,
                v.PersonaId,
                v.NroVoucher,
                v.AeropuertoOrigenID,
                v.NombreAeropuertoOrigen,
                v.AeropuertoDestinoID,
                v.NombreAeropuertoDestino,
                v.FechaSalida,
                v.FechaRegreso,
                v.EscalaID,
                v.AcompanianteID,
                v.AerolineaID,
                v.AerolineaNombre,
                v.DuracionVueloIda,
                v.DuracionVueloRegreso,
                v.CantidadPasajeros,
                v.Email,
                v.MedioDePago,
                v.NroTarjeta,
                v.CantidadCuotas,
                v.MontoTotalCompra,
                v.Eliminado,
                // Traer acompañantes completos
                Acompaniantes = v.Acompaniantes.Select(a => new {
                    a.AcompanianteID,
                    a.NombreCompleto,
                    a.Apellido,
                    a.Pais,
                    a.FechaNacimiento,
                    a.TipoDocumento,
                    a.NroDocumento,
                    a.Genero
                }).ToList(),
                // Traer escalas completas
                Escalas = v.Escalas.Select(e => new {
                    e.EscalaID,
                    e.AerolineaID,
                    e.AeropuertoDestinoID,
                    e.FechaLlegada,
                    e.AeropuertoOrigenID,
                    e.FechaSalida,
                    e.EscalaIda,
                    e.EscalaVuelta,
                    e.NroEscala,
                    e.DuracionVuelo,
                    e.NumeroVuelo
                }).ToList()

            })
            .OrderBy(r => r.FechaSalida)
            .ToList();

        return Json(lista);
    }

    public JsonResult EliminarReserva(int idReserva)
    {
        if(idReserva > 0){
            var reserva = _context.ReservaVuelos.Where(r => r.ReservaVueloID == idReserva).SingleOrDefault();

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