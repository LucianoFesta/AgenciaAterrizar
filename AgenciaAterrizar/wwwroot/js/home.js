document.addEventListener('DOMContentLoaded', (event) => {

    //Asigno por defecto la opción "Ida y Vuelta" de vuelos.
    checkSeleccionado('idaVuelta');

    //Evento de click al butón de búsqueda de vuelos.
    document.getElementById('buscarBtn').addEventListener('click', function(e) {
        e.preventDefault();
    
        let ida = document.getElementById('origen').value;
        let vuelta = document.getElementById('destino').value;
        let fechaDesde = document.getElementById('fechaDesde').value;
        let fechaHasta = document.getElementById('fechaHasta').value;
        let pasajeros = document.getElementById('pasajeros').value;

        $.ajax({
            url: '../../Home/ObtenerVuelos',
            data: { VueloIda : ida, VueloRegreso : vuelta, FechaDesde : fechaDesde, FechaHasta : fechaHasta, CantPasajeros : pasajeros },
            type: 'GET',
            dataType: 'json',
            success: function(result) {
                var ofertasVuelo = result.data;
                var ofertasVueloMostrar = [];

                console.log("Lista de Ofertas", ofertasVuelo)

                $.each(ofertasVuelo, function(index, ofertaVuelo){
                    console.log("Oferta Vuelo: ", ofertaVuelo)
                    let oferta = {
                        intinerario : ofertaVuelo.itineraries,
                        directo : ofertaVuelo.oneWay,
                        asientosDisponibles : ofertaVuelo.numberOfBookableSeats,
                        precio : ofertaVuelo.price,
                        adicionales : ofertaVuelo.pricingOptions, 
                        segmentosVuelta: 1
                    };
                    
                    if(oferta.intinerario[1].segments.length > 1){
                        oferta.segmentosVuelta = oferta.intinerario[1].segments.length
                    }

                    console.log(oferta)

                    $('#listaOfertas').append(
                        `
                            <div class="card mt-4">
                                <div class="card-body">
                                    <h5 class="card-title"><i class="fa-solid fa-plane-departure me-2"></i> ${oferta.intinerario[0].segments[0].carrierCode}</h5>
                                    <p class="card-text"><b>Salida: </b> ${formatoFechaMostrar(oferta.intinerario[0].segments[0].departure.at)}Hs. <i class="fa-solid fa-arrow-right"></i> <b>Llegada: </b>${formatoFechaMostrar(oferta.intinerario[1].segments[oferta.segmentosVuelta - 1].arrival.at)}Hs. </p>
                                    <p class="card-text">${oferta.intinerario[0].segments.length - 1} Parada/s.</p>
                                    <p class="card-text"><b>Precio Final: </b> $${oferta.precio.total}</p>
                                    <p class="card-text"><b>Duración del vuelo: </b> ${convertirAHorayMinutos(oferta.intinerario[0].duration)}.</p>
                                    <a href="#" class="btn btn-primary">Reservar</a>
                                </div>
                            </div>
                        `
                    )

                    ofertasVueloMostrar.push(oferta);

                })

                console.log(ofertasVueloMostrar);

            },
            error: function(e, status) {
                console.error('Ocurrió un error a la hora de buscar vuelos.');
            }
        });
    });
})

function formatoFechaMostrar(stringFecha) {
    const fecha = new Date(stringFecha);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${anio} ${horas}:${minutos}`;
}

function convertirAHorayMinutos(duracion) {
    console.log(duracion)
    const regex = /PT(\d+)H(\d+)M/; //Expresión regular del formato devuelto por api.
    const coincide = duracion.match(regex);

    const horas = parseInt(coincide[1], 10);
    const minutos = parseInt(coincide[2], 10);

    return `${horas} Horas ${minutos} Minutos`;
}
    
// Función para asignar true o false al check de vuelos (ida e idaVuelta) según selecciona el usuario.
function checkSeleccionado(id) {
    var checkboxes = document.querySelectorAll('.btn-check');
    checkboxes.forEach(function(checkbox) {
        if (checkbox.id !== id) {
            checkbox.checked = false;
        }
    });
}

