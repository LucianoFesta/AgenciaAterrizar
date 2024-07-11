using AgenciaAterrizar.Data;
using AgenciaAterrizar.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;

namespace AgenciaAterrizar.Controllers;

[Route("ReservaVuelo")]
public class ReservaVueloController : Controller
{
    private readonly ApplicationDbContext _context;

    public ReservaVueloController(ApplicationDbContext context)
    {
        _context = context;
    }
    

    [HttpPost("FinalizarCompra")]
    //Se crea un método post para pasar la información de la reserva (sencible) para que no este a la vista del usuario.
    public IActionResult ReservaVuelo(string ofertaJson)
    {
        //Pasar a la vista el select con las opciones de tipo de documento.
        var selectListItem = new List<SelectListItem>
        {
            new SelectListItem{ Value = "0", Text = "[Seleccione..]" }
        };

        var enumValues = Enum.GetValues(typeof(TipoDocumento)).Cast<TipoDocumento>();

        selectListItem.AddRange(enumValues.Select(e => new SelectListItem
        {
            Value = e.GetHashCode().ToString(),
            Text = e.ToString()
        }));

        ViewBag.tipoDocumento = selectListItem.OrderBy(t => t.Text).ToList();


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
}