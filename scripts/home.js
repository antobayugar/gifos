////// API KEY: 
let apiKey = "QEiNwRIV3GcWQ83yvX6IVcIAST0hxr1n";

// BUSCADOR
//traigo los elementos a usar del html
let inputBuscador = document.getElementById('input-buscador');
let bloqueBuscador = document.getElementById('buscador');
let iconBuscar = document.getElementById('buscador-lupa');
let btnBuscar = document.getElementById('buscador-lupa-gris');
let btnCerrarBusqueda = document.getElementById('cerrar-busqueda');

let offsetBusqueda = 0;
let resultadosBusquedaGIFOS = document.getElementById('resultados-busqueda');
let btnVerMasResultados = document.getElementById('resultados-vermas');

let busqueda;


// cuando se agranda el div y se muestran sugerencias:
inputBuscador.addEventListener('keyup', buscadorActivo);

function buscadorActivo() {
    busqueda = inputBuscador.value;

    //agrego las clases del buscador activo
    bloqueBuscador.classList.remove('buscador');
    bloqueBuscador.classList.add('buscador-activo');
    iconBuscar.style.display = "none";
    btnCerrarBusqueda.style.display = "block";

    //agrego la funcion de traer sugerencias y reemplazarlas en los elementos
    return fetch(`https://api.giphy.com/v1/tags/related/${busqueda}?api_key=${apiKey}&limit=4`)
        .then(response => response.json())
        .then(data => {
            sugerenciasData(data);
            //console.log(data);
        })
        .catch(err => {
            console.error("error al traer sugerencias", err);
        })
}

let listaSugerencias = document.getElementById('buscador-sugerencias');

function sugerenciasData(data) {
    let sugerencia = data.data;
    listaSugerencias.innerHTML = `
    <li class="sugerencia">
        <img src="/assets/icon-search-gris.svg" alt="sugerencia-lupa-gris"
        class="sugerencia-lupa-gris">
        <p class="buscador-sugerencia-texto" id="sugerencia1">${sugerencia[0].name}</p>
    </li>
    <li class="sugerencia">
        <img src="/assets/icon-search-gris.svg" alt="sugerencia-lupa-gris"
        class="sugerencia-lupa-gris">
        <p class="buscador-sugerencia-texto" id="sugerencia2">${sugerencia[1].name}</p>
    </li>
    <li class="sugerencia">
        <img src="/assets/icon-search-gris.svg" alt="sugerencia-lupa-gris"
        class="sugerencia-lupa-gris">
        <p class="buscador-sugerencia-texto" id="sugerencia3">${sugerencia[2].name}</p>
    </li>
    <li class="sugerencia">
        <img src="/assets/icon-search-gris.svg" alt="sugerencia-lupa-gris"
        class="sugerencia-lupa-gris">
        <p class="buscador-sugerencia-texto" id="sugerencia4">${sugerencia[3].name}</p>
    </li>`;
}

//funcion sugerencias: cuando se clickea una, se hace la busqueda de ese termino
listaSugerencias.addEventListener('click', function (li) {
    inputBuscador.value = li.target.textContent;
    busquedaGifos();
})

//cuando cierro la busqueda:
btnCerrarBusqueda.addEventListener('click', limpiarBusqueda);

function limpiarBusqueda() {
    //vacío el input y devuelvo las clases del contenedor a como estaban
    inputBuscador.value = "";
    inputBuscador.placeholder = "Busca GIFOS y más";
    bloqueBuscador.classList.add('buscador');
    bloqueBuscador.classList.remove('buscador-activo');
    iconBuscar.style.display = "block";
    btnCerrarBusqueda.style.display = "none";

    //faltaria agregar que se cierre cuando se borra todo
}

//hago la busqueda al clickear lupa gris, o apretar enter
btnBuscar.addEventListener('click', busquedaGifos);
inputBuscador.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        busquedaGifos();
    }
});


