////// API KEY: 
let apiKey = "QEiNwRIV3GcWQ83yvX6IVcIAST0hxr1n";

// BUSCADOR
//1. keydown/keyup: se agranda el div y se muestran sugerencias
let inputBuscador = document.getElementById('input-buscador');
inputBuscador.addEventListener('keydown', buscadorActivo);

function buscadorActivo() {
    inputBuscador.style.backgroundColor = "red"; //prueba. funciona
}

//2. Sugerencias de la busqueda: reemplazo las 4 sugerencias con las primeras 4 de la API

//3. Resultados de la busqueda: cuando se clickea el boton LUPA aparecen los primeros resultados traidos de la API

//4. Boton Ver mas: cuando se apreta, se cargan mas resultados




// TRENDING TOPICS
//1. traigo los 5 primer trending topics de la API
//2. reemplazo el texto con los resultados

let trendingTopicsTexto = document.getElementById('trending-topics');
window.onload = trendingTopics();

function trendingTopics() {
    let url = `https://api.giphy.com/v1/trending/searches?api_key=${apiKey}`;
    
    fetch(url)
    .then(resp => resp.json() ) //me trae el json con los trending topics
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


// TRENDING GIFOS
//1. Traigo el array con trending gifos
//2. reemplazo los gifos mostrados con el contenido del array

/* let sliderTrendingGifos = document.getElementById('trending-slider');
trendingGifos();

function trendingGifos() {
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=4`;
    
    fetch(url)
    .then(resp => resp.json() ) //me trae el json con los 4 trending gifos
    .then(content => {
        //object with data, pagination, meta
        let trendingGifArray = content.data;
        console.log("Trending GIFOS", trendingGifArray);
        //console.log("META Trending GIFOS", content.meta);

        let trendingGIFOhtml = "";

        for (let i = 0; i < trendingGifArray.length; i++ ) {
            let trendingGif = trendingGifArray[i];
            trendingGIFOhtml += `
            <div class="gif-contenedor">
                    <div class="gif-acciones">
                        <div class="iconos-acciones-gif">
                            <button class="iconos-acciones-box favorito">
                                <img src="/assets/icon-fav-hover.svg" alt="icon-favorito">
                            </button>
                            <button class="iconos-acciones-box download">
                                <img src="/assets/icon-download.svg" alt="icon-download">
                            </button>
                            <button class="iconos-acciones-box max">
                                <img src="/assets/icon-max.svg" alt="icon-max">
                            </button>
                        </div>
                        <div class="textos-descripcion-gif">
                            <p class="user-gif">${trendingGif.username}</p>
                            <p class="titulo-gif">${trendingGif.title}</p>
                        </div>
                    </div>
                    <img src="${trendingGif.images.downsized.url}" alt="${trendingGif.title}" class="trending-gif">
                </div>
            `
        }

        sliderTrendingGifos.innerHTML = trendingGIFOhtml;

    })
    .catch(err => {
        console.log(err);
    })
}   */



// MODO NOCTURNO
//1. guardo el boton de "modo nocturno"
//2. cambio clases al click de modo nocturno
//3. cambio el texto del boton a "modo dia"