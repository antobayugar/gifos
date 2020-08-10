////// API KEY: 
apiKey = "QEiNwRIV3GcWQ83yvX6IVcIAST0hxr1n";

let favoritosArray = [];

function agregarFavorito(gif) {
    favoritosArray.push(gif);
    console.log(favoritosArray);

    //cambio el icono
    let iconFav = document.getElementById('icon-fav-' + gif);
    iconFav.setAttribute("src", "./assets/icon-fav-active.svg");
}