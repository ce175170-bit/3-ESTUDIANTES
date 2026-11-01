/* =====================================================
   BIBLIOTECA DIGITAL
   (los libros se agregan en editar-biblioteca.js)
   ARCHIVO INDEPENDIENTE: no hace falta tocar script.js
   ni el HTML ni style.css

   IMPORTANTE: en index.html debe cargarse DESPUÉS de script.js
===================================================== */
(() => {

    const lista = window.LIBROS || [];
    const configuracion = window.BIBLIOTECA_CONFIG || {};

    const contenedor = document.getElementById("listaLibros");
    const buscador = document.getElementById("busqueda");

    if (!contenedor || !lista.length) return;


    const esc = t => String(t ?? "").replace(/[&<>"']/g, c => (
        { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
    ));

    /* minúsculas y sin tildes, para que "ingles" encuentre "Inglés" */
    const normalizar = t => String(t ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();


    /* =================================================
       TARJETA DE UN LIBRO
    ================================================= */

    const tarjeta = libro => {

        const textoBusqueda = normalizar(
            [libro.titulo, libro.autor, libro.categoria, libro.palabras].join(" ")
        );

        const botones = (libro.archivos || []).map((archivo, i) => `
                    <a href="${esc(archivo.ruta)}"
                       ${archivo.abrir ? 'target="_blank" rel="noopener noreferrer"' : "download"}
                       class="boton-pdf${i > 0 ? " secundario" : ""}">
                        ${esc(archivo.texto || "📥 Descargar PDF")}
                    </a>`).join("");

        return `
        <article class="libro" data-buscar="${esc(textoBusqueda)}">
            <div class="portada">
                <img src="${esc(libro.portada)}" alt="${esc(libro.alt || libro.titulo)}"
                     loading="lazy" decoding="async" draggable="false">
            </div>
            <div class="libro-info">
                <span class="categoria">${esc(libro.categoria)}</span>
                <h3>${esc(libro.titulo)}</h3>
                <p><strong>Autor:${libro.autor ? " " + esc(libro.autor) : ""}</strong></p>
                <p class="descripcion">${esc(libro.descripcion)}</p>
                <div class="descargas">${botones}
                </div>
            </div>
        </article>`;

    };


    /* =================================================
       DIBUJAR LA LISTA (reemplaza los libros del HTML)
    ================================================= */

    contenedor.innerHTML = lista.map(tarjeta).join("");

    const libros = contenedor.querySelectorAll(".libro");


    /* =================================================
       MENSAJE "NO SE ENCONTRARON LIBROS"
    ================================================= */

    const sinResultados = document.createElement("div");

    sinResultados.className = "sin-resultados";

    sinResultados.innerHTML = `
        <h3>📚 No se encontraron libros</h3>
        <p>Intenta buscar utilizando el nombre del libro o autor.</p>
    `;

    contenedor.after(sinResultados);


    /* =================================================
       BUSCADOR
    ================================================= */

    if (buscador) {

        buscador.addEventListener("input", () => {

            const texto = normalizar(buscador.value).trim();

            let encontrados = 0;

            libros.forEach(libro => {

                const coincide = libro.dataset.buscar.includes(texto);

                libro.style.display = coincide ? "" : "none";

                if (coincide) encontrados++;

            });

            sinResultados.style.display =
                encontrados === 0 ? "block" : "none";

        });

    }


    /* =================================================
       BOTONES PDF PARA APK / WEBVIEW
       (lo mismo que hacía script.js con los botones viejos)
    ================================================= */

    if (configuracion.compatibilidadApk !== false) {

        contenedor.addEventListener("click", evento => {

            const boton = evento.target.closest(".boton-pdf");

            if (!boton || boton.target === "_blank") return;

            window.open(boton.href, "_blank");

        });

    }


    /* =================================================
       PORTADAS AMPLIABLES (usa la función de script.js)
    ================================================= */

    if (typeof activarImagenes === "function") {

        activarImagenes();

    }

})();
