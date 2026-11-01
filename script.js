/* =====================================================
   MENÚ RESPONSIVE
===================================================== */

const botonMenu =
    document.getElementById("botonMenu");

const menuNavegacion =
    document.getElementById("menuNavegacion");


if (botonMenu && menuNavegacion) {

    botonMenu.addEventListener(
        "click",
        () => {

            menuNavegacion.classList.toggle("activo");

            const abierto =
                menuNavegacion.classList.contains("activo");

            botonMenu.textContent =
                abierto ? "✕" : "☰";

        }
    );


    /* CERRAR MENÚ AL TOCAR UNA OPCIÓN */

    document.querySelectorAll(
        "#menuNavegacion a"
    ).forEach(enlace => {

        enlace.addEventListener(
            "click",
            () => {

                menuNavegacion.classList.remove(
                    "activo"
                );

                botonMenu.textContent = "☰";

            }
        );

    });

}


/* =====================================================
   CARRUSEL GENERAL
===================================================== */

function crearCarrusel(configuracion) {

    const pista =
        document.getElementById(configuracion.track);

    const ventanaCarrusel =
        document.getElementById(configuracion.window);

    const botonAnterior =
        document.getElementById(configuracion.prev);

    const botonSiguiente =
        document.getElementById(configuracion.next);

    const contenedorPuntos =
        document.getElementById(configuracion.dots);


    if (!pista || !ventanaCarrusel) {
        return;
    }


    const diapositivas =
        pista.children;

    const total =
        diapositivas.length;

    let indice = 0;

    let inicioX = 0;

    let inicioY = 0;

    let actualX = 0;

    let actualY = 0;

    let arrastrando = false;

    let gestoHorizontal = false;

    let temporizadorAuto = null;


    if (total === 0) {
        return;
    }


    /* =================================================
       CREAR PUNTOS
    ================================================= */

    if (contenedorPuntos) {

        contenedorPuntos.innerHTML = "";

        for (
            let i = 0;
            i < total;
            i++
        ) {

            const punto =
                document.createElement("button");

            punto.className =
                "punto-carrusel";

            punto.setAttribute(
                "aria-label",
                `Ir a imagen ${i + 1}`
            );

            punto.addEventListener(
                "click",
                () => {

                    indice = i;

                    actualizar();

                    reiniciarAutomatico();

                }
            );

            contenedorPuntos.appendChild(punto);

        }

    }


    /* =================================================
       ACTUALIZAR
    ================================================= */

    function actualizar() {

        pista.style.transform =
            `translateX(-${indice * 100}%)`;


        if (contenedorPuntos) {

            const puntos =
                contenedorPuntos.children;

            Array.from(puntos).forEach(
                (punto, i) => {

                    punto.classList.toggle(
                        "activo",
                        i === indice
                    );

                }
            );

        }

    }


    /* =================================================
       SIGUIENTE
    ================================================= */

    function siguiente() {

        indice++;

        if (indice >= total) {

            indice = 0;

        }

        actualizar();

    }


    /* =================================================
       ANTERIOR
    ================================================= */

    function anterior() {

        indice--;

        if (indice < 0) {

            indice = total - 1;

        }

        actualizar();

    }


    /* =================================================
       BOTÓN SIGUIENTE
    ================================================= */

    if (botonSiguiente) {

        botonSiguiente.addEventListener(
            "click",
            () => {

                siguiente();

                reiniciarAutomatico();

            }
        );

    }


    /* =================================================
       BOTÓN ANTERIOR
    ================================================= */

    if (botonAnterior) {

        botonAnterior.addEventListener(
            "click",
            () => {

                anterior();

                reiniciarAutomatico();

            }
        );

    }


    /* =================================================
       DESLIZAMIENTO CON EL DEDO
       CELULAR / TABLET
    ================================================= */

    ventanaCarrusel.addEventListener(
        "touchstart",
        evento => {

            if (!evento.touches || !evento.touches[0]) {
                return;
            }

            inicioX =
                evento.touches[0].clientX;

            inicioY =
                evento.touches[0].clientY;

            actualX =
                inicioX;

            actualY =
                inicioY;

            arrastrando = true;

            gestoHorizontal = false;

        },
        {
            passive: true
        }
    );


    ventanaCarrusel.addEventListener(
        "touchmove",
        evento => {

            if (
                !arrastrando ||
                !evento.touches ||
                !evento.touches[0]
            ) {
                return;
            }


            actualX =
                evento.touches[0].clientX;

            actualY =
                evento.touches[0].clientY;


            const diferenciaX =
                actualX - inicioX;

            const diferenciaY =
                actualY - inicioY;


            /*
             * Determinamos si el movimiento
             * es horizontal.
             */

            if (
                Math.abs(diferenciaX) >
                Math.abs(diferenciaY)
            ) {

                gestoHorizontal = true;

            }

        },
        {
            passive: true
        }
    );


    ventanaCarrusel.addEventListener(
        "touchend",
        () => {

            if (!arrastrando) {
                return;
            }


            const diferenciaX =
                actualX - inicioX;

            const diferenciaY =
                actualY - inicioY;


            /*
             * Solo cambiamos de imagen
             * cuando el movimiento es
             * claramente horizontal.
             */

            if (
                gestoHorizontal &&
                Math.abs(diferenciaX) > 50 &&
                Math.abs(diferenciaX) >
                Math.abs(diferenciaY)
            ) {

                if (diferenciaX < 0) {

                    /* Deslizar hacia la izquierda */
                    siguiente();

                } else {

                    /* Deslizar hacia la derecha */
                    anterior();

                }

            }


            arrastrando = false;

            gestoHorizontal = false;

            reiniciarAutomatico();

        },
        {
            passive: true
        }
    );


    ventanaCarrusel.addEventListener(
        "touchcancel",
        () => {

            arrastrando = false;

            gestoHorizontal = false;

        },
        {
            passive: true
        }
    );


    /* =================================================
       ARRASTRE CON MOUSE
    ================================================= */

    ventanaCarrusel.addEventListener(
        "mousedown",
        evento => {

            arrastrando = true;

            inicioX =
                evento.clientX;

            actualX =
                inicioX;

        }
    );


    ventanaCarrusel.addEventListener(
        "mousemove",
        evento => {

            if (!arrastrando) {
                return;
            }

            actualX =
                evento.clientX;

        }
    );


    ventanaCarrusel.addEventListener(
        "mouseup",
        finalizarMouse
    );


    ventanaCarrusel.addEventListener(
        "mouseleave",
        finalizarMouse
    );


    function finalizarMouse() {

        if (!arrastrando) {
            return;
        }


        const diferencia =
            actualX - inicioX;


        if (
            Math.abs(diferencia) > 60
        ) {

            if (diferencia < 0) {

                siguiente();

            } else {

                anterior();

            }

        }


        arrastrando = false;

        reiniciarAutomatico();

    }


    /* =================================================
       AUTOMÁTICO
    ================================================= */

    function iniciarAutomatico() {

        if (
            !configuracion.automatico ||
            total <= 1
        ) {
            return;
        }


        temporizadorAuto =
            setInterval(
                siguiente,
                configuracion.intervalo || 4500
            );

    }


    function reiniciarAutomatico() {

        if (!configuracion.automatico) {
            return;
        }


        clearInterval(temporizadorAuto);

        iniciarAutomatico();

    }


    /* =================================================
       PAUSAR AL PASAR MOUSE
    ================================================= */

    if (configuracion.automatico) {

        ventanaCarrusel.addEventListener(
            "mouseenter",
            () => {

                clearInterval(temporizadorAuto);

            }
        );


        ventanaCarrusel.addEventListener(
            "mouseleave",
            () => {

                reiniciarAutomatico();

            }
        );

    }


    actualizar();

    iniciarAutomatico();

}


