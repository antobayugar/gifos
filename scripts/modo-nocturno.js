//MODO OSCURO

//como hago para que se mantenga clickeado cuando navego en el sitio??
let darkModeStorage = localStorage.getItem("darkMode");

let darkMode = document.getElementById('menu-modo');
darkMode.addEventListener('click', cambioEstilos);

function cambioEstilos() {

    //se cambia el texto del boton a "modo diurno"
    if (darkMode.innerHTML == 'Modo nocturno') {
        darkMode.innerHTML = 'Modo diurno';
    }
    else {
        darkMode.innerHTML = 'Modo nocturno';
    }

    //para cambiar logo llamo funcion
    cambioLogos();

    //se agregan las clases con los colores nocturnos
    //1. NAVBAR
    let lineaMenu = document.querySelectorAll('.linea-violeta');
    lineaMenu[0].classList.toggle('linea-dark');
    lineaMenu[1].classList.toggle('linea-dark');

    let navbar = document.querySelector('.navbar');
    navbar.classList.toggle('navbar-dark');

    let iconHamb = document.getElementById('icon-hamburguesa');
    let spanIconHamb = iconHamb.querySelectorAll('#icon-hamburguesa > span');
    for (let i = 0; i < spanIconHamb.length; i++) {
        spanIconHamb[i].classList.toggle('span-dark');
    }

    let ulMenu = document.getElementById('ul-menu');
    ulMenu.classList.toggle('ul-dark');

    let menuItems = document.querySelectorAll('.menu-items');
    for (let i = 0; i < menuItems.length; i++) {
        menuItems[i].classList.toggle('menu-items-dark');
    }

    let menuItemCrear = document.querySelector('.menu-creargifo');
    menuItemCrear.classList.toggle('menu-creargifo-dark');
    cambioIconoCrearGifo();

}


function cambioLogos() {
    let logoMobile = document.getElementById('logo');
    let logoDesktop = document.getElementById('logo-desktop');

    if (darkMode.innerHTML == 'Modo nocturno') {
        logoDesktop.setAttribute("src", "/assets/logo-desktop.svg");
        logoMobile.setAttribute("src", "/assets/logo-mobile.svg");
    } else {
        logoDesktop.setAttribute("src", "/assets/logo-desktop-modo-noc.svg");
        logoMobile.setAttribute("src", "/assets/logo-mobile-modo-noc.svg");
    }
}

function cambioIconoCrearGifo() {
    let iconoCrearGifo = document.querySelector('.mas-violeta');
    let iconoCrearGifoHover = document.querySelector('.mas-blanco');

    if (darkMode.innerHTML == 'Modo nocturno') {
        iconoCrearGifo.setAttribute("src", "/assets/button-crear-gifo.svg");
        iconoCrearGifoHover.setAttribute("src", "/assets/button-crear-gifo-hover.svg");
    } else {
        iconoCrearGifo.setAttribute("src", "/assets/button-crear-gifo-hover.svg");
        iconoCrearGifoHover.setAttribute("src", "/assets/button-crear-gifo-dark.svg");
    }

}