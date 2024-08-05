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

public class UsuarioController : Controller
{
    private readonly ApplicationDbContext _context;

    private readonly AmadeusApiCliente _amadeusApiClient;

    public bool NombreCompleto { get; private set; }
    public TipoDocumento TipoDocumento { get; private set; }
    public DateTime FechaNacimiento { get; private set; }

    public UsuarioController(ApplicationDbContext context, AmadeusApiCliente amadeusApiCliente)
    {
        _context = context;

        _amadeusApiClient = amadeusApiCliente;
    }

    public IActionResult Index()
    {
        return View();
    }

    public JsonResult guardarUsuario (int personaID, int usuarioID , string nombreCompleto,TipoDocumento tipoDocumento, int dni, DateTime fechaNacimiento, string pasaporte,
     DateTime vencimientoPasaporte, string pais, string provincia, string localidad, string domicilio) {
    
            if(!String.IsNullOrEmpty(nombreCompleto)){ 
                
                var cargaUsuario = _context.Personas.Where(p => p.NombreCompleto == nombreCompleto);
                {
                    var persona = new Persona {
                        PersonaID = personaID,
                        UsuarioID = usuarioID,
                        NombreCompleto = nombreCompleto,
                        TipoDocumento = tipoDocumento,
                        DNI = dni,
                        FechaNacimiento = fechaNacimiento,
                        Pasaporte = pasaporte,
                        VencimientoPasaporte = vencimientoPasaporte,
                        Pais = pais,
                        Provincia = provincia,
                        Localidad = localidad,
                        Domicilio = domicilio,
                        };
                        _context.Add(persona);
                        _context.SaveChanges();
                 }
            }
             
             

             
            return Json(true);
    }
}