/* =====================================================
   CENTRO DE ESTUDIANTES
===================================================== */

crearCarrusel({

    track:
        "centroPista",

    window:
        "centroVentana",

    prev:
        "centroAnterior",

    next:
        "centroSiguiente",

    dots:
        "centroPuntos",

    automatico:
        false

});


/* =====================================================
   GALERÍA AUTOMÁTICA
===================================================== */

crearCarrusel({

    track:
        "galeriaPista",

    window:
        "galeriaVentana",

    prev:
        "galeriaAnterior",

    next:
        "galeriaSiguiente",

    dots:
        "galeriaPuntos",

    automatico:
        true,

    intervalo:
        4500

});


/* =====================================================
   HORARIOS
===================================================== */

const selectorCurso =
    document.getElementById("curso");

const horarioResultado =
    document.getElementById(
        "horarioResultado"
    );


const horarios = {

    "1a": {
        nombre: "1ro A",
        imagen: "horario/1 A.webp"
    },

    "1b": {
        nombre: "1ro B",
        imagen: "horario/1 B.webp"
    },

    "1c": {
        nombre: "1ro C",
        imagen: "horario/1 C.webp"
    },

    "2a": {
        nombre: "2do A",
        imagen: "horario/2 A.webp"
    },

    "2b": {
        nombre: "2do B",
        imagen: "horario/2 B.webp"
    },

    "2c": {
        nombre: "2do C",
        imagen: "horario/2 C.webp"
    },

    "3a": {
        nombre: "3ro A",
        imagen: "horario/3 A.webp"
    },

    "3b": {
        nombre: "3ro B",
        imagen: "horario/3 B.webp"
    },

    "3c": {
        nombre: "3ro C",
        imagen: "horario/3 C.webp"
    },

    "4a": {
        nombre: "4to A",
        imagen: "horario/4 A.webp"
    },

    "4b": {
        nombre: "4to B",
        imagen: "horario/4 B.webp"
    },

    "4c": {
        nombre: "4to C",
        imagen: "horario/4 C.webp"
    },

    "5a": {
        nombre: "5to A",
        imagen: "horario/5 A.webp"
    },

    "5b": {
        nombre: "5to B",
        imagen: "horario/5 B.webp"
    },

    "5c": {
        nombre: "5to C",
        imagen: "horario/5 C.webp"
    },

    "6a": {
        nombre: "6to A",
        imagen: "horario/6 A.webp"
    },

    "6b": {
        nombre: "6to B",
        imagen: "horario/6 B.webp"
    },

    "6c": {
        nombre: "6to C",
        imagen: "horario/6 C.webp"
    }

};


