document.addEventListener('DOMContentLoaded', (event) => {
    // Golpeo la api y creo una lista de paises en español.
    $.getJSON('https://restcountries.com/v3.1/all', function(paises) {
        var listaPaises = paises.map(function(pais) {
            return {
                nombre: pais.translations.spa.common,
            };
        });

        // Ordenar alfabéticamente por nombre de paises
        listaPaises.sort(function(a, b) {
            return a.nombre.localeCompare(b.nombre);
        });

        // Se agrega cada país al select
        $.each(listaPaises, function(key, pais) {
            // Agrega los option en los select con id que comiencen en selectPaises_.
            $('select[id^="selectPaises_"]').append($('<option></option>').attr('value', pais.nombre).text(pais.nombre));
        });
    });
    
})