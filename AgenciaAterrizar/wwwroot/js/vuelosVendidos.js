document.addEventListener('DOMContentLoaded', (event) => {
    
    listadoVuelosVendidos();

    generarGraficos();

});


function generarGraficos(){

    var colorFondoPais = [];
    var dataPais = [5, 2, 2, 5, 1, 3, 4];
    var labelsPais = ['Aruba', 'Argentina', 'Brasil', 'USA', 'Colombia', 'Rep. Dominicana', 'México'];

    var graficoTortaPais = document.getElementById("graficoPais");

    dataPais.forEach(info => {
        var color = generarColor();
        colorFondoPais.push(color);
    });

    graficoNuevoCircular = new Chart(graficoTortaPais, {
        type: 'pie',
        data: {
            labels: labelsPais,
            datasets: [{
                data: dataPais,
                backgroundColor: colorFondoPais,
            }],
        },
    });


    var colorFondoMes = [];
    var dataMes = [9, 5, 1, 3, 4];
    var labelsMes = ['Enero', 'Febrero', 'Marzo', 'Noviembre', 'Diciembre'];

    var graficoTortaMes = document.getElementById("graficoMes");

    dataMes.forEach(info => {
        var color = generarColor();
        colorFondoMes.push(color);
    });

    graficoNuevoCircular = new Chart(graficoTortaMes, {
        type: 'pie',
        data: {
            labels: labelsMes,
            datasets: [{
                data: dataMes,
                backgroundColor: colorFondoMes,
            }],
        },
    });
}

function generarColor() {
    // El valor de GG será alto (de 128 a 255) para garantizar que predomine el verde.
    // Los valores de RR y BB serán bajos (de 0 a 127).

    let rr = Math.floor(Math.random() * 128) + 128; // 128 a 255 
    let gg = Math.floor(Math.random() * 128); // 0 a 127
    let bb = Math.floor(Math.random() * 128); // 0 a 127

    // Convertimos a hexadecimal y formateamos para que tenga siempre dos dígitos.
    let colorHex = `#${rr.toString(16).padStart(2, '0')}${gg.toString(16).padStart(2, '0')}${bb.toString(16).padStart(2, '0')}`;
    return colorHex;
}


document.getElementById('toggleSidebar').addEventListener('click', function() {
    var sidebar = document.getElementById('sidebar');

    if (window.innerWidth <= 768) {
        sidebar.classList.toggle('active');
    } else {
        
        sidebar.classList.toggle('collapsed');
        document.querySelector('.content').classList.toggle('full-width');
    }
});



