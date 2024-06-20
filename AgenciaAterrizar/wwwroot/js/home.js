document.addEventListener('DOMContentLoaded', (event) => {
    // Asigno por defecto la opción "Ida y Vuelta" de vuelos.
    checkSeleccionado('idaVuelta');

    document.getElementById('origen').addEventListener('change', function(e){
        let ida = this.value;
        console.log(ida);
    });

    // Evento de click al botón de búsqueda de vuelos.
    document.getElementById('buscarBtn').addEventListener('click', function(e) {
        e.preventDefault();

        $('#listaOfertas').empty();

        let ida = document.getElementById('origen').value;
        let vuelta = document.getElementById('destino').value;
        let fechaDesde = document.getElementById('fechaDesde').value;
        let fechaHasta = document.getElementById('fechaHasta').value;
        let pasajeros = document.getElementById('pasajeros').value;

        $.ajax({
            url: '../../Home/ObtenerVuelos',
            data: { VueloIda: ida, VueloRegreso: vuelta, FechaDesde: fechaDesde, FechaHasta: fechaHasta, CantPasajeros: pasajeros },
            type: 'GET',
            dataType: 'json',
            success: async function(result) {
                //Amadeus devuelve la información en formato JSON. Hay que convertirlo en Objeto de JS.
                let listaOfertasJson = JSON.parse(result.listaOfertas);

                //De la respuesta del Amadeus solo quiero el objeto DATA que es donde esta la info de los vuelos ofrecidos.
                var ofertasVuelo = listaOfertasJson.data;

                console.log(ofertasVuelo);

                //De cada oferta que me devuelve Amadeus queremos solo obtener la info que necesitamos. Se crea un objeto anónimo.
                for (const ofertaVuelo of ofertasVuelo) {
                    let oferta = {
                        idOferta: ofertaVuelo.id,
                        intinerario: ofertaVuelo.itineraries,
                        directo: ofertaVuelo.oneWay,
                        asientosDisponibles: ofertaVuelo.numberOfBookableSeats,
                        precio: ofertaVuelo.price,
                        adicionales: ofertaVuelo.pricingOptions,
                        codigoAerolinea: ofertaVuelo.validatingAirlineCodes[0],
                        nombreAerolinea: '',
                        cantEscalasIda: 1,
                        escalasIda: [],
                        cantEscalasVuelta: 1,
                        escalasVuelta: []
                    };

                    try {
                        // Obtener nombre de la aerolínea.
                        oferta.nombreAerolinea = await BuscarNombreAerolinea(oferta.codigoAerolinea);

                        // Obtener escalas de ida.
                        const escalasIda = oferta.intinerario[0].segments.map(async (segment) => {
                            const escala = {
                                departure: segment.departure.iataCode,
                                departureDate: segment.departure.at,
                                departureAirport: "",
                                arrival: segment.arrival.iataCode,
                                arrivalAirport: "",
                                arrivalDate: segment.arrival.at,
                                duration: segment.duration
                            };

                            const escalaCompleta = await BuscarAerolineasEscala(escala.departure, escala.arrival);

                            escala.departureAirport = escalaCompleta.departure;
                            escala.arrivalAirport = escalaCompleta.arrival;

                            return escala;
                        });

                        //Una vez que obtiene la respuesta de todas las llamadas a BuscarAerolineaEscala sigue.
                        oferta.escalasIda = await Promise.all(escalasIda);

                        // Obtener escalas de vuelta
                        const escalasVuelta = oferta.intinerario[1].segments.map(async (segment) => {
                            const escala = {
                                departure: segment.departure.iataCode,
                                departureDate: segment.departure.at,
                                departureAirport: "",
                                arrival: segment.arrival.iataCode,
                                arrivalAirport: "",
                                arrivalDate: segment.arrival.at,
                                duration: segment.duration
                            };

                            const escalaCompleta = await BuscarAerolineasEscala(escala.departure, escala.arrival);
                            escala.departureAirport = escalaCompleta.departure;
                            escala.arrivalAirport = escalaCompleta.arrival;

                            return escala;
                        });

                        oferta.escalasVuelta = await Promise.all(escalasVuelta);

                        // Completar con la cantidad de escalas
                        oferta.cantEscalasIda = oferta.intinerario[0].segments.length - 1;
                        oferta.cantEscalasVuelta = oferta.intinerario[1].segments.length - 1;

                        //Para poder pasarlo como atributo del elemento a.
                        let ofertaJson = JSON.stringify(oferta); 
                        
                        //Crear HTML para mostrar escalas del vuelo de ida.
                        let escalasIdaHTML = ``;
                        $.each(oferta.escalasIda, function(index, escalaIda){
                            escalasIdaHTML += `
                                <div class="accordion-body d-flex justify-content-center itinerarioAccordion">
                                    <div class="d-flex flex-column align-items-center justify-content-around">
                                        <span><b>${formatoFechaMostrar(escalaIda.departureDate)} - ${formatoFechaSinFechaMostrar(escalaIda.departureDate)}</b></span>
                                        <span>${escalaIda.departure} - ${escalaIda.departureAirport.ciudad}</span>
                                    </div>
                                    <div>
                                        <i class="fa-solid fa-arrow-right"></i>
                                    </div>
                                    <div class="d-flex flex-column align-items-center">
                                        <span><b>${formatoFechaMostrar(escalaIda.arrivalDate)} - ${formatoFechaSinFechaMostrar(escalaIda.arrivalDate)}</b></span>
                                        <span>${escalaIda.arrival} - ${escalaIda.arrivalAirport.ciudad}</span>
                                    </div> 
                                </div>                              
                            `
                        })


                        //Crear HTML para mostrar escalas del vuelo de regreso.
                        let escalasVueltaHTML = ``;
                        $.each(oferta.escalasVuelta, function(index, escalaVuelta){
                            escalasVueltaHTML += `
                                <div class="accordion-body d-flex justify-content-center itinerarioAccordion">
                                    <div class="d-flex flex-column align-items-center justify-content-around">
                                        <span><b>${formatoFechaMostrar(escalaVuelta.departureDate)} - ${formatoFechaSinFechaMostrar(escalaVuelta.departureDate)}</b></span>
                                        <span>${escalaVuelta.departure} - ${escalaVuelta.departureAirport.ciudad}</span>
                                    </div>
                                    <div>
                                        <i class="fa-solid fa-arrow-right"></i>
                                    </div>
                                    <div class="d-flex flex-column align-items-center">
                                        <span><b>${formatoFechaMostrar(escalaVuelta.arrivalDate)} - ${formatoFechaSinFechaMostrar(escalaVuelta.arrivalDate)}</b></span>
                                        <span>${escalaVuelta.arrival} - ${escalaVuelta.arrivalAirport.ciudad}</span>
                                    </div> 
                                </div>
                            `
                        })
                             
                        // Generar el HTML para la oferta
                        $('#listaOfertas').append(`
                            <div class="card mt-4">
                                <h5 class="card-title"><i class="fa-solid fa-plane"></i> ${oferta.intinerario[0].segments[0].carrierCode} - ${oferta.nombreAerolinea}</h5>
                                <div class="divItinerario">
                                    <div class="card-body d-flex align-items-center justify-content-between">
                                        <div class="divItinerarioCompleto">
                                            <p class="card-text"><i class="fa-solid fa-plane-departure"></i><b> Partida: </b> ${formatoFechaMostrar(oferta.intinerario[0].segments[0].departure.at)} | <span><b>${result.ida.ciudad} - ${result.vuelta.ciudad}</b></span></p>
                                            <div class="accordion-item itinerario">
                                                <div class="accordion-button collapsed d-flex justify-content-around align-items-center" data-bs-toggle="collapse" data-bs-target="#ov-${oferta.idOferta}-0" aria-expanded="false" aria-controls="flush-collapseOne">
                                                    <div class="d-flex flex-column align-items-center">
                                                        <span>${formatoFechaSinFechaMostrar(oferta.intinerario[0].segments[0].departure.at)}hs.</span>
                                                        <span>${result.ida.aeropuertoID}</span>
                                                    </div>
                                                    <div>
                                                        <i class="fa-solid fa-arrow-right"></i>
                                                    </div>
                                                    <div class="d-flex flex-column align-items-center">
                                                        <span>${formatoFechaSinFechaMostrar(oferta.intinerario[0].segments[oferta.cantEscalasIda].arrival.at)}hs.</span>
                                                        <span>${result.vuelta.aeropuertoID}</span>
                                                    </div>
                                                </div>

                                                <div id="ov-${oferta.idOferta}-0" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">                                                
                                                    ${escalasIdaHTML}
                                                </div>

                                                <div>
                                                    <div class="d-flex flex-column align-items-center divDuracion">
                                                        <p class="card-text"><i class="fa-regular fa-clock"></i><b> Duración: </b> ${convertirAHorayMinutos(oferta.intinerario[0].duration)}.</p>
                                                        <p class="card-text">
                                                            <i class="fa-regular fa-hand"></i> ${
                                                                oferta.cantEscalasIda === 0? "Directo" : `${oferta.cantEscalasIda} Paradas.`
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <p class="card-text"><i class="fa-solid fa-plane-arrival"></i><b>Regreso: </b>${formatoFechaMostrar(oferta.intinerario[1].segments[0].departure.at)} | <span><b>${result.vuelta.ciudad} - ${result.ida.ciudad}</b></span></p>
                                            <div class="accordion-item itinerario">
                                                <div class="accordion-button collapsed d-flex justify-content-around align-items-center" data-bs-toggle="collapse" data-bs-target="#ov-${oferta.idOferta}-1" aria-expanded="false" aria-controls="flush-collapseOne">
                                                    <div class="d-flex flex-column align-items-center">
                                                        <span>${formatoFechaSinFechaMostrar(oferta.intinerario[1].segments[0].departure.at)}hs.</span>
                                                        <span>${result.vuelta.aeropuertoID}</span>
                                                    </div>
                                                    <div>
                                                        <i class="fa-solid fa-arrow-right"></i>
                                                    </div>
                                                    <div class="d-flex flex-column align-items-center">
                                                        <span>${formatoFechaSinFechaMostrar(oferta.intinerario[1].segments[oferta.cantEscalasVuelta].arrival.at)}hs.</span>
                                                        <span>${result.ida.aeropuertoID}</span>
                                                    </div>
                                                </div>
                                                
                                                <div id="ov-${oferta.idOferta}-1" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">                                                                                           
                                                    ${escalasVueltaHTML}
                                                </div>

                                                <div>
                                                    <div class="d-flex flex-column align-items-center divDuracion">
                                                        <p class="card-text"><i class="fa-regular fa-clock"></i><b> Duración: </b> ${convertirAHorayMinutos(oferta.intinerario[1].duration)}.</p>
                                                        <p class="card-text">
                                                            <i class="fa-regular fa-hand"></i> ${
                                                                oferta.cantEscalasVuelta === 0? "Directo" : `${oferta.cantEscalasVuelta} Paradas.`
                                                            }
                                                        </p>
                                                    </div>                                          
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex flex-column align-items-center justify-content-between">
                                            <p class="card-text"><b>Precio Final: </b> $${oferta.precio.total}</p>
                                            <button class="buttonReserva mt-3" data-oferta='${ofertaJson}' onclick="reservarVuelo(this)">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"></path>
                                                </svg>
                                                <div class="text">Reservar Vuelo</div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>    
                        `);
                    } catch (error) {
                        console.error('Error obteniendo datos para la oferta:', error);
                    }
                }
            },
            error: function(error) {
                console.log("Error al realizar la petición de vuelos: ", error);
            }
        });
    });
});

