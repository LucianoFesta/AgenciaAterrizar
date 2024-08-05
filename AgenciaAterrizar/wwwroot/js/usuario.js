function guardarFormulario(){
    // var email = document.getElementById("email").value ;
    // var numerotel = document.getElementById("numerotel").value ;
    var nombreCompleto = document.getElementById("nombreCompleto").value ;
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
        url:'../../Usuario/guardarUsuario',
        data: { NombreCompleto : nombreCompleto,
                TipoDocumento : tipoDocumento, Dni : DNI, Pasaporte : pasaporte, VencimientoPasaporte : vencimientoPasaporte,
                Pais : pais, Provincia : provincia, Localidad : localidad,
                Domicilio : domicilio, FechaNacimiento : fechaNacimiento },
        type: 'POST',
        dataType: 'json',
        success: function (resultado ){
            console.log ('miguel')
            if(resultado != ""){
                alert(resultado);
            }
           
        },
    })
}

// function enviarFormularioAjax() {
//     console.log("probando2");
//     let formulario = $("#formulario").serialize(); // Serializa el formulario

//     $.ajax({
//         url: '../../Persona/Guardar',
//         data: formulario,
//         type: 'POST',
//         dataType: 'json',
//         success: function(resultado) {
//             alert(resultado.mensaje);
//             console.log("Formulario guardado exitosamente");
//             $("#formulario").fadeOut("slow");   // Hacemos desaparecer el div "formulario" con un efecto fadeOut lento.
//             if (resultado.exito) {  // Verifica si el resultado contiene un campo indicando éxito
//                 $("#exito").delay(500).fadeIn("slow");  // Si hemos tenido éxito, hacemos aparecer el div "exito" con un efecto fadeIn lento tras un delay de 0,5 segundos.
//             } else {
//                 $("#fracaso").delay(500).fadeIn("slow");  // Si no, lo mismo, pero haremos aparecer el div "fracaso".
//             }
//         },
//         error: function(xhr, status) {
//             alert('Disculpe, existió un problema al guardar el formulario');
//         }
//     });
// }


// function AbrirModalEditar(PersonaID) {

//     $.ajax({
//         url: '../../Persona/TraerDatosPersonal',
//         data: { PersonaID: 4 },
//         type: 'POST',
//         dataType: 'json',
//         success: function (personas) {
//             let persona = personas[0];

//             document.getElementById("PersonaID").value = PersonaID;
//             // $("#ModalTitulo").text("Editar Tipo De ejercico");
//             document.getElementById("nombre").value = persona.nombre;
//             document.getElementById("apellido").value = persona.apellido;
//             document.getElementById("edad").value = persona.edad;
//             document.getElementById("telefono").value = persona.telefono;
//             document.getElementById("documento").value = persona.documento;
//             document.getElementById("correo").value = persona.correo;

//             $("#ModalFormulario").modal("show");

//         },
//         error: function (xhr, status) {

//             alert('Disculpe, existió un problema ');
//         }

//     });

// }