function listadoVuelosVendidos(){
    $('#tbody-listaVuelos').empty();

    var desde = document.getElementById('FechaDesde').value;
    var hasta = document.getElementById('FechaHasta').value;

    $.ajax({
        url: '../../Admin/ListaVuelosVendidos',
        data: { desde, hasta },
        type: 'GET',
        dataType: 'json',
        success: function(result){

            $.each(result, function(i, reserva){

                var fechaSalida = new Date(reserva.fechaSalida).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });

                var fechaRegreso = new Date(reserva.fechaRegreso).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });

                $('#tbody-listaVuelos').append(`
                    <tr class="p-2">
                        <td class="ocultar-en-768px">${reserva.reservaVueloID}</td>
                        <td class="ocultar-en-768px">${reserva.aerolineaID} - ${reserva.aerolineaNombre}</td>
                        <td class="ocultar-en-550px">${reserva.aeropuertoOrigenID}</td>
                        <td>${reserva.aeropuertoDestinoID}</td>
                        <td class="ocultar-en-550px">${fechaSalida} Hs.</td>
                        <td class="ocultar-en-768px">${fechaRegreso ? fechaRegreso : '-----'} Hs.</td>
                        <td class="ocultar-en-768px">${reserva.cantidadPasajeros}</td>
                        <td class="tdMonto">$ ${reserva.montoTotalCompra}</td>        
                        <td class="p-4">
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton_${reserva.reservaVueloID}" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton_${reserva.reservaVueloID}">
                                    <li><a class="dropdown-item" href="#" onclick="cancelarReserva(${reserva.reservaVueloID})">Cancelar Reserva</a></li>
                                    <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#modalPasajeros_${reserva.reservaVueloID}">Pasajeros</a></li>
                                    <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#modalEscalas_${reserva.reservaVueloID}">Tramos</a></li>
                                </ul>
                            </div>
                        </td>
                    </tr>    

                `)

                $('body').append(`
                    <div class="modal fade" id="modalPasajeros_${reserva.reservaVueloID}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title tituloModal" id="exampleModalLabel">Lista de Pasajeros</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    ${reserva.acompaniantes.map(pasajero => `
                                        <div class="itemPasajero">
                                            <div id="detallePasajero_${pasajero.acompanianteID}">    
                                                <p><b>Nombre: </b><span>${pasajero.nombreCompleto}</span> <span>${pasajero.apellido}</span>.</p>
                                                <p><b><span>${pasajero.tipoDocumento}</span></b>: <span>${pasajero.nroDocumento}</span>.</p>
                                                <p><b>Nacionalidad</b>: <span>${pasajero.pais}</span>.</p>
                                                <p><b>Fecha Nacimiento:</b> <span>${pasajero.fechaNacimiento}</span>.</p>
                                                <p><b>Género:</b> <span>${pasajero.genero}</span>.</p>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `);

                $('body').append(`
                    <div class="modal fade" id="modalEscalas_${reserva.reservaVueloID}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title tituloModal" id="exampleModalLabel">Tramos de la Reserva</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <p>Tramo/s Ida: </p>
                                    ${reserva.escalas.map(escala => escala.escalaIda ? `
                                        <div class="itemPasajero">
                                            <p><b>Aerolinea: </b><span>${escala.aerolineaID}</span>.</p>
                                            <p><b>Aeropuerto Origen: </b><span>${escala.aeropuertoOrigenID}</span>.</p>
                                            <p><b>Aeropuerto Destino: </b><span>${escala.aeropuertoDestinoID}</span>.</p>
                                            <p><b>Número de Vuelo: </b><span>${escala.aerolineaID}</span><span>${escala.numeroVuelo}</span>.</p>
                                            <p><b>Salida: </b><span>${escala.fechaSalida}</span>.</p>
                                            <p><b>Llegada: </b><span>${escala.fechaLlegada}</span>.</p>
                                            <p><b>Duración: </b><span>${escala.duracionVuelo}</span>.</p>
                                        </div>
                                    ` : '').join('')}
                
                                    <p>Tramo/s Vuelta:</p>
                                    ${reserva.escalas.some(escala => escala.escalaVuelta) ? reserva.escalas.map(escala => escala.escalaVuelta ? `
                                        <div class="itemPasajero">
                                            <p><b>Aerolinea: </b><span>${escala.aerolineaID}</span>.</p>
                                            <p><b>Aeropuerto Origen: </b><span>${escala.aeropuertoOrigenID}</span>.</p>
                                            <p><b>Aeropuerto Destino: </b><span>${escala.aeropuertoDestinoID}</span>.</p>
                                            <p><b>Número de Vuelo: </b><span>${escala.aerolineaID}</span><span>${escala.numeroVuelo}</span>.</p>
                                            <p><b>Salida: </b><span>${escala.fechaSalida}</span>.</p>
                                            <p><b>Llegada: </b><span>${escala.fechaLlegada}</span>.</p>
                                            <p><b>Duración: </b><span>${escala.duracionVuelo}</span>.</p>
                                        </div>
                                    ` : '').join('') : `
                                        <div class="itemPasajero">
                                            <p>No posee vuelos de regreso. Es solo un vuelo de ida.</p>
                                        </div>
                                    `}
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `);
                
                
            })
        },
        error: function(xrs, status){
            console.log('Ocurrió un error a la hora de mostrar el listado.')
        }
    })
};

function cancelarReserva(idReserva){

    Swal.fire({
        title: "¿Desea cancelar la reserva?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar"

    }).then((result) => {
        if(result.isConfirmed){
    
            $.ajax({
                url: '../../Admin/EliminarReserva',
                data: { idReserva },
                type: 'DELETE',
                dataType: 'json',
                success: function(result){
                    if(result.result){
                        Swal.fire({
                            title: 'Cancelación de Reserva.',
                            text: 'La reserva ha sido cancelada exitósamente.',
                            icon: 'success',
                            confirmButtonText: 'Aceptar'
                        }).then((r) => {
                            if(r.isConfirmed){
                                listadoVuelosVendidos();
                            }
                        });
                    }else{
                        Swal.fire({
                            title: 'Cancelacón de Reserva:',
                            text: result.message,
                            icon: 'warning',
                            confirmButtonText: 'Volver a intentarlo'
                        });
                    }
                }
            })
        }
    })
}

function imprimirReporte(){

    var pdf = new jsPDF('l', 'mm', [297, 210]);
    var html = document.getElementById('reporte');
    var htmlJson = pdf.autoTableHtmlToJson(html);
    htmlJson.columns = htmlJson.columns.slice(0,-1); //Eliminar las columnas de los botones

    var contenido = (info) => {
        pdf.setLineWidth(10);

        pdf.setDrawColor(238, 153, 57);
        pdf.line(14, 12, 280, 12);

        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(13);
        pdf.setFontStyle('bold');

        pdf.text(17, 14, "Lista de reservas de Vuelos");

        // Configuración para el número de página
        const pagina = "Página " + info.pageCount;
        pdf.setTextColor(100, 100, 100); 
        pdf.setFontSize(10);

        const pageHeight = pdf.internal.pageSize.height;
        pdf.text(pagina, 253, pageHeight - 10);
    };

    pdf.autoTable(htmlJson.columns, htmlJson.data,{
        startY: 20, addPageContent: contenido,
        styles: {
            lineColor: [238, 238, 238],
            lineWidth: 0.1
        },
        columnStyles: {
            0: { columnWidth: 20 },
            1: { columnWidth: 56 },
            2: { columnWidth: 20 },
            3: { columnWidth: 25 },
            4: { columnWidth: 40 },
            5: { columnWidth: 40 },          
            6: { columnWidth: 25 } ,         
            7: { columnWidth: 40 }          
        }
    });

    var stringPdf = pdf.output('datauristring');
    var iframe = "<iframe width='100%' height='100%' src='" + stringPdf + "'></iframe>"

    var ventana = window.open();
    ventana.document.open();
    ventana.document.write(iframe);
    ventana.document.close();
}