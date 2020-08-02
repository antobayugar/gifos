/*
PASOS

-pantalla inicial

1: clickeo COMENZAR, se cambia el texto de la pantalla y se pide el permiso. paso 1 activo

2: doy acceso: aparece la camara y el boton GRABAR. paso 2 activo

3: clickeo el boton GRABAR: comienza la grabacion del gif, el boton cambia a FINALIZAR, aparece el contador de segundos

4: clickeo FINALIZAR: boton cambia a SUBIR GIFO, el contador se va y aparece "repetir captura"
    - repetir captura: funcion grabar

5: clickeo SUBIR GIFO: aparece overlay con icono loading y texto. paso 3 activo

6: gifo subido con exito: cambia icono y texto del overlay, aparecen los botones para descargar o link

*/

let btnComenzar = document.getElementById('btn-creargifo-comenzar');
let btnGrabar = document.getElementById('btn-creargifo-grabar');
let btnFinalizar = document.getElementById('btn-creargifo-finalizar');
let btnSubirGifo = document.getElementById('btn-creargifo-subirgifo');

let pasoActivo = document.querySelectorAll('#creargifo-pasos-numero');
let contadorGrabacion = document.getElementById('contador-grabacion');
let repetirCaptura = document.getElementById('contador-repetircaptura');

let recorder;
let blob;

let video = document.getElementById('grabacion-video');
let gifGrabado = document.getElementById('gif-grabado');


//1: clickeo COMENZAR, se cambia el texto de la pantalla y se pide el permiso. paso 1 activo
btnComenzar.addEventListener('click', comenzarGifo);

function comenzarGifo() {

    btnComenzar.style.display = "none";

    let tituloGrabar = document.getElementById('titulo-grabargifo');
    let textoGrabar = document.getElementById('texto-grabargifo');
    tituloGrabar.innerHTML = "¿Nos das acceso </br>a tu cámara?";
    textoGrabar.innerHTML = "El acceso a tu camara será válido sólo </br>por el tiempo en el que estés creando el GIFO."

    pasoActivo[0].classList.add('paso-activo');

    //funcion pedir permisos camara
    navigator.mediaDevices.getUserMedia({ audio: false, video: { width: 480, height: 320 } })

        //doy acceso: aparece la camara y el boton GRABAR. paso 2 activo
        .then(function (mediaStream) {
            //borro el texto
            tituloGrabar.style.display = "none";
            textoGrabar.style.display = "none";
            btnGrabar.style.display = "block";

            pasoActivo[0].classList.remove('paso-activo');
            pasoActivo[1].classList.add('paso-activo');

            //aparece el video
            video.style.display = "block";
            video.srcObject = mediaStream;
            video.onloadedmetadata = function (e) {
                video.play();
            };

            recorder = RecordRTC(mediaStream, {
                type: 'gif'
            });
        })

    /* .then (apareceVideo()) */
}

/* function apareceVideo(mediaStream) {
    tituloGrabar.style.display = "none";
    textoGrabar.style.display = "none";
    btnGrabar.style.display = "block";

    pasoActivo[0].classList.remove('paso-activo');
    pasoActivo[1].classList.add('paso-activo');

    //aparece el video
    video.style.display = "block";
    video.srcObject = mediaStream;
    video.onloadedmetadata = function (e) {
        video.play();
    };

    recorder = RecordRTC(mediaStream, {
        type: 'gif'
    });
} */

//3: clickeo el boton GRABAR: comienza la grabacion del gif, el boton cambia a FINALIZAR, aparece el contador de segundos
btnGrabar.addEventListener('click', grabarGifo);

function grabarGifo() {
    
    recorder.startRecording();
    console.log("grabando");

    btnGrabar.style.display = "none";
    btnFinalizar.style.display = "block";

    contadorGrabacion.style.display = "block";
    repetirCaptura.style.display = "none";
}


//4: clickeo FINALIZAR: boton cambia a SUBIR GIFO, el contador se va y aparece "repetir captura"

btnFinalizar.addEventListener('click', finalizarGifo);

function finalizarGifo() {
    
    btnFinalizar.style.display = "none";
    btnSubirGifo.style.display = "block";

    contadorGrabacion.style.display = "none";
    repetirCaptura.style.display = "block";

    recorder.stopRecording(function () {
        video.style.display = "none";
        gifGrabado.style.display = "block";

        blob = recorder.getBlob();
        gifGrabado.src = URL.createObjectURL(recorder.getBlob());
    });
}

//- repetir captura: funcion grabar
repetirCaptura.addEventListener('click', repetirGifo);

function repetirGifo() {
    repetirCaptura.style.display = "none";

    //sacar boton subir gifo
    btnSubirGifo.style.display = "none";

    //se va la imagen
    gifGrabado.style.display = "none";

    //funciones comenzar gifo pero sin texto
    //aparece boton grabar gifo
    btnGrabar.style.display = "block";

    //aparece el video
    video.style.display = "block";
    video.srcObject = mediaStream;
    video.onloadedmetadata = function (e) {
        video.play();
    };

    recorder = RecordRTC(mediaStream, {
        type: 'gif'
    });
}


btnSubirGifo.addEventListener('click', subirGifo);

function subirGifo() {

}