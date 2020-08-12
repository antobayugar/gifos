////// API KEY: 
apiKey = "QEiNwRIV3GcWQ83yvX6IVcIAST0hxr1n";
offsetBusqueda = 0;

//let pantallaFavoritosVacio = document.getElementById('favoritos-vacio');
let pantallaFavoritos = document.getElementById('resultados-favoritos');

let favoritosArray = [];
let favoritosString = localStorage.getItem("gifosFavoritos");

function agregarFavorito(gif) {

    //si en el local storage no hay nada, el array queda vacio
    if (favoritosString == null) {
        favoritosArray = [];

    } else {
        //si tengo contenido, necesito parsearlo para poder agregar uno nuevo independiente
        favoritosArray = JSON.parse(favoritosString);
    }

    favoritosArray.push(gif);
    //vuelvo a pasar a texto el array para subirlo al localStorage
    favoritosString = JSON.stringify(favoritosArray);
    localStorage.setItem("gifosFavoritos", favoritosString);

    //cambio el icono del corazon
    let iconFav = document.getElementById('icon-fav-' + gif);
    iconFav.setAttribute("src", "./assets/icon-fav-active.svg");
}


let urlActual = window.location.pathname;
if (urlActual ==="/favoritos.html") {
    //solo corre la funcion si estoy en la pagina de favoritos
    buscarFavoritos();
}

//funciones para mostrar los favoritos en la pagina
function buscarFavoritos() {
    let pantallaFavoritosVacio = document.getElementById('favoritos-vacio');
    //let pantallaFavoritos = document.getElementById('gifos-favoritos');

    if (favoritosString == null) {
        //1. si no tengo favoritos, muestro la pantalla favoritos vacia
        pantallaFavoritosVacio.style.display = "block";
        pantallaFavoritos.style.display = "none";

    } else {
        favoritosArray = JSON.parse(favoritosString);
        console.log(favoritosArray);
        let urlFavoritos = `https://api.giphy.com/v1/gifs?ids=${favoritosArray.toString()}&api_key=${apiKey}&limit=12&offset=${offsetBusqueda}`;
        console.log(urlFavoritos);

        fetch(urlFavoritos)
            .then(response => response.json())
            .then(content => {
                mostrarFavoritos(content);
            })
            .catch(err => {
                console.error('fetch favoritos fallo', err);
            })
    }
}

function mostrarFavoritos(content) {
    let gifosFavoritosArray = content.data;

    for(let i=0; i< gifosFavoritosArray.length; i++) {
        pantallaFavoritos.innerHTML += `
        <div class="resultados-gif-box-fav">
        <div class="gif-acciones-resultados-fav">
            <div class="iconos-acciones-gif">
                <button class="iconos-acciones-box favorito-fav" >
                    <img src="./assets/icon-fav-active.svg" alt="icon-favorito" >
                </button>
                <button class="iconos-acciones-box download" onclick="descargarGif('${content.data[i].images.downsized.url}', '${content.data[i].slug}')">
                    <img src="./assets/icon-download.svg" alt="icon-dowlnoad">
                </button>
                <button class="iconos-acciones-box max">
                    <img src="./assets/icon-max.svg" alt="icon-max">
                </button>
            </div>
            <div class="textos-descripcion-gif-favoritos">
                <p class="user-gif-favoritos">${content.data[i].username}</p>
                <p class="titulo-gif-favoritos">${content.data[i].title}</p>
            </div>
        </div>
        <img src="${content.data[i].images.downsized.url}" alt="${content.data[i].title}" class="resultados-gif">
    </div>
        `;
    }
}




//FUNCION DESCARGAR GIF
async function descargarGif(gifImg, gifNombre) {
    let blob = await fetch(gifImg).then( img => img.blob());;
    invokeSaveAsDialog(blob, gifNombre + ".gif");
}