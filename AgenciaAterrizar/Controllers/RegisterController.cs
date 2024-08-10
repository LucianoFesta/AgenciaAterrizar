using Microsoft.AspNetCore.Mvc;
using AgenciaAterrizar.Models;
using AgenciaAterrizar.Data;
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

    
    public async Task<JsonResult> GuardarPersona (
        int PersonaID, string UsuarioID, string NombreCompleto, string Apellido, 
        string TipoDocumento, int Dni, DateTime FechaNacimiento, string Pasaporte,
        DateTime VencimientoPasaporte, string Pais, string Provincia, string Localidad, 
        string Domicilio, string Email, string PhoneNumber, string Password) {
        
        await GuardarUsuario(Email, Password, PhoneNumber);
    
        var userRegistrado = _context.Users.Where(u => u.Email == Email).SingleOrDefault();

            if(userRegistrado != null){ 

                var persona = new Persona {
                    PersonaID = PersonaID,
                    UsuarioID = userRegistrado.Id,
                    NombreCompleto = NombreCompleto,
                    Apellido = Apellido,
                    TipoDocumento = TipoDocumento,
                    DNI = Dni,
                    FechaNacimiento = FechaNacimiento,
                    Pasaporte = Pasaporte,
                    VencimientoPasaporte = VencimientoPasaporte,
                    Pais = Pais,                       
                    Provincia = Provincia,
                    Localidad = Localidad,
                    Domicilio = Domicilio,
                };

                _context.Personas.Add(persona);
                _context.SaveChanges();
                
                return Json(new { result = true });

            }else{
                return Json(new { result = false, message = "Ocurrió un error al guardar la persona." });

            }
    }  
    
   public async Task<JsonResult> GuardarUsuario( string Email, string Password, string PhoneNumber )
    {
        //CREAR LA VARIABLE USUARIO CON TODOS LOS DATOS
        var user = new IdentityUser { UserName = Email, Email = Email, PhoneNumber = PhoneNumber };

        //EJECUTAR EL METODO CREAR USUARIO PASANDO COMO PARAMETRO EL OBJETO CREADO ANTERIORMENTE Y LA CONTRASEÑA DE INGRESO
        var result = await _userManager.CreateAsync(user, Password);

        //BUSCAR POR MEDIO DE CORREO ELECTRONICO ESE USUARIO CREADO PARA BUSCAR EL ID
        var usuario = _context.Users.Where(u => u.Email == Email).SingleOrDefault();

        if(usuario != null){
            await _userManager.AddToRoleAsync(usuario, "Cliente");
            
            return Json(new { result = true, user = usuario });

        }else{
            return Json(new { result = false, message = "Ocurrió un error al guardar el usuario." });
        }
    }

}