//MODO OSCURO
let body = document.getElementById('body');

let darkModeStorage = localStorage.getItem("darkMode");
let darkModeBtn = document.getElementById('menu-modo');
darkModeBtn.addEventListener('click', cambioMode);

//funcion cuando el darkmode esta activado
let darkModeActivado = () => {
    body.classList.add('body-dark');
    darkModeBtn.innerHTML = "Modo diurno";

    //navbar
    cambioLogos();
    cambioIconoCrearGifo();

    //home
    //funcion cambiar icono lupa violeta
    cambioIconosBusqueda();

    //crear gifos
    //funcion cambiar imagenes camaras

    localStorage.setItem("darkMode", "activado");
}

//funcion cuando el darkmode esta desactivado
let darkModeDesactivado = () => {
    body.classList.remove('body-dark');
    darkModeBtn.innerHTML = "Modo nocturno";

    //navbar
    cambioLogos();
    cambioIconoCrearGifo();

    //home
    //funcion cambiar icono lupa violeta
    cambioIconosBusqueda();

    localStorage.setItem("darkMode", null);
}

//chequeo cuando cargo la pagina el estado del LStorage
if (darkModeStorage === "activado") {
    darkModeActivado();
}

//funcion para cambiar el mode
function cambioMode() {
    darkModeStorage = localStorage.getItem("darkMode");

    if (darkModeStorage !== "activado") {
        darkModeActivado();
    } else {
        darkModeDesactivado();
    }
}




//funciones adicionales para cambiar src de imagenes, iconos
function cambioLogos() {
    let logoMobile = document.getElementById('logo');
    let logoDesktop = document.getElementById('logo-desktop');

    if (darkModeBtn.innerHTML == 'Modo nocturno') {
        logoDesktop.setAttribute("src", "./assets/logo-desktop.svg");
        logoMobile.setAttribute("src", "./assets/logo-mobile.svg");
    } else {
        logoDesktop.setAttribute("src", "./assets/logo-desktop-modo-noc.svg");
        logoMobile.setAttribute("src", "./assets/logo-mobile-modo-noc.svg");
    }
}

function cambioIconoCrearGifo() {
    let iconoCrearGifo = document.querySelector('.mas-violeta');
    let iconoCrearGifoHover = document.querySelector('.mas-blanco');

    if (darkModeBtn.innerHTML == 'Modo nocturno') {
        iconoCrearGifo.setAttribute("src", "./assets/button-crear-gifo.svg");
        iconoCrearGifoHover.setAttribute("src", "./assets/button-crear-gifo-hover.svg");
    } else {
        iconoCrearGifo.setAttribute("src", "./assets/button-crear-gifo-hover.svg");
        iconoCrearGifoHover.setAttribute("src", "./assets/button-crear-gifo-dark.svg");
    }

}

function cambioIconosBusqueda() {

    if (darkModeBtn.innerHTML == 'Modo nocturno') {
        iconBuscar.setAttribute("src", "./assets/icon-search.svg");
        btnCerrarBusqueda.setAttribute("src", "./assets/button-close.svg");
    } else {
        iconBuscar.setAttribute("src", "./assets/icon-search-mod-noc.svg");
        btnCerrarBusqueda.setAttribute("src", "./assets/button-close-modo-noc.svg");
    }

}