if (selectorCurso && horarioResultado) {

    selectorCurso.addEventListener(
        "change",
        () => {

            const curso =
                selectorCurso.value;


            if (!curso) {

                horarioResultado.innerHTML = `

                    <p>
                        Selecciona un curso
                        para visualizar su horario.
                    </p>

                `;

                return;

            }


            const datos =
                horarios[curso];


            if (!datos) {
                return;
            }


            horarioResultado.innerHTML = `

                <h3>
                    Horario — ${datos.nombre}
                </h3>

                <img
                    src="${datos.imagen}"
                    alt="Horario ${datos.nombre}"
                    class="imagen-ampliable"
                >

            `;


            activarImagenes();

        }
    );

}


/* =====================================================
   MODAL DE IMÁGENES
===================================================== */

const ventanaModal =
    document.getElementById(
        "modalImagen"
    );

const imagenModal =
    document.getElementById(
        "imagenModal"
    );

const cerrarModal =
    document.getElementById(
        "cerrarModal"
    );


function abrirImagen(ruta) {

    if (!ventanaModal || !imagenModal) {
        return;
    }


    imagenModal.src =
        ruta;

    ventanaModal.classList.add(
        "activo"
    );

    document.body.style.overflow =
        "hidden";

}


function cerrarImagen() {

    if (!ventanaModal || !imagenModal) {
        return;
    }


    ventanaModal.classList.remove(
        "activo"
    );

    document.body.style.overflow =
        "";


    setTimeout(
        () => {

            imagenModal.src = "";

        },
        200
    );

}


if (cerrarModal) {

    cerrarModal.addEventListener(
        "click",
        cerrarImagen
    );

}


if (ventanaModal) {

    ventanaModal.addEventListener(
        "click",
        evento => {

            if (
                evento.target === ventanaModal
            ) {

                cerrarImagen();

            }

        }
    );

}


document.addEventListener(
    "keydown",
    evento => {

        if (
            evento.key === "Escape"
        ) {

            cerrarImagen();

        }

    }
);


/* =====================================================
   IMÁGENES AMPLIABLES
===================================================== */

function activarImagenes() {

    const imagenes =
        document.querySelectorAll(
            `
            .foto-estudiante img,
            .diapositiva-foto img,
            .imagen-ampliable,
            .portada img,
            .presentacion-imagen img,
            .destacado-image img
            `
        );


    imagenes.forEach(
        imagen => {

            imagen.onclick = () => {

                abrirImagen(
                    imagen.src
                );

            };

        }
    );

}


activarImagenes();


/* =====================================================
   BÚSQUEDA DE BIBLIOTECA
===================================================== */

const buscador =
    document.getElementById(
        "busqueda"
    );

const libros =
    document.querySelectorAll(
        ".libro"
    );

const sinResultados =
    document.getElementById(
        "sinResultados"
    );


if (
    buscador &&
    libros.length &&
    sinResultados
) {

    buscador.addEventListener(
        "input",
        () => {

            const texto =
                buscador.value
                    .toLowerCase()
                    .trim();


            let encontrados = 0;


            libros.forEach(
                libro => {

                    const titulo =
                        (
                            libro.dataset.titulo ||
                            ""
                        ).toLowerCase();

                    const autor =
                        (
                            libro.dataset.autor ||
                            ""
                        ).toLowerCase();


                    if (
                        titulo.includes(texto) ||
                        autor.includes(texto)
                    ) {

                        libro.style.display =
                            "grid";

                        encontrados++;

                    } else {

                        libro.style.display =
                            "none";

                    }

                }
            );


            sinResultados.style.display =
                encontrados === 0
                    ? "block"
                    : "none";

        }
    );

}


/* =====================================================
   EVITAR ARRASTRE DE IMÁGENES
===================================================== */

document.querySelectorAll("img")
    .forEach(img => {

        img.addEventListener(
            "dragstart",
            evento => {

                evento.preventDefault();

            }
        );

    });


/* =====================================================
   PDF PARA APK / WEBVIEW
===================================================== */

document.querySelectorAll(".boton-pdf")
    .forEach(boton => {

        boton.addEventListener(
            "click",
            function () {

                const direccion =
                    this.href;

                /*
                 * Permite que el PDF se abra
                 * como archivo externo.
                 */

                window.open(
                    direccion,
                    "_blank"
                );

            }
        );

    });