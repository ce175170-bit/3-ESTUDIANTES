/* =====================================================
   MENÚ RESPONSIVE
===================================================== */

const menuBtn =
    document.getElementById("menuBtn");

const navMenu =
    document.getElementById("navMenu");


menuBtn.addEventListener(
    "click",
    () => {

        navMenu.classList.toggle("active");

        const abierto =
            navMenu.classList.contains("active");

        menuBtn.textContent =
            abierto ? "✕" : "☰";

    }
);


/* CERRAR MENÚ AL TOCAR UNA OPCIÓN */

document.querySelectorAll(
    "#navMenu a"
).forEach(link => {

    link.addEventListener(
        "click",
        () => {

            navMenu.classList.remove(
                "active"
            );

            menuBtn.textContent = "☰";

        }
    );

});


/* =====================================================
   CARRUSEL GENERAL
===================================================== */

function crearCarrusel(config) {

    const track =
        document.getElementById(config.track);

    const windowElement =
        document.getElementById(config.window);

    const prev =
        document.getElementById(config.prev);

    const next =
        document.getElementById(config.next);

    const dotsContainer =
        document.getElementById(config.dots);


    if (!track || !windowElement) {
        return;
    }


    const slides =
        track.children;

    const total =
        slides.length;

    let index = 0;

    let startX = 0;

    let currentX = 0;

    let dragging = false;

    let autoTimer = null;


    /* CREAR PUNTOS */

    if (dotsContainer) {

        dotsContainer.innerHTML = "";

        for (
            let i = 0;
            i < total;
            i++
        ) {

            const dot =
                document.createElement("button");

            dot.className =
                "carousel-dot";

            dot.setAttribute(
                "aria-label",
                `Ir a imagen ${i + 1}`
            );

            dot.addEventListener(
                "click",
                () => {

                    index = i;

                    actualizar();

                    reiniciarAutomatico();

                }
            );

            dotsContainer.appendChild(dot);

        }

    }


    /* ACTUALIZAR */

    function actualizar() {

        track.style.transform =
            `translateX(-${index * 100}%)`;


        if (dotsContainer) {

            const dots =
                dotsContainer.children;

            Array.from(dots).forEach(
                (dot, i) => {

                    dot.classList.toggle(
                        "active",
                        i === index
                    );

                }
            );

        }

    }


    /* SIGUIENTE */

    function siguiente() {

        index++;

        if (index >= total) {

            index = 0;

        }

        actualizar();

    }


    /* ANTERIOR */

    function anterior() {

        index--;

        if (index < 0) {

            index = total - 1;

        }

        actualizar();

    }


    /* BOTÓN SIGUIENTE */

    if (next) {

        next.addEventListener(
            "click",
            () => {

                siguiente();

                reiniciarAutomatico();

            }
        );

    }


    /* BOTÓN ANTERIOR */

    if (prev) {

        prev.addEventListener(
            "click",
            () => {

                anterior();

                reiniciarAutomatico();

            }
        );

    }


    /* =================================================
       TOUCH CELULAR
    ================================================= */

    windowElement.addEventListener(
        "touchstart",
        e => {

            startX =
                e.touches[0].clientX;

            currentX =
                startX;

            dragging = true;

        },
        {
            passive: true
        }
    );


    windowElement.addEventListener(
        "touchmove",
        e => {

            if (!dragging) {
                return;
            }

            currentX =
                e.touches[0].clientX;

        },
        {
            passive: true
        }
    );


    windowElement.addEventListener(
        "touchend",
        () => {

            if (!dragging) {
                return;
            }

            const difference =
                currentX - startX;


            if (
                Math.abs(difference) > 50
            ) {

                if (difference < 0) {

                    siguiente();

                } else {

                    anterior();

                }

            }


            dragging = false;

            reiniciarAutomatico();

        }
    );


    /* =================================================
       ARRASTRE CON MOUSE
    ================================================= */

    windowElement.addEventListener(
        "mousedown",
        e => {

            dragging = true;

            startX =
                e.clientX;

            currentX =
                startX;

        }
    );


    windowElement.addEventListener(
        "mousemove",
        e => {

            if (!dragging) {
                return;
            }

            currentX =
                e.clientX;

        }
    );


    windowElement.addEventListener(
        "mouseup",
        finalizarMouse
    );


    windowElement.addEventListener(
        "mouseleave",
        finalizarMouse
    );


    function finalizarMouse() {

        if (!dragging) {
            return;
        }


        const difference =
            currentX - startX;


        if (
            Math.abs(difference) > 60
        ) {

            if (difference < 0) {

                siguiente();

            } else {

                anterior();

            }

        }


        dragging = false;

        reiniciarAutomatico();

    }


    /* =================================================
       AUTOMÁTICO
    ================================================= */

    function iniciarAutomatico() {

        if (
            !config.automatico ||
            total <= 1
        ) {
            return;
        }


        autoTimer =
            setInterval(
                siguiente,
                config.intervalo || 4500
            );

    }


    function reiniciarAutomatico() {

        if (!config.automatico) {
            return;
        }


        clearInterval(autoTimer);

        iniciarAutomatico();

    }


    /* PAUSAR AL PASAR MOUSE */

    if (config.automatico) {

        windowElement.addEventListener(
            "mouseenter",
            () => {

                clearInterval(autoTimer);

            }
        );


        windowElement.addEventListener(
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
        "centroTrack",

    window:
        "centroWindow",

    prev:
        "centroPrev",

    next:
        "centroNext",

    dots:
        "centroDots",

    automatico:
        false

});


/* =====================================================
   GALERÍA AUTOMÁTICA
===================================================== */

crearCarrusel({

    track:
        "galeriaTrack",

    window:
        "galeriaWindow",

    prev:
        "galeriaPrev",

    next:
        "galeriaNext",

    dots:
        "galeriaDots",

    automatico:
        true,

    intervalo:
        4500

});


/* =====================================================
   HORARIOS
===================================================== */

const cursoSelect =
    document.getElementById("curso");

const horarioResultado =
    document.getElementById(
        "horarioResultado"
    );


const horarios = {

    "1a": {
        nombre: "1ro A",
        imagen: "horario/1 A.png"
    },

    "1b": {
        nombre: "1ro B",
        imagen: "horario/1 B.png"
    },

    "1c": {
        nombre: "1ro C",
        imagen: "horario/1 C.png"
    },

    "2a": {
        nombre: "2do A",
        imagen: "horario/2 A.png"
    },

    "2b": {
        nombre: "2do B",
        imagen: "horario/2 B.png"
    },

    "2c": {
        nombre: "2do C",
        imagen: "horario/2 C.png"
    },

    "3a": {
        nombre: "3ro A",
        imagen: "horario/3 A.png"
    },

    "3b": {
        nombre: "3ro B",
        imagen: "horario/3 B.png"
    },

    "3c": {
        nombre: "3ro C",
        imagen: "horario/3 C.png"
    },

    "4a": {
        nombre: "4to A",
        imagen: "horario/4 A.png"
    },

    "4b": {
        nombre: "4to B",
        imagen: "horario/4 B.png"
    },

    "4c": {
        nombre: "4to C",
        imagen: "horario/4 C.png"
    },

    "5a": {
        nombre: "5to A",
        imagen: "horario/5 A.png"
    },

    "5b": {
        nombre: "5to B",
        imagen: "horario/5 B.png"
    },

    "5c": {
        nombre: "5to C",
        imagen: "horario/5 C.png"
    },

    "6a": {
        nombre: "6to A",
        imagen: "horario/6 A.png"
    },    

    "6b": {
        nombre: "6to B",
        imagen: "horario/6 B.png"
    },

    "6c": {
        nombre: "6to C",
        imagen: "horario/6 C.png"
    }
};


cursoSelect.addEventListener(
    "change",
    () => {

        const curso =
            cursoSelect.value;


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


/* =====================================================
   MODAL DE IMÁGENES
===================================================== */

const modal =
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


function abrirImagen(src) {

    imagenModal.src =
        src;

    modal.classList.add(
        "active"
    );

    document.body.style.overflow =
        "hidden";

}


function cerrarImagen() {

    modal.classList.remove(
        "active"
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


cerrarModal.addEventListener(
    "click",
    cerrarImagen
);


modal.addEventListener(
    "click",
    e => {

        if (
            e.target === modal
        ) {

            cerrarImagen();

        }

    }
);


document.addEventListener(
    "keydown",
    e => {

        if (
            e.key === "Escape"
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
            .student-photo img,
            .photo-slide img,
            .imagen-ampliable,
            .portada img,
            .hero-image img,
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
                    libro.dataset.titulo
                        .toLowerCase();

                const autor =
                    libro.dataset.autor
                        .toLowerCase();


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


/* =====================================================
   EVITAR ARRASTRE DE IMÁGENES
===================================================== */

document.querySelectorAll("img")
    .forEach(img => {

        img.addEventListener(
            "dragstart",
            e => {

                e.preventDefault();

            }
        );

    });



    /* =====================================================
   PDF PARA APK / WEBVIEW
===================================================== */

document.querySelectorAll(".btn-pdf").forEach(boton => {

    boton.addEventListener("click", function () {

        const url = this.href;

        // Permite que el PDF se abra como archivo externo
        window.open(url, "_blank");

    });

});