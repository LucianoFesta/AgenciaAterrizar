document.addEventListener('DOMContentLoaded', (event) => {

    // Busco oferta en base a las cookies del usuario
    $.ajax({
        url: '../../Home/BuscarOfertaCookie',
        data: { },
        type: 'GET',
        dataType: 'json',
        beforeSend: function() {
            // Muestra el indicador de carga antes de enviar la solicitud
            $('#loadingInicial').show();
        },
        success: async function(result){
            $('#loadingInicial').hide();

            if(result.success){
                var ofertaVueloJSON = JSON.parse(result.vuelo);
                var ofertaVuelo = ofertaVueloJSON.data;
                var oferta = {}

                if(!result.idaVuelta){
                    oferta = {
                        idOferta: ofertaVuelo[0].id,
                        idaYvuelta: false,
                        pasajeros: result.pasajeros,
                        intinerario: ofertaVuelo[0].itineraries,
                        equipaje: ofertaVuelo[0].travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.quantity,
                        asientosDisponibles: ofertaVuelo[0].numberOfBookableSeats,
                        precio: ofertaVuelo[0].price,
                        codigoAerolinea: ofertaVuelo[0].validatingAirlineCodes[0],
                        nombreAerolinea: '',
                        cantEscalasIda: 1,
                        escalasIda: [],
                        cantEscalasVuelta: 0,
                        escalasVuelta: []
                    };
                    oferta.nombreAerolinea = await BuscarNombreAerolinea(oferta.codigoAerolinea);
        
                    const escala = oferta.intinerario[0].segments.map(async (segment, index) => {
                        const escala = {
                            departure: segment.departure.iataCode,
                            arrival: segment.arrival.iataCode,
                            airline: segment.carrierCode,
                            escalaNumber: index + 1,
                            ida: true,
                            vuelta: false,
                            departureDate: segment.departure.at,
                            departureAirport: "",
                            arrivalAirport: "",
                            arrivalDate: segment.arrival.at,
                            fligthNumber: segment.number,
                            duration: segment.duration
                        };
    
                        const escalaCompleta = await BuscarAerolineasEscala(escala.departure, escala.arrival);
    
                        escala.departureAirport = escalaCompleta.departure;
                        escala.arrivalAirport = escalaCompleta.arrival;
                        
                        return escala;
                    });
                    oferta.escalasIda = await Promise.all(escala);

                    // Completar con la cantidad de escalas
                    oferta.cantEscalasIda = oferta.intinerario[0].segments.length - 1;
    
                }else{
                    oferta = {
                        idOferta: ofertaVuelo[0].id,
                        idaYvuelta: true,
                        pasajeros: result.pasajeros,
                        intinerario: ofertaVuelo[0].itineraries,
                        equipaje: ofertaVuelo[0].travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.quantity,
                        asientosDisponibles: ofertaVuelo[0].numberOfBookableSeats,
                        precio: ofertaVuelo[0].price,
                        codigoAerolinea: ofertaVuelo[0].validatingAirlineCodes[0],
                        nombreAerolinea: '',
                        cantEscalasIda: 1,
                        escalasIda: [],
                        cantEscalasVuelta: 1,
                        escalasVuelta: []
                    };

                    // Obtener nombre de la aerolínea.
                    oferta.nombreAerolinea = await BuscarNombreAerolinea(oferta.codigoAerolinea);

                    // Obtener escalas de ida.
                    const escalasIda = oferta.intinerario[0].segments.map(async (segment, index) => {

                        const escala = {
                            departure: segment.departure.iataCode,
                            arrival: segment.arrival.iataCode,
                            airline: segment.carrierCode,
                            escalaNumber: index + 1,
                            ida: true,
                            vuelta: false,
                            departureDate: segment.departure.at,
                            departureAirport: "",
                            arrivalAirport: "",
                            arrivalDate: segment.arrival.at,
                            fligthNumber: segment.number,
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
                    const escalasVuelta = oferta.intinerario[1].segments.map(async (segment, index) => {
                        const escala = {
                            departure: segment.departure.iataCode,
                            arrival: segment.arrival.iataCode,
                            airline: segment.carrierCode,
                            escalaNumber: index + 1,
                            ida: false,
                            vuelta: true,
                            departureDate: segment.departure.at,
                            departureAirport: "",
                            arrivalAirport: "",
                            arrivalDate: segment.arrival.at,
                            fligthNumber: segment.number,
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

                }

                let ofertaJson = JSON.stringify(oferta); 

                // Renderizar la oferta en el DOM
                $('#divUltimoVuelo').append(`
                    <div class="divCookie animate__animated animate__fadeIn">
                        ${oferta.idaYvuelta ? `<h4>¿Sigues con ganas de volar a ${oferta.escalasVuelta[0].departureAirport.ciudad}? </h4>` : `<h4>¿Sigues con ganas de volar a ${oferta.escalasIda[oferta.escalasIda.length - 1].arrivalAirport.ciudad}? </h4>`}
                        <hr>
                        <div class="d-flex justify-content-center">
                            <form id="reservaFormUltimoVuelo" method="post" action="/ReservaVuelo/FinalizarCompra" target="_blank">
                                <input type="hidden" name="ofertaJson" id="ofertaInputUltimoVuelo">
                            </form>
                            <div class="cardBusquedas">
                                <div class="card-img">
                                    <span class="text-center mx-2">${oferta.codigoAerolinea} - ${oferta.nombreAerolinea}</span>
                                </div>
                                <div class="card-info">
                                    ${oferta.idaYvuelta ? `<p class="text-title"><i class="fa-solid fa-plane mx-2"></i><span>${oferta.escalasIda[0].departureAirport.ciudad}(${oferta.escalasIda[0].departureAirport.aeropuertoID}) - ${oferta.escalasVuelta[0].departureAirport.ciudad}(${oferta.escalasVuelta[0].departureAirport.aeropuertoID})</span></p>` : `<p class="text-title"><i class="fa-solid fa-plane mx-2"></i><span>${oferta.escalasIda[0].departureAirport.ciudad}(${oferta.escalasIda[0].departureAirport.aeropuertoID}) - ${oferta.escalasIda[oferta.escalasIda.length - 1].arrivalAirport.ciudad}(${oferta.escalasIda[oferta.escalasIda.length - 1].arrivalAirport.aeropuertoID})</span></p>`}
                                </div>
                                <div class="d-flex">
                                    <div class="card-info">
                                        ${oferta.idaYvuelta ? `<p><i class="fa-solid fa-calendar-days mx-2"></i><span>${formatoFechaMostrar(oferta.escalasIda[0].departureDate)} - ${formatoFechaSinFechaMostrar(oferta.escalasIda[0].departureDate)}hs. al ${formatoFechaMostrar(oferta.escalasVuelta[oferta.escalasVuelta.length - 1].arrivalDate)} - ${formatoFechaSinFechaMostrar(oferta.escalasVuelta[oferta.escalasVuelta.length - 1].arrivalDate)}hs.</span></p>` : `<p><i class="fa-solid fa-calendar-days mx-2"></i><span>${formatoFechaMostrar(oferta.escalasIda[0].departureDate)} - ${formatoFechaSinFechaMostrar(oferta.escalasIda[0].departureDate)}hs.</span></p>`}
                                    </div>
                                    <div class="card-info mx-4">
                                        <p><i class="fa-solid fa-user mx-2"></i><span>${oferta.pasajeros}</span></p>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <span class="text-title">$${oferta.precio.total}</span>
                                    <div class="card-button" data-ultima-oferta='${ofertaJson}' onclick="reservarUltimaOferta(this)">
                                        <svg class="svg-icon" viewBox="0 0 20 20" mt-2>
                                            <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
                                            <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
                                            <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                `)
            }
        },
        error: function(x, status){
            console.log('error');
        }
    })

    // Asigno por defecto la opción "Ida y Vuelta" de vuelos.
    checkSeleccionado('idaVuelta');

    // Estabalecer atributo min en los input date para limitar la selección de fechas.
    var fechaActual = new Date().toISOString().split('T')[0];

    var fechaDesde = document.getElementById('fechaDesde');
    var fechaDesdeSoloIda = document.getElementById('fechaDesdeSoloIda');
    var fechaHasta = document.getElementById('fechaHasta');
    var pasajeros = document.getElementById('pasajeros');
    var origen = document.getElementById('origen');

    fechaDesde.setAttribute("min", fechaActual);
    fechaDesdeSoloIda.setAttribute("min", fechaActual);

    fechaDesde.addEventListener('change', function(){
        fechaHasta.setAttribute('min', fechaDesde.value);
        document.getElementById('inputFechaDesde').style.display = 'none';
    });

    fechaDesdeSoloIda.addEventListener('change', function(){
        fechaHasta.setAttribute('min', fechaDesdeSoloIda.value);
        document.getElementById('inputFechaDesdeSoloIda').style.display = 'none';
    });

    fechaHasta.addEventListener('change', function(){
        document.getElementById('inputFechaHasta').style.display = 'none';
    });

    origen.addEventListener('change', function(){
        document.getElementById('inputOrigen').style.display = 'none';
    });

    // Evento de click al botón de búsqueda de vuelos.
    document.getElementById('buscarBtn').addEventListener('click', function(e) {
        e.preventDefault();

        $('#listaOfertas').empty();

        let ida = document.getElementById('origen').value;
        let vuelta = document.getElementById('destino').value;
        let fechaHasta = document.getElementById('fechaHasta').value;
        let fechaDesde = document.getElementById('fechaDesde').value;
        let pasajeros = document.getElementById('pasajeros').value;
        let checkIdaVuelta = document.getElementById('idaVuelta').checked;

        if(document.getElementById('idaVuelta').checked){
            // Verificamos si existen errores al enviar una búsqueda y mostramos mensaje de error si los hay.
            var erroresInput = 0;
    
            document.getElementById('inputOrigen').style.display = 'none';
            if(ida == '')
            {
                document.getElementById('inputOrigen').style.display = 'block';
                erroresInput ++;
            }
    
            document.getElementById('inputDestino').style.display = 'none';
            if(vuelta == '')
            {
                document.getElementById('inputDestino').style.display = 'block';
                erroresInput ++;
            }
    
            document.getElementById('inputFechaDesde').style.display = 'none';
            if(fechaDesde == '')
            {
                document.getElementById('inputFechaDesde').style.display = 'block';
                erroresInput ++;
            }
    
            document.getElementById('inputFechaHasta').style.display = 'none';
            if(fechaDesde == '')
            {
                document.getElementById('inputFechaHasta').style.display = 'block';
                erroresInput ++;
            }
            document.getElementById('inputFechaDesdeMayorAHoy').style.display = 'none';
            var fechaDesdeDate = new Date(fechaDesde);
            if(fechaDesde && fechaDesdeDate < Date.now()){
                document.getElementById('inputFechaDesdeMayorAHoy').style.display = 'block';
                erroresInput ++;
            }
    
            document.getElementById('inputFechaHastaMayorADesde').style.display = 'none';
            if(fechaDesde > fechaHasta){
                document.getElementById('inputFechaHastaMayorADesde').style.display = 'block';
                erroresInput ++;
            }
    
            if(erroresInput > 0){
                return;
            }
        }
        
        //Verificar si se trata de un vuelo de ida-vuelta o solo de ida.
        if(document.getElementById('ida').checked){
            fechaDesde = document.getElementById('fechaDesdeSoloIda').value;
            fechaHasta = '';
            pasajeros = document.getElementById('pasajerosSoloIda').value;

            var erroresInput = 0;

            document.getElementById('inputOrigen').style.display = 'none';
            if(ida == '')
            {
                document.getElementById('inputOrigen').style.display = 'block';
                document.getElementById('apellido').classList.add('form-controlError')
                erroresInput ++;
            }
    
            document.getElementById('inputDestino').style.display = 'none';
            if(vuelta == '')
            {
                document.getElementById('inputDestino').style.display = 'block';
                erroresInput ++;
            }

            document.getElementById('inputFechaDesdeSoloIda').style.display = 'none';
            if(fechaDesde == '')
            {
                document.getElementById('inputFechaDesdeSoloIda').style.display = 'block';
                erroresInput ++;
            }

            document.getElementById('inputFechaDesdeMayorAHoySoloIda').style.display = 'none';
            var fechaDesdeDate = new Date(fechaDesde);
            if(fechaDesde && fechaDesdeDate < Date.now()){
                document.getElementById('inputFechaDesdeMayorAHoySoloIda').style.display = 'block';
                erroresInput ++;
            }

            if(erroresInput > 0){
                return;
            }
        }

        $.ajax({
            url: '../../Home/ObtenerVuelos',
            //data: { VueloIda: 'EZE', VueloRegreso: 'BKK', FechaDesde: '2024-08-10', FechaHasta: '2024-08-31', CantPasajeros: 2 },
            data: { VueloIda: ida, VueloRegreso: vuelta, FechaDesde: fechaDesde, FechaHasta: fechaHasta, CantPasajeros: pasajeros, EsVueloIdaVuelta: checkIdaVuelta },
            type: 'GET',
            dataType: 'json',
            beforeSend: function() {
                // Muestra el indicador de carga antes de enviar la solicitud
                $('#loading').show();
            },
            success: async function(result) {
                if(!result.success)
                {   
                    if(result.error){
                        console.log(result.error)
                    }

                    $('#loading').hide();

                    Swal.fire({
                        title: 'Ups, existe un inconveniente:',
                        text: result.message,
                        icon: 'warning',
                        confirmButtonText: 'Volver a intentarlo'
                    });
                }

                //Amadeus devuelve la información en formato JSON. Hay que convertirlo en Objeto de JS.
                let listaOfertasJson = JSON.parse(result.listaOfertas);

                //De la respuesta del Amadeus solo quiero el objeto DATA que es donde esta la info de los vuelos ofrecidos.
                var ofertasVuelo = listaOfertasJson.data;

                $('#loading').hide();
                $('#tituloDeBusqueda').show();

                const resultListElement = document.getElementById('tituloDeBusqueda');
                resultListElement.scrollIntoView({ behavior: 'smooth' });

                if(ofertasVuelo.length == 0){
                    $('#listaOfertas').append(`
                            <div class="divSinOfertas">
                                <p>Disculpe, no pudimos encontrar ofertas disponibles de acuerdo a tu búsqueda.</p>
                                <i class="fa-regular fa-face-sad-tear"></i>
                                <p>Por favor, intente nuevamente con otras fechas o destino.</p>
                            </div>
                        `)
                }else{
                    //Si se trata de un vuelo de ida solamente, creo un html acorde a la respuesta de amadeus.
                    if(document.getElementById('ida').checked)
                    {
                        //De cada oferta que me devuelve Amadeus queremos solo obtener la info que necesitamos. Se crea un objeto anónimo.
                        for (const ofertaVuelo of ofertasVuelo) {
    
                            let oferta = {
                                idOferta: ofertaVuelo.id,
                                idaYvuelta: false,
                                pasajeros: pasajeros,
                                intinerario: ofertaVuelo.itineraries,
                                equipaje: ofertaVuelo.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.quantity,
                                asientosDisponibles: ofertaVuelo.numberOfBookableSeats,
                                precio: ofertaVuelo.price,
                                codigoAerolinea: ofertaVuelo.validatingAirlineCodes[0],
                                nombreAerolinea: '',
                                cantEscalasIda: 1,
                                escalasIda: [],
                                cantEscalasVuelta: 0,
                                escalasVuelta: []
                            };
    
                            try {
                                oferta.nombreAerolinea = await BuscarNombreAerolinea(oferta.codigoAerolinea);
    
                                const escala = oferta.intinerario[0].segments.map(async (segment, index) => {
                                    const escala = {
                                        departure: segment.departure.iataCode,
                                        arrival: segment.arrival.iataCode,
                                        airline: segment.carrierCode,
                                        escalaNumber: index + 1,
                                        ida: true,
                                        vuelta: false,
                                        departureDate: segment.departure.at,
                                        departureAirport: "",
                                        arrivalAirport: "",
                                        arrivalDate: segment.arrival.at,
                                        fligthNumber: segment.number,
                                        duration: segment.duration
                                    };
    
                                    const escalaCompleta = await BuscarAerolineasEscala(escala.departure, escala.arrival);
        
                                    escala.departureAirport = escalaCompleta.departure;
                                    escala.arrivalAirport = escalaCompleta.arrival;
                                    
                                    return escala;
                                });
    
                                oferta.escalasIda = await Promise.all(escala);
    
                                // Completar con la cantidad de escalas
                                oferta.cantEscalasIda = oferta.intinerario[0].segments.length - 1;
    
                                console.log(oferta)
    
                                //Para poder pasarlo como atributo del elemento a.
                                let ofertaJson = JSON.stringify(oferta); 
    
                                //Crear HTML para mostrar escalas del vuelo de ida.
                                let escalasHTML = ``;
                                $.each(oferta.escalasIda, function(index, escala){
                                    escalasHTML += `
                                        <div class="accordion-body d-flex justify-content-center itinerarioAccordion">
                                            <div class="d-flex flex-column align-items-center justify-content-around">
                                                <span><b>${formatoFechaMostrar(escala.departureDate)} - ${formatoFechaSinFechaMostrar(escala.departureDate)}</b></span>
                                                ${
                                                    escala.departureAirport !== null ? `
                                                        <span>${escala.departure} - ${escala.departureAirport.ciudad}, ${escala.departureAirport.paisNombre}</span>
                                                    ` : `
                                                        <span>${escala.departure} - ${escala.departure}</span>
                                                    `
                                                }
                                            </div>
                                            <div>
                                                <i class="fa-solid fa-arrow-right"></i>
                                            </div>
                                            <div class="d-flex flex-column align-items-center">
                                                <span><b>${formatoFechaMostrar(escala.arrivalDate)} - ${formatoFechaSinFechaMostrar(escala.arrivalDate)}</b></span>
                                                ${
                                                    escala.arrivalAirport !== null ? `
                                                        <span>${escala.arrival} - ${escala.arrivalAirport.ciudad}, ${escala.arrivalAirport.paisNombre}</span>
                                                    ` : `
                                                        <span>${escala.arrival} - ${escala.arrival}</span>
                                                    `
                                                }
                                            </div> 
                                        </div>                              
                                    `
                                });
    
                                // Generar el HTML para la oferta
                                $('#listaOfertas').append(`
                                    <div class="card mt-4 animate__animated animate__fadeIn">
                                        <span class="card-title"><i class="fa-solid fa-plane"></i> ${oferta.intinerario[0].segments[0].carrierCode} - ${oferta.nombreAerolinea}</span>
                                        <div class="divItinerario">
                                            <div class="card-body d-flex align-items-center justify-content-between divContenidoOferta">
                                                <div class="divItinerarioCompleto">
                                                    <p class="card-text"><i class="fa-solid fa-plane-departure"></i><b> Vuelo: </b> ${formatoFechaMostrar(oferta.intinerario[0].segments[0].departure.at)} | <span><b>${result.ida.ciudad} - ${result.vuelta.ciudad}</b></span></p>
                                                    <div class="accordion-item itinerario">
                                                        <div class="accordion-button collapsed d-flex justify-content-around align-items-center" data-bs-toggle="collapse" data-bs-target="#ov-${oferta.idOferta}-0" aria-expanded="false" aria-controls="flush-collapseOne">
                                                            <div class="d-flex flex-column align-items-center">
                                                                <span>${formatoFechaSinFechaMostrar(oferta.intinerario[0].segments[0].departure.at)}hs.</span>
                                                                <span class="text-title">${result.ida.aeropuertoID}</span>
                                                            </div>
                                                            <div>
                                                                <i class="fa-solid fa-arrow-right"></i>
                                                            </div>
                                                            <div class="d-flex flex-column align-items-center">
                                                                <span>${formatoFechaSinFechaMostrar(oferta.intinerario[0].segments[oferta.cantEscalasIda].arrival.at)}hs.</span>
                                                                <span class="text-title">${result.vuelta.aeropuertoID}</span>
                                                            </div>
                                                            <div class="equipaje">
                                                                <p><b>Equipaje</b></p>
                                                                ${
                                                                    oferta.equipaje === 0 ? `
                                                                        <div class="d-flex" data-bs-toggle="tooltip" data-bs-placement="top" title="Solo bolso de mano.">
                                                                            <img src="${appUrl}images/bagInclude.svg" alt="Icon">
                                                                            <img src="${appUrl}images/carryonNoInclude.svg" alt="Icon">
                                                                            <img src="${appUrl}images/baggageNoInclude.svg" alt="Icon">
                                                                        </div>                                                               
                                                                    ` : oferta.equipaje === 1 ? `
                                                                        <div class="d-flex" data-bs-toggle="tooltip" data-bs-placement="top" title="Bolso de mano y Carry On.">
                                                                            <img src="${appUrl}images/bagInclude.svg" alt="Icon">
                                                                            <img src="${appUrl}images/carryonInclude.svg" alt="Icon">
                                                                            <img src="${appUrl}images/baggageNoInclude.svg" alt="Icon">
                                                                        </div>                                                               
                                                                    ` : `
                                                                        <div class="d-flex" data-bs-placement="top" title="Bolso de mano, Carry On y Equipaje a despachar.">
                                                                            <img src="${appUrl}images/bagInclude.svg" alt="Icon">
                                                                            <img src="${appUrl}images/carryonInclude.svg" alt="Icon">
                                                                            <img src="${appUrl}images/baggageInclude.svg" alt="Icon">
                                                                        </div>                                                                
                                                                    `
                                                                }
                                                            </div>
                                                        </div>
        
                                                        <div id="ov-${oferta.idOferta}-0" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">                                                
                                                            ${escalasHTML}
                                                        </div>
        
                                                        <div>
                                                            <div class="d-flex flex-column align-items-center divDuracion">
                                                                <p class="card-text"><i class="fa-regular fa-clock"></i><b> Duración: </b> ${convertirAHorayMinutos(oferta.intinerario[0].duration)}.</p>
                                                                <p class="card-text">
                                                                    <i class="fa-regular fa-hand"></i> ${
                                                                        oferta.cantEscalasIda === 0? "Directo" : `${oferta.cantEscalasIda} Escalas.`
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
    
                                                <form id="reservaForm" method="post" action="/ReservaVuelo/FinalizarCompra" target="_blank">
                                                    <input type="hidden" name="ofertaJson" id="ofertaInput">
                                                </form>
    
                                                <div class="d-flex flex-column align-items-center justify-content-between">
                                                    <p class="card-text"><b>Precio Final: </b> $${oferta.precio.total}</p>
                                                    <button class="buttonReserva mt-3" data-oferta='${ofertaJson}' onclick="reservarVuelo(this)">
                                                        <svg class="mt-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"></path>
                                                        </svg>
                                                        <div class="text">Reservar Vuelo</div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>    
                                `);
    
                            }catch (error) {
                                console.error('Error obteniendo datos para la oferta:', error);
                            }
                        }
                    }
                    //Si set trata de un vuelo de ida-vuelta, creo el html acorde a la respuesta de amadeus.
                    else
                    {
                        //De cada oferta que me devuelve Amadeus queremos solo obtener la info que necesitamos. Se crea un objeto anónimo.
                        for (const ofertaVuelo of ofertasVuelo) {
                            let oferta = {
                                idOferta: ofertaVuelo.id,
                                idaYvuelta: true,
                                pasajeros: pasajeros,
                                intinerario: ofertaVuelo.itineraries,
                                equipaje: ofertaVuelo.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.quantity,
                                asientosDisponibles: ofertaVuelo.numberOfBookableSeats,
                                precio: ofertaVuelo.price,
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
                                const escalasIda = oferta.intinerario[0].segments.map(async (segment, index) => {
    
                                    const escala = {
                                        departure: segment.departure.iataCode,
                                        arrival: segment.arrival.iataCode,
                                        airline: segment.carrierCode,
                                        escalaNumber: index + 1,
                                        ida: true,
                                        vuelta: false,
                                        departureDate: segment.departure.at,
                                        departureAirport: "",
                                        arrivalAirport: "",
                                        arrivalDate: segment.arrival.at,
                                        fligthNumber: segment.number,
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
                                const escalasVuelta = oferta.intinerario[1].segments.map(async (segment, index) => {
                                    const escala = {
                                        departure: segment.departure.iataCode,
                                        arrival: segment.arrival.iataCode,
                                        airline: segment.carrierCode,
                                        escalaNumber: index + 1,
                                        ida: false,
                                        vuelta: true,
                                        departureDate: segment.departure.at,
                                        departureAirport: "",
                                        arrivalAirport: "",
                                        arrivalDate: segment.arrival.at,
                                        fligthNumber: segment.number,
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
                                                ${
                                                    escalaIda.departureAirport !== null ? `
                                                        <span>${escalaIda.departure} - ${escalaIda.departureAirport.ciudad}, ${escalaIda.departureAirport.paisNombre}</span>
                                                    ` : `
                                                        <span>${escalaIda.departure} - ${escalaIda.departure}</span>
                                                    `
                                                }
                                            </div>
                                            <div>
                                                <i class="fa-solid fa-arrow-right"></i>
                                            </div>
                                            <div class="d-flex flex-column align-items-center">
                                                <span><b>${formatoFechaMostrar(escalaIda.arrivalDate)} - ${formatoFechaSinFechaMostrar(escalaIda.arrivalDate)}</b></span>
                                                ${
                                                    escalaIda.arrivalAirport !== null ? `
                                                        <span>${escalaIda.arrival} - ${escalaIda.arrivalAirport.ciudad}, ${escalaIda.arrivalAirport.paisNombre}</span>
                                                    ` : `
                                                        <span>${escalaIda.arrival} - ${escalaIda.arrival}</span>
                                                    `
                                                }
                                            </div> 
                                        </div>                              
                                    `
                                });
        
                                //Crear HTML para mostrar escalas del vuelo de regreso.
                                let escalasVueltaHTML = ``;
                                $.each(oferta.escalasVuelta, function(index, escalaVuelta){
                                    escalasVueltaHTML += `
                                        <div class="accordion-body d-flex justify-content-center itinerarioAccordion">
                                            <div class="d-flex flex-column align-items-center justify-content-around">
                                                <span><b>${formatoFechaMostrar(escalaVuelta.departureDate)} - ${formatoFechaSinFechaMostrar(escalaVuelta.departureDate)}</b></span>
                                                ${
                                                    escalaVuelta.departureAirport !== null ? `
                                                        <span>${escalaVuelta.departure} - ${escalaVuelta.departureAirport.ciudad}, ${escalaVuelta.departureAirport.paisNombre}</span>
                                                    ` : `
                                                        <span>${escalaVuelta.departure} - ${escalaVuelta.departure}</span>
                                                    `
                                                }
                                            </div>
                                            <div>
                                                <i class="fa-solid fa-arrow-right"></i>
                                            </div>
                                            <div class="d-flex flex-column align-items-center">
                                                <span><b>${formatoFechaMostrar(escalaVuelta.arrivalDate)} - ${formatoFechaSinFechaMostrar(escalaVuelta.arrivalDate)}</b></span>
                                                ${
                                                    escalaVuelta.arrivalAirport !== null ? `
                                                        <span>${escalaVuelta.arrival} - ${escalaVuelta.arrivalAirport.ciudad}, ${escalaVuelta.arrivalAirport.paisNombre}</span>
                                                    ` : `
                                                        <span>${escalaVuelta.arrival} - ${escalaVuelta.arrival}</span>
                                                    `
                                                }
                                            </div> 
                                        </div>
                                    `
                                });
                                        
                                // Generar el HTML para la oferta
                                $('#listaOfertas').append(`
                                    <div class="card mt-4 animate__animated animate__fadeIn">
                                        <h5 class="card-title"><i class="fa-solid fa-plane"></i> ${oferta.intinerario[0].segments[0].carrierCode} - ${oferta.nombreAerolinea}</h5>
                                        <div class="divItinerario">
                                            <div class="card-body d-flex align-items-center justify-content-between divContenidoOferta">
                                                <div class="divItinerarioCompleto">
                                                    <p class="card-text"><i class="fa-solid fa-plane-departure"></i><b> Partida: </b> ${formatoFechaMostrar(oferta.intinerario[0].segments[0].departure.at)} | <span><b>${result.ida.ciudad} - ${result.vuelta.ciudad}</b></span></p>
                                                    <div class="accordion-item itinerario">
                                                        <div class="accordion-button collapsed d-flex justify-content-around align-items-center" data-bs-toggle="collapse" data-bs-target="#ov-${oferta.idOferta}-0" aria-expanded="false" aria-controls="flush-collapseOne">
                                                            <div class="d-flex flex-column align-items-center">
                                                                <span>${formatoFechaSinFechaMostrar(oferta.intinerario[0].segments[0].departure.at)}hs.</span>
                                                                <span class="text-title">${result.ida.aeropuertoID}</span>
                                                            </div>
                                                            <div>
                                                                <i class="fa-solid fa-arrow-right"></i>
                                                            </div>
                                                            <div class="d-flex flex-column align-items-center">
                                                                <span>${formatoFechaSinFechaMostrar(oferta.intinerario[0].segments[oferta.cantEscalasIda].arrival.at)}hs.</span>
                                                                <span class="text-title">${result.vuelta.aeropuertoID}</span>
                                                            </div>
                                                            <div class="equipaje">
                                                                <p><b>Equipaje</b></p>
                                                                    ${
                                                                        oferta.equipaje === 0 ? `
                                                                            <div class="d-flex" data-bs-toggle="tooltip" data-bs-placement="top" title="Solo bolso de mano.">
                                                                                <img src="${appUrl}images/bagInclude.svg" alt="Icon">
                                                                                <img src="${appUrl}images/carryonNoInclude.svg" alt="Icon">
                                                                                <img src="${appUrl}images/baggageNoInclude.svg" alt="Icon">
                                                                            </div>                                                               
                                                                        ` : oferta.equipaje === 1 ? `
                                                                            <div class="d-flex" data-bs-toggle="tooltip" data-bs-placement="top" title="Bolso de mano y Carry On.">
                                                                                <img src="${appUrl}images/bagInclude.svg" alt="Icon">
                                                                                <img src="${appUrl}images/carryonInclude.svg" alt="Icon">
                                                                                <img src="${appUrl}images/baggageNoInclude.svg" alt="Icon">
                                                                            </div>                                                               
                                                                        ` : `
                                                                            <div class="d-flex" data-bs-placement="top" title="Bolso de mano, Carry On y Equipaje a despachar.">
                                                                                <img src="${appUrl}images/bagInclude.svg" alt="Icon">
                                                                                <img src="${appUrl}images/carryonInclude.svg" alt="Icon">
                                                                                <img src="${appUrl}images/baggageInclude.svg" alt="Icon">
                                                                            </div>                                                                
                                                                        `
                                                                    }
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
                                                                        oferta.cantEscalasIda === 0? "Directo" : `${oferta.cantEscalasIda} Escalas.`
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
                                                                <span class="text-title">${result.vuelta.aeropuertoID}</span>
                                                            </div>
                                                            <div>
                                                                <i class="fa-solid fa-arrow-right"></i>
                                                            </div>
                                                            <div class="d-flex flex-column align-items-center">
                                                                <span>${formatoFechaSinFechaMostrar(oferta.intinerario[1].segments[oferta.cantEscalasVuelta].arrival.at)}hs.</span>
                                                                <span class="text-title">${result.ida.aeropuertoID}</span>
                                                            </div>
                                                            <div class="equipaje">
                                                                <p><b>Equipaje</b></p>
                                                                ${
                                                                    oferta.equipaje === 0 ? `
                                                                        <div class="d-flex" data-bs-toggle="tooltip" data-bs-placement="top" title="Solo bolso de mano.">
                                                                            <img src="${appUrl}images/bagInclude.svg" alt="Icon">
                                                                            <img src="${appUrl}images/carryonNoInclude.svg" alt="Icon">
                                                                            <img src="${appUrl}images/baggageNoInclude.svg" alt="Icon">
                                                                        </div>                                                               
                                                                    ` : oferta.equipaje === 1 ? `
                                                                        <div class="d-flex" data-bs-toggle="tooltip" data-bs-placement="top" title="Bolso de mano y Carry On.">
                                                                            <img src="${appUrl}images/bagInclude.svg" alt="Icon">
                                                                            <img src="${appUrl}images/carryonInclude.svg" alt="Icon">
                                                                            <img src="${appUrl}images/baggageNoInclude.svg" alt="Icon">
                                                                        </div>                                                               
                                                                    ` : `
                                                                        <div class="d-flex" data-bs-placement="top" title="Bolso de mano, Carry On y Equipaje a despachar.">
                                                                            <img src="${appUrl}images/bagInclude.svg" alt="Icon">
                                                                            <img src="${appUrl}images/carryonInclude.svg" alt="Icon">
                                                                            <img src="${appUrl}images/baggageInclude.svg" alt="Icon">
                                                                        </div>                                                                
                                                                    `
                                                                }
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
                                                                        oferta.cantEscalasVuelta === 0? "Directo" : `${oferta.cantEscalasVuelta} Escalas.`
                                                                    }
                                                                </p>
                                                            </div>                                          
                                                        </div>
                                                    </div>
                                                </div>
    
                                                <form id="reservaForm" method="post" action="/ReservaVuelo/FinalizarCompra" target="_blank">
                                                    <input type="hidden" name="ofertaJson" id="ofertaInput">
                                                </form>
    
                                                <div class="d-flex flex-column align-items-center justify-content-between">
                                                    <p class="text-title"><b>Precio: </b> $${oferta.precio.total}</p>
                                                    <button class="buttonReserva" data-oferta='${ofertaJson}' onclick="reservarVuelo(this)">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                            <path class="mt-3" stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"></path>
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
    
                    }
                    
                }

            },
            error: function(error) {
                Swal.fire({
                    title: 'Ups, existe un inconveniente:',
                    text: 'Ocurrió un error a la hora de mostrar el resultado de la búsqueda solicitada. Por favor, intente más tarde.',
                    icon: 'warning',
                    confirmButtonText: 'Volver a intentarlo'
                });
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

    const fecha = new Date(stringFecha);
    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');

    return `${horas}:${minutos}`;
}


function convertirAHorayMinutos(duracion) {
    // Expresión regular para capturar horas y opcionalmente minutos.
    const regex = /PT(\d+)H(?:(\d+)M)?/; 
    const match = duracion.match(regex);

    const horas = match ? parseInt(match[1], 10) : 0;
    const minutos = match && match[2] ? parseInt(match[2], 10) : 0o0;

    return `${horas} Horas ${minutos} Minutos`;
}

    
// Función para asignar true o false al check de vuelos (ida e idaVuelta) según selecciona el usuario.
function checkSeleccionado(id) {
    const divIda = document.getElementById('campoIda');
    const divIdaVuelta = document.getElementById('camposIdayVuelta')

    if(id == "ida"){
        divIdaVuelta.style.setProperty('display', 'none', 'important');
        divIda.style.setProperty('display', 'flex', 'important');

    }else{
        divIdaVuelta.style.setProperty('display', 'flex', 'important');
        divIda.style.setProperty('display', 'none', 'important');
    }
    
    //Permite que solo este seleccionada 1 de los elementos y no ambos.
    var checkboxes = document.querySelectorAll('.btn-check');
    checkboxes.forEach(function(checkbox) {
        if (checkbox.id !== id) {
            checkbox.checked = false;
        }
    });
}


function reservarVuelo(element) {
    const ofertaJson = element.getAttribute('data-oferta');

    // Poner la cadena JSON en el input oculto
    document.getElementById('ofertaInput').value = ofertaJson;

    // Enviar el formulario
    document.getElementById('reservaForm').submit();
}


function reservarUltimaOferta(element) {
    const ofertaJson = element.getAttribute('data-ultima-oferta');

    // Poner la cadena JSON en el input oculto
    document.getElementById('ofertaInputUltimoVuelo').value = ofertaJson;

    // Enviar el formulario
    document.getElementById('reservaFormUltimoVuelo').submit(); 
}
