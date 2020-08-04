////// API KEY: 
apiKey = "QEiNwRIV3GcWQ83yvX6IVcIAST0hxr1n";

// TRENDING GIFOS
//1. Traigo el array con trending gifos
//2. reemplazo los gifos mostrados con el contenido del array

let sliderTrendingGifos = document.getElementById('trending-slider');
trendingGifos();

function trendingGifos() {
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=4`;
    
    fetch(url)
    .then(resp => resp.json() ) //me trae el json con los 4 trending gifos
    .then(content => {
        //object with data, pagination, meta
        let trendingGifArray = content.data;
        //console.log("Trending GIFOS", trendingGifArray);
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
} 