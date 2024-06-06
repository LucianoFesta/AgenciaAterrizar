using AgenciaAterrizar.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AgenciaAterrizar.Data;

public class ApplicationDbContext : IdentityDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Acompaniante> Acompaniantes { get; set; }
    public DbSet<AcompanianteReserva> AcompanianteReservas { get; set; }
    public DbSet<Aerolinea> Aerolineas { get; set; }
    public DbSet<Aeropuerto> Aeropuertos { get; set; }
    public DbSet<Ciudad> Ciudades { get; set; }
    public DbSet<Escala> Escalas { get; set; }
    public DbSet<MedioDePago> MedioDePagos { get; set; }
    public DbSet<Pais> Paises { get; set; }
    public DbSet<Persona> Personas { get; set; }
    public DbSet<RegimenComida> RegimenComidas { get; set; }
    public DbSet<ReservaHotel> ReservaHoteles { get; set; }
    public DbSet<ReservaVuelo> ReservaVuelos { get; set; }

}