function BuscarNombreAerolinea(codigoAerolinea){
    //Como debe consultar a la base de datos y esperar el resultado a retornar es una promesa.
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '../../Home/BuscarCodigoAerolinea',
            data: { CodigoAerolinea: codigoAerolinea },
            type: 'GET',
            dataType: 'json',
            success: function (result) {
                resolve(result);
            },
            error: function (e, status) {
                reject('Ocurrió un problema al buscar la aerolínea.');
            }
        });
    });
}

function BuscarAerolineasEscala(departure, arrival){

    return new Promise((resolve, reject) => {
        $.ajax({
            url: '../../Home/BuscarAeropuertosEscalas',
            data: { Departure : departure, Arrival : arrival },
            type: 'GET',
            dataType: 'json',
            success: function (result){
                resolve(result);
            },
            error: function(e, status){
                reject('Ocurrió un problema al buscar aeropuertos de escalas.');
            }
        });
    });
}


function formatoFechaMostrar(stringFecha) {
    const fecha = new Date(stringFecha);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'][fecha.getMonth()];
    const anio = fecha.getFullYear();

    return `${dia} ${mes}. ${anio}`;
}

function formatoFechaSinFechaMostrar(stringFecha) {
    console.log(stringFecha)
    const fecha = new Date(stringFecha);
    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');

    return `${horas}:${minutos}`;
}

function convertirAHorayMinutos(duracion) {
    // console.log(duracion);
    const regex = /PT(\d+)H(?:(\d+)M)?/; // Expresión regular para capturar horas y opcionalmente minutos.
    const match = duracion.match(regex);
    // console.log(match);

    const horas = match ? parseInt(match[1], 10) : 0;
    const minutos = match && match[2] ? parseInt(match[2], 10) : 0o0;

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

function reservarVuelo(element) {
    const ofertaJson = element.getAttribute('data-oferta');
    const oferta = JSON.parse(ofertaJson);
    console.log(oferta);
}
