document.getElementById('btnRegister').addEventListener('click', (e) => {
    e.preventDefault();

    var email = document.getElementById("email").value ;
    var numeroTel = document.getElementById("numerotel").value ;
    var password = document.getElementById("password").value ;
    var confirmPassword = document.getElementById("confirmPassword").value ;
    var nombreCompleto = document.getElementById("nombreCompleto").value ;
    var apellido = document.getElementById("apellido").value ;
    var tipoDocumento = document.getElementById("tipoDocumento").value ;
    var DNI = document.getElementById("DNI").value ;
    var pasaporte = document.getElementById("pasaporte").value ;
    var vencimientoPasaporte = document.getElementById("vencimientoPasaporte").value ;
    var pais = document.getElementById("pais").value ;
    var provincia = document.getElementById("provincia").value ;
    var localidad = document.getElementById("localidad").value ;
    var domicilio = document.getElementById("domicilio").value ;
    var fechaNacimiento = document.getElementById("fechaNacimiento").value ;

    $.ajax({
        url:'../../Register/GuardarPersona',
        data: { 
            NombreCompleto : nombreCompleto, Apellido : apellido, Email : email, PhoneNumber : numeroTel, 
            Password : password, confirmPassword : confirmPassword,TipoDocumento : tipoDocumento, Dni : DNI,
            Pasaporte : pasaporte, VencimientoPasaporte : vencimientoPasaporte,
            Pais : pais, Provincia : provincia, Localidad : localidad, Domicilio : domicilio, 
            FechaNacimiento : fechaNacimiento 
        },
        type: 'POST',
        dataType: 'json',
        success: function (resultado ){
            if(resultado.result){
                Swal.fire({
                    title: 'Registro de Usuario',
                    text: 'Usuario registrado exitosamente!',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then((result) => {
                    if(result.isConfirmed){
                        limpiarForm();
                        
                        window.location.href = '/Identity/Account/Login';
                    }
                });
            }else{
                Swal.fire({
                    title: 'Ups, existe un inconveniente:',
                    text: resultado.message,
                    icon: 'warning',
                    confirmButtonText: 'Volver a intentarlo'
                });
            }
        },
        error: function(kxr, status){
            Swal.fire({
                title: 'Ups, existe un inconveniente:',
                text: 'Ocurrió un error para proceder a registrar el usuario.',
                icon: 'warning',
                confirmButtonText: 'Volver a intentarlo'
            });
        }
    })
})

function limpiarForm(){
    document.getElementById("email").value = '';
    document.getElementById("numerotel").value = ''; 
    document.getElementById("password").value = '';
    document.getElementById("confirmPassword").value = ''; 
    document.getElementById("nombreCompleto").value = ''; 
    document.getElementById("apellido").value = ''; 
    document.getElementById("tipoDocumento").value ;
    document.getElementById("DNI").value = ''; 
    document.getElementById("pasaporte").value = '';
    document.getElementById("vencimientoPasaporte").value = '';
    document.getElementById("pais").value = ''; 
    document.getElementById("provincia").value = ''; 
    document.getElementById("localidad").value = ''; 
    document.getElementById("domicilio").value = ''; 
    document.getElementById("fechaNacimiento").value = ''; 
}


document.addEventListener('DOMContentLoaded', function () {
    const provinciasSelect = document.getElementById('provincia');
    const municipiosSelect = document.getElementById('localidad');

    // Función para obtener las provincias de Argentina
    async function obtenerProvincias() {
        const url = 'https://apis.datos.gob.ar/georef/api/provincias';

        try {
            const response = await fetch(url);
            const data = await response.json();
            const provincias = data.provincias;

            provincias.sort((a, b) => a.nombre.localeCompare(b.nombre));

            provincias.forEach(provincia => {
                const option = document.createElement('option');
                option.value = provincia.nombre;
                option.textContent = provincia.nombre;
                provinciasSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error al obtener las provincias:', error);
        }
    }

    // Función para obtener los municipios según la provincia seleccionada
    async function obtenerMunicipios(provincia) {
        const url = `https://apis.datos.gob.ar/georef/api/municipios?provincia=${encodeURIComponent(provincia)}&max=1000`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            const municipios = data.municipios;

            municipios.sort((a, b) => a.nombre.localeCompare(b.nombre));

            // Limpiar el select de municipios
            municipiosSelect.innerHTML = '<option value="">Seleccione un municipio</option>';

            municipios.forEach(municipio => {
                const option = document.createElement('option');
                option.value = municipio.nombre;
                option.textContent = municipio.nombre;
                municipiosSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error al obtener los municipios:', error);
        }
    }

    // Evento para cambiar los municipios cuando se selecciona una provincia
    provinciasSelect.addEventListener('change', function () {
        const provinciaSeleccionada = provinciasSelect.value;
        if (provinciaSeleccionada) {
            obtenerMunicipios(provinciaSeleccionada);
        } else {
            municipiosSelect.innerHTML = '<option value="">Seleccione un municipio</option>';
        }
    });

    // Obtener las provincias al cargar la página
    obtenerProvincias();
});