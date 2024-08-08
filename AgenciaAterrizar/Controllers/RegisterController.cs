using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using AgenciaAterrizar.Models;
using AgenciaAterrizar.Data;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using System.IO.Compression;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace AgenciaAterrizar.Controllers;

public class RegisterController : Controller
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<IdentityUser> _userManager;
    private readonly RoleManager<IdentityRole> _rolManager;



    public RegisterController(ApplicationDbContext context, UserManager<IdentityUser> userManager, RoleManager<IdentityRole> rolManager )
    {
        _context = context;
        _userManager = userManager;
        _rolManager = rolManager;
    }

    public IActionResult Index()
    {
        return View();
    }

    
    public JsonResult guardarPersona (int personaID, string usuarioID , string nombreCompleto, string apellido, string tipoDocumento, int Dni, DateTime fechaNacimiento, string pasaporte,
     DateTime vencimientoPasaporte, string pais, string provincia, string localidad, string domicilio, string email, string phoneNumber, string password) {
    
        var userRegistrado = _context.Users.Where(u => u.Email == email).SingleOrDefault();

            if(userRegistrado != null){ 


                var persona = new Persona {
                    
                    PersonaID = personaID,
                    UsuarioID = userRegistrado.Id,
                    NombreCompleto = nombreCompleto,
                    Apellido = apellido,
                    TipoDocumento = tipoDocumento,
                    DNI = Dni,
                    FechaNacimiento = fechaNacimiento,
                    Pasaporte = pasaporte,
                    VencimientoPasaporte = vencimientoPasaporte,
                    Pais = pais,                       
                    Provincia = provincia,
                    Localidad = localidad,
                    Domicilio = domicilio,
                    };
                    _context.Personas.Add(persona);
                    _context.SaveChanges();
            }

             
             

             
            return Json(true);
    }  
    
   public async Task<JsonResult> GuardarUsuario( string email, string password, string phoneNumber )
     {
         //CREAR LA VARIABLE USUARIO CON TODOS LOS DATOS
         var user = new IdentityUser { UserName = email, Email = email, PasswordHash = password, PhoneNumber = phoneNumber };

         //EJECUTAR EL METODO CREAR USUARIO PASANDO COMO PARAMETRO EL OBJETO CREADO ANTERIORMENTE Y LA CONTRASEÑA DE INGRESO
         var result = await _userManager.CreateAsync(user);

         //BUSCAR POR MEDIO DE CORREO ELECTRONICO ESE USUARIO CREADO PARA BUSCAR EL ID
         var usuario = _context.Users.Where(u => u.Email == email).SingleOrDefault();

          await _userManager.AddToRoleAsync(usuario, "Cliente");

         return Json(result.Succeeded);
     }


    
}