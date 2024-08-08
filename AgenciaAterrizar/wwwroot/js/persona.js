function guardarFormulario(){
    var email = document.getElementById("email").value ;
    var numerotel = document.getElementById("numerotel").value ;
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
    console.log ('jaun')
    $.ajax({
        url: '../../Register/GuardarUsuario',
        data: {
            Email : email, Password : password, PhoneNumber : numerotel
        },
        type: 'POST',
        dataType: 'json',
        success: function (resultado ){
            console.log ('miguel')
            if(resultado != ""){
                alert(resultado);
            }
           
        },
    })



    $.ajax({
             url:'../../Register/guardarPersona',
             data: { NombreCompleto : nombreCompleto, Apellido : apellido, Email : email, phoneNumber : numerotel, Password : password, confirmPassword : confirmPassword,
                     TipoDocumento : tipoDocumento, Dni : DNI, Pasaporte : pasaporte, VencimientoPasaporte : vencimientoPasaporte,
                     Pais : pais, Provincia : provincia, Localidad : localidad,
                     Domicilio : domicilio, FechaNacimiento : fechaNacimiento },
        type: 'POST',
        dataType: 'json',
        success: function (resultado ){

            if(resultado != ""){
                alert(resultado);
            }
           
        },
    })
}

