using AgenciaAterrizar.Data;
using AgenciaAterrizar.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AgenciaAterrizar.Controllers;

[Route("ReservaVuelo")]
public class ReservaVueloController : Controller
{
    private readonly ApplicationDbContext _context;

    private readonly UserManager<IdentityUser> _userManager;

    public ReservaVueloController(ApplicationDbContext context, UserManager<IdentityUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }
    

    [HttpPost("FinalizarCompra")]
    //Se crea un método post para pasar la información de la reserva (sencible) para que no este a la vista del usuario.
    public IActionResult ReservaVuelo(string ofertaJson)
    {

        //Retornar a la vista el modelo de vista de ofertaVueloApi para mostrar la info del vuelo seleccionado.
        if (string.IsNullOrEmpty(ofertaJson))
        {
            return BadRequest("Oferta no válida");
        }

        // Deserializar la oferta desde el JSON
        var oferta = JsonConvert.DeserializeObject<OfertaVueloApi>(ofertaJson);

        // Pasar la oferta a la vista
        return View(oferta);
    }

    [HttpPost("GuardarNuevaReserva")]
    public JsonResult GuardarNuevaReserva(ReservaVuelo ReservaVuelo, List<Acompaniante> Acompaniantes)
    {
        //Una transacción se usa para que todas las operaciones SQL se cumplan y se mantenga la integridad. Si una falla, todo falla y nada se almacena.
        using (var transaction = _context.Database.BeginTransaction())
        {
            try
            {
                // var userID = _userManager.GetUserId(User);
                // var personaID = _context.Personas.Where(p => p.UsuarioID == userID).SingleOrDefault();
                
                // ReservaVuelo.PersonaId = personaID.PersonaID;

                // Guardar la reserva principal
                _context.ReservaVuelos.Add(ReservaVuelo);
                _context.SaveChanges();

                // Obtener el ID de la reserva recién insertada
                int reservaVueloID = ReservaVuelo.ReservaVueloID.Value;

                // var userID = _userManager.GetUserId(User);

                // var personaID = _context.Personas.Where(p => p.UsuarioID == userID ).SingleOrDefault();

                // ReservaVuelo.PersonaId = personaID.PersonaID;


                // Asociar cada acompañante con la reserva recién creada
                Acompaniantes.ForEach(acompaniante => {
                    acompaniante.ReservaVueloID = reservaVueloID;
                    _context.Acompaniantes.Add(acompaniante);
                });

                _context.SaveChanges();
                transaction.Commit();

                return Json(new { success = true });
            }
            catch(Exception ex)
            {
                //Si ocurre algun error se revierte la transacción.
                transaction.Rollback();
                
                return Json(new { success = false, message = "Ocurrió un inconveniente al intentar almacenar la reserva.", error = ex.Message });
            }
        }
    }

}