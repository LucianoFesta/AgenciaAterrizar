document.addEventListener('DOMContentLoaded', () => {
    // Estabalecer atributo min en los input date para limitar la selección de fechas.
    var fechaActual = new Date().toISOString().split('T')[0];
    var vencimientoPasaporte = document.getElementById("vencimientoPasaporte");

    vencimientoPasaporte.setAttribute("min", fechaActual);
})

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

    var erroresInput = 0;
    var primerError = null;

    document.getElementById('nombreError').style.display = 'none';
    document.getElementById('nombreCompleto').classList.remove('form-controlError')
    if(nombreCompleto == ''){
        document.getElementById('nombreError').style.display = 'block';
        document.getElementById('nombreCompleto').classList.add('form-controlError')
        erroresInput++;

        if (!primerError) {
            primerError = document.getElementById('nombreCompleto');
        }
    }

    document.getElementById('apellidoError').style.display = 'none';
    document.getElementById('apellido').classList.remove('form-controlError')
    if(apellido == ''){
        document.getElementById('apellidoError').style.display = 'block';
        document.getElementById('apellido').classList.add('form-controlError')
        erroresInput++;

        if (!primerError) {
            primerError = document.getElementById('apellido');
        }
    }

    document.getElementById('pasaporteError').style.display = 'none';
    document.getElementById('pasaporte').classList.remove('form-controlError')
    if(pasaporte == ''){
        document.getElementById('pasaporteError').style.display = 'block';
        document.getElementById('pasaporte').classList.add('form-controlError')
        erroresInput++;

        if (!primerError) {
            primerError = document.getElementById('pasaporte');
        }
    }

    document.getElementById('nroDocumentoError').style.display = 'none';
    document.getElementById('DNI').classList.remove('form-controlError')
    if(DNI == ''){
        document.getElementById('nroDocumentoError').style.display = 'block';
        document.getElementById('DNI').classList.add('form-controlError')
        erroresInput++;

        if (!primerError) {
            primerError = document.getElementById('DNI');
        }
    }

    document.getElementById('vencimientoPasaporteError').style.display = 'none';
    document.getElementById('vencimientoPasaporteErrorFecha').style.display = 'none';
    document.getElementById('vencimientoPasaporte').classList.remove('form-controlError')
    var fechaVtoDate = new Date(vencimientoPasaporte)
    if(vencimientoPasaporte == ''){
        document.getElementById('vencimientoPasaporteError').style.display = 'block';
        document.getElementById('vencimientoPasaporte').classList.add('form-controlError')
        erroresInput++;

        if (!primerError) {
            primerError = document.getElementById('vencimientoPasaporte');
        }
    }else if(fechaVtoDate < Date.now()){
        document.getElementById('vencimientoPasaporteErrorFecha').style.display = 'block';
        document.getElementById('vencimientoPasaporte').classList.add('form-controlError')
        erroresInput++;

        if (!primerError) {
            primerError = document.getElementById('vencimientoPasaporte');
        }
    }


    document.getElementById('fechaNacimientoError').style.display = 'none';
    document.getElementById('fechaNacimientoErrorFecha').style.display = 'none';
    document.getElementById('fechaNacimiento').classList.remove('form-controlError')
    var fechaNacimientoFecha = new Date(document.getElementById('fechaNacimiento').value);
    var hoy = new Date();
    var edad = hoy.getFullYear() - fechaNacimientoFecha.getFullYear();
    var mes = hoy.getMonth() - fechaNacimientoFecha.getMonth();
    if(mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimientoFecha.getDate())){
        edad--;
    }
    if(fechaNacimiento == ''){
        document.getElementById('fechaNacimientoError').style.display = 'block';
        document.getElementById('fechaNacimiento').classList.add('form-controlError')
        erroresInput++;

        if (!primerError) {
            primerError = document.getElementById('vencimientoPasaporte');
        }
    }else if(edad < 18){
        document.getElementById('fechaNacimientoErrorFecha').style.display = 'block';
        document.getElementById('fechaNacimiento').classList.add('form-controlError')
        erroresInput++;

        if (!primerError) {
            primerError = document.getElementById('fechaNacimiento');
        }
    }

    if(erroresInput > 0){
        primerError.scrollIntoView({ behavior: 'smooth' });
        return;
    }

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

