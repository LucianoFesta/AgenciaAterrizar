document.addEventListener('DOMContentLoaded', (event) => {
    
    listadoVuelosVendidos();

});

function listadoVuelosVendidos(){
    $.ajax({
        url: '../../Admin/ListaVuelosVendidos',
        data: { },
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
                    <tr>
                        <td class="ocultar-en-768px">${reserva.reservaVueloID}</td>
                        <td class="ocultar-en-768px">${reserva.aerolineaID} - ${reserva.aerolineaNombre}</td>
                        <td class="ocultar-en-550px">${reserva.aeropuertoOrigenID}</td>
                        <td>${reserva.aeropuertoDestinoID}</td>
                        <td class="ocultar-en-550px">${fechaSalida} Hs.</td>
                        <td class="ocultar-en-768px">${fechaRegreso ? fechaRegreso : '-----'} Hs.</td>
                        <td class="ocultar-en-768px">${reserva.cantidadPasajeros}</td>
                        <td>$ ${reserva.montoTotalCompra}</td>        
                        <td>
                            <div class="d-flex flex-column tdBotones">
                                <div>
                                    <button type="button" data-id="@reserva.ReservaVueloID" class="btnCancelar btn btn-danger" data-bs-toggle="tooltip" title="Cancelar Reserva" onclick="cancelarReserva()"><i class="fa-solid fa-ban"></i></button>
                                </div>
                                <div>
                                    <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-toggle="tooltip" title="Pasajeros" data-bs-target="#modalPasajeros_@reserva.ReservaVueloID"><i class="fa-solid fa-users"></i></button>
                                </div>
                                <div>
                                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-toggle="tooltip" title="Tramos" data-bs-target="#modalEscalas_@reserva.ReservaVueloID"><i class="fa-solid fa-bars-progress"></i></button>
                                </div>
                            </div>
                        </td>
                    </tr>    
                `)
            })
        },
        error: function(xrs, status){
            console.log('Ocurrió un error a la hora de mostrar el listado.')
        }
    })
};