//Resultados de la busqueda: aparecen los primeros resultados traidos de la API
function busquedaGifos() {
    event.preventDefault();
    let urlBusqueda = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=12&offset=${offsetBusqueda}&q=`;
    let strBusqueda = inputBuscador.value.trim();
    urlBusqueda = urlBusqueda.concat(strBusqueda);
    //console.log(urlBusqueda);

    fetch(urlBusqueda)
        .then(response => response.json())
        .then(content => {
            resultadosBusquedaGIFOS.innerHTML = "";
            //console.log(content.data);
            //aparece el div con el titulo y resultados
            let contenedorResultadosBusqueda = document.getElementById('resultados-busqueda-contenedor');
            contenedorResultadosBusqueda.style.display = "block";

            //agrego el titulo de la busqueda
            let tituloBusqueda = document.getElementById('titulo-busqueda');
            tituloBusqueda.innerHTML = inputBuscador.value;

            if (content.data == 0) {
                resultadosBusquedaGIFOS.innerHTML = `
                    <div class="busqueda-error-contenedor">
                    <img src="/assets/icon-busqueda-sin-resultado.svg" alt="Busqueda sin resultado" class="busqueda-error-img">
                    <h3 class="busqueda-error-texto">Intenta con otra búsqueda</h3>
                    </div>
                    `;
                btnVerMasResultados.style.display = "none";
            } else {
                for (let i = 0; i < content.data.length; i++) {
                    traerBusqueda(content.data[i]);
                }
            }
        })
        .catch(error => {
            console.log("error busqueda" + error)
        })

    cerrarBoxBusqueda();
}


function traerBusqueda(content) {
        resultadosBusquedaGIFOS.innerHTML += `
                <div class="resultados-gif-box">
                <div class="gif-acciones-resultados">
                    <div class="iconos-acciones-gif">
                        <button class="iconos-acciones-box favorito">
                            <img src="/assets/icon-fav-hover.svg" alt="icon-favorito">
                        </button>
                        <button class="iconos-acciones-box download">
                            <img src="/assets/icon-download.svg" alt="icon-dowlnoad">
                        </button>
                        <button class="iconos-acciones-box max">
                            <img src="/assets/icon-max.svg" alt="icon-max">
                        </button>
                    </div>
                    <div class="textos-descripcion-gif-resultados">
                        <p class="user-gif-resultados">${content.username}</p>
                        <p class="titulo-gif-resultados">${content.title}</p>
                    </div>
                </div>
                <img src="${content.images.downsized.url}" alt="${content.title}" class="resultados-gif">
            </div>
                `;
}

function cerrarBoxBusqueda() {
    //achico el contenedor de la busqueda
    bloqueBuscador.classList.add('buscador');
    bloqueBuscador.classList.remove('buscador-activo');
    iconBuscar.style.display = "block";
    btnCerrarBusqueda.style.display = "none";
}


//3. Boton Ver mas: cuando se apreta, se cargan mas resultados
btnVerMasResultados.addEventListener('click', verMasResultados);

function verMasResultados() {
    offsetBusqueda = offsetBusqueda + 12;
    busquedaGifosVerMas();
}

function busquedaGifosVerMas() {
    event.preventDefault();
    let urlBusqueda = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=12&offset=${offsetBusqueda}&q=`;
    let strBusqueda = inputBuscador.value.trim();
    urlBusqueda = urlBusqueda.concat(strBusqueda);
    //console.log(urlBusqueda);

    fetch(urlBusqueda)
        .then(response => response.json())
        .then(content => {
            //aparece el div con el titulo y resultados
            let contenedorResultadosBusqueda = document.getElementById('resultados-busqueda-contenedor');
            contenedorResultadosBusqueda.style.display = "block";

            //agrego el titulo de la busqueda
            let tituloBusqueda = document.getElementById('titulo-busqueda');
            tituloBusqueda.innerHTML = inputBuscador.value;

            if (content.data == 0) {
                resultadosBusquedaGIFOS.innerHTML = `
                    <div class="busqueda-error-contenedor">
                    <img src="/assets/icon-busqueda-sin-resultado.svg" alt="Busqueda sin resultado" class="busqueda-error-img">
                    <h3 class="busqueda-error-texto">Intenta con otra búsqueda</h3>
                    </div>
                    `;
                btnVerMasResultados.style.display = "none";
            } else {
                for (let i = 0; i < content.data.length; i++) {
                    traerBusqueda(content.data[i]);
                }
            }
        })
        .catch(error => {
            console.log("error busqueda ver mas" + error)
        })
}


// TRENDING TOPICS
//1. traigo los 5 primer trending topics de la API
//2. reemplazo el texto con los resultados

let trendingTopicsTexto = document.getElementById('trending-topics');

/* let linkpruebatrending = document.getElementById('link-prueba-trending');
linkpruebatrending.style.color = "red"; */
window.onload = trendingTopics();

function trendingTopics() {
    let url = `https://api.giphy.com/v1/trending/searches?api_key=${apiKey}`;

    return fetch(url)
        .then(resp => resp.json()) //me trae el json con los trending topics
        .then(content => {
            //object with data & meta
            let topics = content.data;
            //console.log("Trending Topics", topics);
            trendingTopicsTexto.innerHTML = `<span id=${topics[0]}>${topics[0]}, </span><span id=${topics[1]}>${topics[1]}, </span><span id=${topics[2]}>${topics[2]}, </span><span id=${topics[3]}>${topics[3]}, </span><span id=${topics[4]}>${topics[4]}, </span>`;
        })
        .catch(err => {
            console.log("error trending topics" + err);
        })
}

function trendingTopicsLinks(content) {

}