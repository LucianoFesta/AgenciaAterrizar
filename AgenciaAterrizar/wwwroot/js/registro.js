document.addEventListener('DOMContentLoaded', () => {
    // Estabalecer atributo min en los input date para limitar la selección de fechas.
    var fechaActual = new Date().toISOString().split('T')[0];
    var vencimientoPasaporte = document.getElementById("vencimientoPasaporte");
    vencimientoPasaporte.setAttribute("min", fechaActual);


    // Establecer que solo permita al usuario ingresar 8 caracteres, si completa menos se completan con ceros a la izquierda.
    document.getElementById('DNI').addEventListener('input', function () {
        let input = this.value.replace(/\D/g, ''); // Remover cualquier carácter no numérico
        if (input.length > 8) {
            input = input.substring(0, 8); // Limitar a 8 dígitos
        }
        this.value = input; // Actualizar el valor del campo
    });
    document.getElementById('DNI').addEventListener('blur', function () {
        let input = this.value.replace(/\D/g, '');
        input = input.padStart(8, '0'); // Completar con ceros a la izquierda si es menor a 8
        this.value = input; // Actualizar el valor del campo
    });
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

    // Validaciones de los campos.
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

    document.getElementById('vencimientoPasaporteErrorFecha').style.display = 'none';
    document.getElementById('vencimientoPasaporte').classList.remove('form-controlError')
    var fechaVtoDate = new Date(vencimientoPasaporte)
    if(fechaVtoDate < Date.now()){
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

    document.getElementById('numerotelError').style.display = 'none';
    document.getElementById('numerotel').classList.remove('form-controlError')
    if(numeroTel == ''){
        document.getElementById('numerotelError').style.display = 'block';
        document.getElementById('numerotel').classList.add('form-controlError')
        erroresInput++;

        if (!primerError) {
            primerError = document.getElementById('numerotel');
        }
    }

    document.getElementById('emailError').style.display = 'none';
    document.getElementById('email').classList.remove('form-controlError')
    if(email == ''){
        document.getElementById('emailError').style.display = 'block';
        document.getElementById('email').classList.add('form-controlError')
        erroresInput++;

        if (!primerError) {
            primerError = document.getElementById('email');
        }
    }

    document.getElementById('provinciaError').style.display = 'none';
    document.getElementById('provincia').classList.remove('form-controlError')
    if(provincia == ''){
        document.getElementById('provinciaError').style.display = 'block';
        document.getElementById('provincia').classList.add('form-controlError')
        erroresInput++;

        if (!primerError) {
            primerError = document.getElementById('provincia');
        }
    }

    document.getElementById('localidadError').style.display = 'none';
    document.getElementById('localidad').classList.remove('form-controlError')
    if(localidad == ''){
        document.getElementById('localidadError').style.display = 'block';
        document.getElementById('localidad').classList.add('form-controlError')
        erroresInput++;

        if (!primerError) {
            primerError = document.getElementById('localidad');
        }
    }

    document.getElementById('domicilioError').style.display = 'none';
    document.getElementById('domicilio').classList.remove('form-controlError')
    if(domicilio == ''){
        document.getElementById('domicilioError').style.display = 'block';
        document.getElementById('domicilio').classList.add('form-controlError')
        erroresInput++;

        if (!primerError) {
            primerError = document.getElementById('domicilio');
        }
    }

    document.getElementById('passwordError').style.display = 'none';
    document.getElementById('password').classList.remove('form-controlError')
    if(password == ''){
        document.getElementById('passwordError').style.display = 'block';
        document.getElementById('password').classList.add('form-controlError')
        erroresInput++;

        if (!primerError) {
            primerError = document.getElementById('password');
        }
    }

    document.getElementById('confirmPasswordError').style.display = 'none';
    document.getElementById('passwordDiferente').style.display = 'none';
    document.getElementById('confirmPasswordSinPasswordError').style.display = 'none';
    document.getElementById('confirmPassword').classList.remove('form-controlError')
    if(confirmPassword == ''){
        document.getElementById('confirmPasswordError').style.display = 'block';
        document.getElementById('confirmPassword').classList.add('form-controlError')
        erroresInput++;

        if (!primerError) {
            primerError = document.getElementById('confirmPassword');
        }
    }else if(confirmPassword != '' && !password){
        document.getElementById('confirmPasswordSinPasswordError').style.display = 'block';
        document.getElementById('confirmPassword').classList.add('form-controlError')
        erroresInput++;

        if (!primerError) {
            primerError = document.getElementById('confirmPassword');
        }
    }else if(confirmPassword != password){
        document.getElementById('passwordDiferente').style.display = 'block';
        document.getElementById('confirmPassword').classList.add('form-controlError')
        erroresInput++;

        if (!primerError) {
            primerError = document.getElementById('confirmPassword');
        }
    }

    if(erroresInput > 0){
        primerError.scrollIntoView({ behavior: 'smooth' });
        return;

    }else{
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
    }

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

