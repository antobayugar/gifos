////// API KEY: 
apiKey = "QEiNwRIV3GcWQ83yvX6IVcIAST0hxr1n";
//offsetBusqueda = 0;

misGifosArray = [];
misGifosString = localStorage.getItem("misGifos");

let pantallaMisGifos = document.getElementById('resultados-misgifos');

buscarMisGifos();

//funciones para mostrar mis gifos en la pagina
function buscarMisGifos() {
    let pantallaMisGifosVacio = document.getElementById('misgifos-vacio');

    if (misGifosString == null) {
        //1. si no tengo gif creados, muestro la pantalla mis gifos vacia
        pantallaMisGifosVacio.style.display = "block";
        pantallaMisGifos.style.display = "none";

    } else {
        misGifosArray = JSON.parse(misGifosString);
        let urlMisGifos = `https://api.giphy.com/v1/gifs?ids=${misGifosArray.toString()}&api_key=${apiKey}`;
        //console.log(urlMisGifos);

        fetch(urlMisGifos)
            .then(response => response.json())
            
            .then(content => {
                console.log(content);
                mostrarMisGifos(content);
            })
            .catch(err => {
                console.error('fetch mis gifos fallo', err);
            })
    }
}

function mostrarMisGifos(content) {
    let gifosMisGifosArray = content.data;

    for(let i=0; i< gifosMisGifosArray.length; i++) {
        pantallaMisGifos.innerHTML += `
        <div class="resultados-gif-box-misgifos">
                    <div class="gif-acciones-resultados-misgifos">
                        <div class="iconos-acciones-gif">
                            <button class="iconos-acciones-box borrar">
                                <img src="./assets/icon_trash.svg" alt="icon-borrar">
                            </button>
                            <button class="iconos-acciones-box download">
                                <img src="./assets/icon-download.svg" alt="icon-download" onclick="descargarGif('${content.data[i].images.downsized.url}', '${content.data[i].slug}')">
                            </button>
                            <button class="iconos-acciones-box max">
                                <img src="./assets/icon-max.svg" alt="icon-max">
                            </button>
                        </div>
                        <div class="textos-descripcion-gif-misgifos">
                            <p class="user-gif-misgifos">${content.data[i].username}</p>
                            <p class="titulo-gif-misgifos">${content.data[i].title}</p>
                        </div>
                    </div>
                    <img src="${content.data[i].images.downsized.url}" alt="${content.data[i].title}" class="resultados-gif">
                </div>
        `;
    }
}