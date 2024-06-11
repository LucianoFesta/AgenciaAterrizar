document.addEventListener('DOMContentLoaded', (event) => {

    document.getElementById('buscarBtn').addEventListener('click', function(e) {
        e.preventDefault(); // Prevenir el envío del formulario
    
        let ida = document.getElementById('origen').value;
        let vuelta = document.getElementById('destino').value;
    
        $.ajax({
            url: '../../Home/Console',
            data: { },
            type: 'GET',
            dataType: 'json',
            success: function(result) {
                console.log(ida);
                console.log(vuelta);
            },
            error: function(e, status) {
                console.error('Ocurrió un error a la hora de buscar vuelos.');
            }
        });
    });

})


