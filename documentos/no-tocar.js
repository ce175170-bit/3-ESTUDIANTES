/* =====================================================
   BIBLIOTECA DIGITAL (vista igual a emprendimientos)
   Los libros se agregan en editar-biblioteca.js
   IMPORTANTE: cargar DESPUÉS de script.js
===================================================== */
(() => {

    const DURACION = 380; /* igual que el CSS de emprendimientos */
    const lista = window.LIBROS || [];
    const configuracion = window.BIBLIOTECA_CONFIG || {};

    const contenedor = document.getElementById("listaLibros");
    const buscador = document.getElementById("busqueda");

    if (!contenedor || !lista.length) return;

    let temporizador = null;

    const esc = t => String(t ?? "").replace(/[&<>"']/g, c => (
        { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
    ));

    const normalizar = t => String(t ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    /* quita el emoji del inicio del botón (ya se usan iconos) */
    const limpiar = t => String(t ?? "").replace(/^[^\p{L}\p{N}]+/u, "");

    /* ---------- piezas ---------- */
    const marco = (libro, tamano, conAlt) => {
        const inicial = esc((libro.titulo || "?").trim().charAt(0).toUpperCase());
        if (!libro.portada) {
            return `<span class="emprendimiento-marco ${tamano}"><span class="emprendimiento-inicial">${inicial}</span></span>`;
        }
        return `<span class="emprendimiento-marco ${tamano}">
            <img src="${esc(libro.portada)}" alt="${conAlt ? esc(libro.alt || libro.titulo) : ""}"
                 loading="lazy" decoding="async" draggable="false" data-inicial="${inicial}"></span>`;
    };

    const boton = (archivo, principal) => {
        const atributos = archivo.abrir
            ? 'target="_blank" rel="noopener noreferrer"'
            : "download";
        const clase = principal ? "emprendimiento-boton emprendimiento-boton-whatsapp" : "emprendimiento-boton";
        const icono = principal ? "fa-solid fa-download" : "fa-solid fa-file-pdf";
        return `<a class="${clase} boton-pdf" href="${esc(encodeURI(archivo.ruta))}" ${atributos}>
            <i class="${icono}" aria-hidden="true"></i>${esc(limpiar(archivo.texto || "Descargar PDF"))}</a>`;
    };

    /* ---------- tarjeta de un libro ---------- */
    const tarjeta = (libro, indice) => {
        const idPanel = "libro-panel-" + indice;
        const archivos = libro.archivos || [];
        const subtitulo = esc(libro.autor || libro.categoria);
        const detalle = esc(libro.categoria) + (libro.autor ? " · " + esc(libro.autor) : "");
        const textoBusqueda = normalizar(
            [libro.titulo, libro.autor, libro.categoria, libro.palabras].join(" ")
        );

        let botones = "";
        if (archivos.length) {
            const secundarios = archivos.slice(1).map(a => boton(a, false)).join("");
            botones = `<div class="emprendimiento-botones">
                ${boton(archivos[0], true)}
                ${secundarios ? `<div class="emprendimiento-redes">${secundarios}</div>` : ""}
            </div>`;
        }

        return `
        <article class="emprendimiento" data-buscar="${esc(textoBusqueda)}">
            <button class="emprendimiento-fila" type="button" aria-expanded="false" aria-controls="${idPanel}">
                ${marco(libro, "emprendimiento-marco-pequeno", false)}
                <span class="emprendimiento-nombre"><strong>${esc(libro.titulo)}</strong><span>${subtitulo}</span></span>
                <i class="emprendimiento-flecha" aria-hidden="true"></i>
            </button>
            <div class="emprendimiento-panel" id="${idPanel}" role="region" aria-label="${esc(libro.titulo)}">
                <div class="emprendimiento-panel-interior"><div class="emprendimiento-detalle">
                    ${marco(libro, "emprendimiento-marco-grande", true)}
                    <div class="emprendimiento-info">
                        <h3>${esc(libro.titulo)}</h3>
                        <div class="emprendimiento-estudiante">${detalle}</div>
                        ${libro.descripcion ? `<p class="emprendimiento-descripcion">${esc(libro.descripcion)}</p>` : ""}
                        ${botones}
                    </div>
                </div></div>
            </div>
        </article>`;
    };

    /* ---------- dibujar ---------- */
    contenedor.innerHTML = lista.map(tarjeta).join("");

    const libros = contenedor.querySelectorAll(".emprendimiento");

    /* si una portada no carga, se muestra la inicial */
    contenedor.querySelectorAll(".emprendimiento-marco img").forEach(img => {
        img.addEventListener("error", () => {
            const inicial = document.createElement("span");
            inicial.className = "emprendimiento-inicial";
            inicial.textContent = img.getAttribute("data-inicial") || "?";
            img.replaceWith(inicial);
        });
    });

    /* ---------- mensaje "no se encontraron libros" ---------- */
    const sinResultados = document.createElement("div");
    sinResultados.className = "sin-resultados";
    sinResultados.innerHTML = `
        <h3>📚 No se encontraron libros</h3>
        <p>Intenta buscar utilizando el nombre del libro o autor.</p>
    `;
    contenedor.after(sinResultados);

    /* ---------- abrir, cerrar y centrar ---------- */
    const cerrarTodos = () => {
        contenedor.querySelectorAll(".emprendimiento.abierto").forEach(t => {
            t.classList.remove("abierto");
            t.querySelector(".emprendimiento-fila").setAttribute("aria-expanded", "false");
        });
    };

    const centrar = t => {
        clearTimeout(temporizador);
        temporizador = setTimeout(() => {
            const muyAlto = t.getBoundingClientRect().height > window.innerHeight * 0.9;
            const sinMovimiento = window.matchMedia &&
                window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            t.style.scrollMarginTop = muyAlto ? "90px" : "0px";
            t.scrollIntoView({
                behavior: sinMovimiento ? "auto" : "smooth",
                block: muyAlto ? "start" : "center"
            });
        }, DURACION + 40);
    };

    contenedor.addEventListener("click", evento => {
        const fila = evento.target.closest(".emprendimiento-fila");
        if (!fila) return;
        const t = fila.parentNode;
        const estabaAbierta = t.classList.contains("abierto");
        cerrarTodos();
        if (!estabaAbierta) {
            t.classList.add("abierto");
            fila.setAttribute("aria-expanded", "true");
            centrar(t);
        }
    });

    /* ---------- buscador ---------- */
    if (buscador) {
        buscador.addEventListener("input", () => {
            const texto = normalizar(buscador.value).trim();
            let encontrados = 0;

            libros.forEach(libro => {
                const coincide = libro.dataset.buscar.includes(texto);
                libro.style.display = coincide ? "" : "none";
                if (coincide) encontrados++;
            });

            sinResultados.style.display = encontrados === 0 ? "block" : "none";
        });
    }

    /* ---------- botones PDF para APK / WebView ---------- */
    if (configuracion.compatibilidadApk !== false) {
        contenedor.addEventListener("click", evento => {
            const b = evento.target.closest(".boton-pdf");
            if (!b || b.target === "_blank") return;
            window.open(b.href, "_blank");
        });
    }

    /* ---------- portadas ampliables (script.js) ---------- */
    if (typeof activarImagenes === "function") {
        activarImagenes();
    }

})();