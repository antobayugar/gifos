////// API KEY: 
let apiKey = "QEiNwRIV3GcWQ83yvX6IVcIAST0hxr1n";

// BUSCADOR
//traigo los elementos a usar del html
let inputBuscador = document.getElementById('input-buscador');
let bloqueBuscador = document.getElementById('buscador');
let btnBuscar = document.getElementById('buscador-lupa');
let btnCerrarBusqueda = document.getElementById('cerrar-busqueda');

// keyup: se agranda el div y se muestran sugerencias
inputBuscador.addEventListener('keyup', buscadorActivo);

function buscadorActivo() {
    let busqueda = inputBuscador.value;
    if (busqueda.length > 0) {
        //agrego las clases del buscador activo
        bloqueBuscador.classList.remove('buscador');
        bloqueBuscador.classList.add('buscador-activo');
        btnBuscar.style.display = "none";
        btnCerrarBusqueda.style.display = "block";

        //agrego la funcion de traer sugerencias y reemplazarlas en los elementos
    } else {

    }
}

//agrego funcionalidad para el boton "cerrar busqueda":
btnCerrarBusqueda.addEventListener('click', cerrarBusqueda);

function cerrarBusqueda() {
    //vacío el input y devuelvo las clases del contenedor a como estaban
    inputBuscador.value = "";
    inputBuscador.placeholder = "Busca GIFOS y más";
    bloqueBuscador.classList.add('buscador');
    bloqueBuscador.classList.remove('buscador-activo');
    btnBuscar.style.display = "block";
    btnCerrarBusqueda.style.display = "none";

    //faltaria agregar que se cierre cuando se borra todo
}



//2. Resultados de la busqueda: cuando se clickea el boton LUPA aparecen los primeros resultados traidos de la API

//3. Boton Ver mas: cuando se apreta, se cargan mas resultados




// TRENDING TOPICS
//1. traigo los 5 primer trending topics de la API
//2. reemplazo el texto con los resultados

let trendingTopicsTexto = document.getElementById('trending-topics');
window.onload = trendingTopics();

function trendingTopics() {
    let url = `https://api.giphy.com/v1/trending/searches?api_key=${apiKey}`;

    fetch(url)
        .then(resp => resp.json()) //me trae el json con los trending topics
        .then(content => {
            //object with data & meta
            let topics = content.data;
            //console.log("Trending Topics", topics);
            //console.log("META Trending Topics", content.meta);

            trendingTopicsTexto.innerText = topics[0] + ", " + topics[1] + ", " + topics[2] + ", " + topics[3] + ", " + topics[4];
        })
        .catch(err => {
            console.log(err);
        })
}
