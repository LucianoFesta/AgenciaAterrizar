﻿// <auto-generated />
using System;
using AgenciaAterrizar.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace AgenciaAterrizar.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("AgenciaAterrizar.Models.Acompaniante", b =>
                {
                    b.Property<int>("AcompanianteID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("AcompanianteID"));

                    b.Property<string>("Apellido")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("FechaNacimiento")
                        .HasColumnType("datetime2");

                    b.Property<string>("Genero")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NombreCompleto")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NroDocumento")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Pais")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ReservaVueloID")
                        .HasColumnType("int");

                    b.Property<string>("TipoDocumento")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("AcompanianteID");

                    b.HasIndex("ReservaVueloID");

                    b.ToTable("Acompaniantes");
                });

            modelBuilder.Entity("AgenciaAterrizar.Models.Aerolinea", b =>
                {
                    b.Property<string>("AerolineaID")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("AerolineaID");

                    b.ToTable("Aerolineas");
                });

            modelBuilder.Entity("AgenciaAterrizar.Models.Aeropuerto", b =>
                {
                    b.Property<string>("AeropuertoID")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Ciudad")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PaisID")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("AeropuertoID");

                    b.HasIndex("PaisID");

                    b.ToTable("Aeropuertos");
                });

            modelBuilder.Entity("AgenciaAterrizar.Models.Ciudad", b =>
                {
                    b.Property<string>("CiudadID")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PaisID")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("CiudadID");

                    b.HasIndex("PaisID");

                    b.ToTable("Ciudades");
                });

            modelBuilder.Entity("AgenciaAterrizar.Models.Escala", b =>
                {
                    b.Property<int>("EscalaID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("EscalaID"));

                    b.Property<string>("AerolineaID")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("AeropuertoDestinoID")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AeropuertoID")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("AeropuertoOrigenID")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DuracionVuelo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("EscalaIda")
                        .HasColumnType("bit");

                    b.Property<bool>("EscalaVuelta")
                        .HasColumnType("bit");

                    b.Property<DateTime>("FechaLlegada")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("FechaSalida")
                        .HasColumnType("datetime2");

                    b.Property<int>("NroEscala")
                        .HasColumnType("int");

                    b.Property<string>("NumeroVuelo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ReservaVueloID")
                        .HasColumnType("int");

                    b.HasKey("EscalaID");

                    b.HasIndex("AerolineaID");

                    b.HasIndex("AeropuertoID");

                    b.HasIndex("ReservaVueloID");

                    b.ToTable("Escalas");
                });

            modelBuilder.Entity("AgenciaAterrizar.Models.Pais", b =>
                {
                    b.Property<string>("PaisID")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PaisID");

                    b.ToTable("Paises");
                });

            modelBuilder.Entity("AgenciaAterrizar.Models.Persona", b =>
                {
                    b.Property<int>("PersonaID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PersonaID"));

                    b.Property<int>("DNI")
                        .HasColumnType("int");

                    b.Property<string>("Domicilio")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("FechaNacimiento")
                        .HasColumnType("datetime2");

                    b.Property<string>("Localidad")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NombreCompleto")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Pais")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Pasaporte")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Provincia")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TipoDocumento")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UsuarioID")
                        .HasColumnType("int");

                    b.Property<DateTime>("VencimientoPasaporte")
                        .HasColumnType("datetime2");

                    b.HasKey("PersonaID");

                    b.ToTable("Personas");
                });

            modelBuilder.Entity("AgenciaAterrizar.Models.RegimenComida", b =>
                {
                    b.Property<int>("RegimenID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("RegimenID"));

                    b.Property<int>("Descripcion")
                        .HasColumnType("int");

                    b.HasKey("RegimenID");

                    b.ToTable("RegimenComidas");
                });

            modelBuilder.Entity("AgenciaAterrizar.Models.ReservaHotel", b =>
                {
                    b.Property<int>("ReservaHotelID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ReservaHotelID"));

                    b.Property<int>("CantidadCuotas")
                        .HasColumnType("int");

                    b.Property<int>("CantidadHuespedes")
                        .HasColumnType("int");

                    b.Property<string>("CiudadID")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("CodigoHotel")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("FechaCheckIn")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("FechaCheckout")
                        .HasColumnType("datetime2");

                    b.Property<string>("MedioDePago")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("MontoPagado")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("NombreHotel")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("NroTarjeta")
                        .HasColumnType("int");

                    b.Property<int>("PersonaID")
                        .HasColumnType("int");

                    b.Property<decimal>("PrecioNoche")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("PrecioTotal")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("ReservaHotelID");

                    b.HasIndex("CiudadID");

                    b.HasIndex("PersonaID");

                    b.ToTable("ReservaHoteles");
                });

            modelBuilder.Entity("AgenciaAterrizar.Models.ReservaVuelo", b =>
                {
                    b.Property<int?>("ReservaVueloID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int?>("ReservaVueloID"));

                    b.Property<int?>("AcompanianteID")
                        .HasColumnType("int");

                    b.Property<string>("AerolineaID")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AerolineaNombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AeropuertoDestinoID")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AeropuertoOrigenID")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("CantidadCuotas")
                        .HasColumnType("int");

                    b.Property<int>("CantidadPasajeros")
                        .HasColumnType("int");

                    b.Property<string>("DuracionVueloIda")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DuracionVueloRegreso")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("EscalaID")
                        .HasColumnType("int");

                    b.Property<DateTime?>("FechaRegreso")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("FechaSalida")
                        .HasColumnType("datetime2");

                    b.Property<string>("MedioDePago")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("MontoTotalCompra")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("NombreAeropuertoDestino")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NombreAeropuertoOrigen")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NroTarjeta")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("PersonaId")
                        .HasColumnType("int");

                    b.HasKey("ReservaVueloID");

                    b.HasIndex("PersonaId");

                    b.ToTable("ReservaVuelos");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<string>("ProviderKey")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<string>("Name")
                        .HasMaxLength(128)
                        .HasColumnType("nvarchar(128)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("AgenciaAterrizar.Models.Acompaniante", b =>
                {
                    b.HasOne("AgenciaAterrizar.Models.ReservaVuelo", "ReservasVuelos")
                        .WithMany("Acompaniantes")
                        .HasForeignKey("ReservaVueloID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ReservasVuelos");
                });

            modelBuilder.Entity("AgenciaAterrizar.Models.Aeropuerto", b =>
                {
                    b.HasOne("AgenciaAterrizar.Models.Pais", "Pais")
                        .WithMany("Aeropuertos")
                        .HasForeignKey("PaisID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Pais");
                });

            modelBuilder.Entity("AgenciaAterrizar.Models.Ciudad", b =>
                {
                    b.HasOne("AgenciaAterrizar.Models.Pais", "Pais")
                        .WithMany("Ciudades")
                        .HasForeignKey("PaisID");

                    b.Navigation("Pais");
                });

            modelBuilder.Entity("AgenciaAterrizar.Models.Escala", b =>
                {
                    b.HasOne("AgenciaAterrizar.Models.Aerolinea", "Aerolinea")
                        .WithMany("Escalas")
                        .HasForeignKey("AerolineaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AgenciaAterrizar.Models.Aeropuerto", null)
                        .WithMany("Escalas")
                        .HasForeignKey("AeropuertoID");

                    b.HasOne("AgenciaAterrizar.Models.ReservaVuelo", "ReservasVuelos")
                        .WithMany("Escalas")
                        .HasForeignKey("ReservaVueloID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Aerolinea");

                    b.Navigation("ReservasVuelos");
                });

            modelBuilder.Entity("AgenciaAterrizar.Models.ReservaHotel", b =>
                {
                    b.HasOne("AgenciaAterrizar.Models.Ciudad", "Ciudad")
                        .WithMany("ReservaHoteles")
                        .HasForeignKey("CiudadID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AgenciaAterrizar.Models.Persona", "Persona")
                        .WithMany("ReservasHoteles")
                        .HasForeignKey("PersonaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Ciudad");

                    b.Navigation("Persona");
                });

            modelBuilder.Entity("AgenciaAterrizar.Models.ReservaVuelo", b =>
                {
                    b.HasOne("AgenciaAterrizar.Models.Persona", "Persona")
                        .WithMany("ReservasVuelos")
                        .HasForeignKey("PersonaId");

                    b.Navigation("Persona");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("AgenciaAterrizar.Models.Aerolinea", b =>
                {
                    b.Navigation("Escalas");
                });

            modelBuilder.Entity("AgenciaAterrizar.Models.Aeropuerto", b =>
                {
                    b.Navigation("Escalas");
                });

            modelBuilder.Entity("AgenciaAterrizar.Models.Ciudad", b =>
                {
                    b.Navigation("ReservaHoteles");
                });

            modelBuilder.Entity("AgenciaAterrizar.Models.Pais", b =>
                {
                    b.Navigation("Aeropuertos");

                    b.Navigation("Ciudades");
                });

            modelBuilder.Entity("AgenciaAterrizar.Models.Persona", b =>
                {
                    b.Navigation("ReservasHoteles");

                    b.Navigation("ReservasVuelos");
                });

            modelBuilder.Entity("AgenciaAterrizar.Models.ReservaVuelo", b =>
                {
                    b.Navigation("Acompaniantes");

                    b.Navigation("Escalas");
                });
#pragma warning restore 612, 618
        }
    }
}
