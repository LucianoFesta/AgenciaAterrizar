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

