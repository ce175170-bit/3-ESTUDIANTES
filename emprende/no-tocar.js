/* Dibuja la lista de emprendimientos a partir de emprendimientos.js
   No necesitas editar este archivo. */
(function () {
    'use strict';

    var DURACION = 380; /* milisegundos que dura abrir o cerrar (igual que el CSS) */
    var contenedor = document.getElementById('listaEmprendimientos');
    if (!contenedor) return;

    var lista = window.EMPRENDIMIENTOS || [];
    var temporizador = null;

    /* ---------- utilidades ---------- */
    function escapar(texto) {
        return String(texto == null ? '' : texto)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    function normalizarEnlace(valor) {
        valor = String(valor || '').trim();
        if (!valor) return '';
        return /^https?:\/\//i.test(valor) ? valor : 'https://' + valor;
    }

    function enlaceWhatsapp(numero, nombre) {
        var digitos = String(numero || '').replace(/\D/g, '');
        if (!digitos) return '';
        if (digitos.length === 8) digitos = '591' + digitos; /* número boliviano sin código */
        var mensaje = 'Hola, vi "' + nombre + '" en la página del colegio y me interesa más información.';
        return 'https://wa.me/' + digitos + '?text=' + encodeURIComponent(mensaje);
    }

    function crearMarco(emprendimiento, claseTamano, conTextoAlternativo) {
        var inicial = escapar((emprendimiento.nombre || '?').trim().charAt(0).toUpperCase());
        if (!emprendimiento.logo) {
            return '<span class="emprendimiento-marco ' + claseTamano + '">' +
                '<span class="emprendimiento-inicial">' + inicial + '</span></span>';
        }
        return '<span class="emprendimiento-marco ' + claseTamano + '">' +
            '<img src="' + escapar(emprendimiento.logo) + '"' +
            ' alt="' + (conTextoAlternativo ? 'Logo de ' + escapar(emprendimiento.nombre) : '') + '"' +
            ' loading="lazy" decoding="async" data-inicial="' + inicial + '"></span>';
    }

    function crearBoton(destino, clase, icono, texto) {
        return '<a class="emprendimiento-boton ' + clase + '" href="' + escapar(destino) + '"' +
            ' target="_blank" rel="noopener noreferrer">' +
            '<i class="' + icono + '" aria-hidden="true"></i>' + texto + '</a>';
    }

    /* ---------- construir cada emprendimiento ---------- */
    function crearEmprendimiento(emprendimiento, indice) {
        var idPanel = 'emprendimiento-panel-' + indice;
        var estudiante = escapar(emprendimiento.estudiante) +
            (emprendimiento.curso ? ' · ' + escapar(emprendimiento.curso) : '');

        var whatsapp = enlaceWhatsapp(emprendimiento.whatsapp, emprendimiento.nombre);
        var web = normalizarEnlace(emprendimiento.web);
        var facebook = normalizarEnlace(emprendimiento.facebook);
        var instagram = normalizarEnlace(emprendimiento.instagram);
        var tiktok = normalizarEnlace(emprendimiento.tiktok);

        var redes = '';
        if (web)       redes += crearBoton(web, '', 'fa-solid fa-globe', 'Página web');
        if (facebook)  redes += crearBoton(facebook, '', 'fa-brands fa-facebook-f', 'Facebook');
        if (instagram) redes += crearBoton(instagram, '', 'fa-brands fa-instagram', 'Instagram');
        if (tiktok)    redes += crearBoton(tiktok, '', 'fa-brands fa-tiktok', 'TikTok');

        var botones = '';
        if (whatsapp || redes) {
            botones = '<div class="emprendimiento-botones">' +
                (whatsapp ? crearBoton(whatsapp, 'emprendimiento-boton-whatsapp', 'fa-brands fa-whatsapp', 'Escribir por WhatsApp') : '') +
                (redes ? '<div class="emprendimiento-redes">' + redes + '</div>' : '') +
                '</div>';
        }

        return '' +
            '<article class="emprendimiento">' +
                '<button class="emprendimiento-fila" type="button" aria-expanded="false" aria-controls="' + idPanel + '">' +
                    crearMarco(emprendimiento, 'emprendimiento-marco-pequeno', false) +
                    '<span class="emprendimiento-nombre"><strong>' + escapar(emprendimiento.nombre) + '</strong>' +
                    '<span>' + estudiante + '</span></span>' +
                    '<i class="emprendimiento-flecha" aria-hidden="true"></i>' +
                '</button>' +
                '<div class="emprendimiento-panel" id="' + idPanel + '" role="region" aria-label="' + escapar(emprendimiento.nombre) + '">' +
                    '<div class="emprendimiento-panel-interior"><div class="emprendimiento-detalle">' +
                        crearMarco(emprendimiento, 'emprendimiento-marco-grande', true) +
                        '<div class="emprendimiento-info">' +
                            '<h3>' + escapar(emprendimiento.nombre) + '</h3>' +
                            '<div class="emprendimiento-estudiante">' + estudiante + '</div>' +
                            (emprendimiento.descripcion
                                ? '<p class="emprendimiento-descripcion">' + escapar(emprendimiento.descripcion) + '</p>'
                                : '') +
                            botones +
                        '</div>' +
                    '</div></div>' +
                '</div>' +
            '</article>';
    }

    /* ---------- abrir, cerrar y centrar ---------- */
    function cerrarTodos() {
        contenedor.querySelectorAll('.emprendimiento.abierto').forEach(function (tarjeta) {
            tarjeta.classList.remove('abierto');
            tarjeta.querySelector('.emprendimiento-fila').setAttribute('aria-expanded', 'false');
        });
    }

    function abrir(tarjeta) {
        tarjeta.classList.add('abierto');
        tarjeta.querySelector('.emprendimiento-fila').setAttribute('aria-expanded', 'true');
    }

    function centrar(tarjeta) {
        clearTimeout(temporizador);
        /* esperamos a que termine de cerrarse el anterior y de abrirse este */
        temporizador = setTimeout(function () {
            var alto = tarjeta.getBoundingClientRect().height;
            var esMuyAlto = alto > window.innerHeight * 0.9;
            var sinMovimiento = window.matchMedia &&
                window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            tarjeta.style.scrollMarginTop = esMuyAlto ? '90px' : '0px';
            tarjeta.scrollIntoView({
                behavior: sinMovimiento ? 'auto' : 'smooth',
                block: esMuyAlto ? 'start' : 'center'
            });
        }, DURACION + 40);
    }

    /* ---------- iniciar ---------- */
    if (!lista.length) {
        contenedor.innerHTML = '<p class="emprendimientos-vacio">Pronto publicaremos los emprendimientos y proyectos de nuestros estudiantes.</p>';
        return;
    }

    contenedor.innerHTML = lista.map(crearEmprendimiento).join('');

    /* si un logo no carga, se muestra la inicial del emprendimiento */
    contenedor.querySelectorAll('.emprendimiento-marco img').forEach(function (imagen) {
        imagen.addEventListener('error', function () {
            var inicial = document.createElement('span');
            inicial.className = 'emprendimiento-inicial';
            inicial.textContent = imagen.getAttribute('data-inicial') || '?';
            imagen.replaceWith(inicial);
        });
    });

    contenedor.addEventListener('click', function (evento) {
        var fila = evento.target.closest('.emprendimiento-fila');
        if (!fila) return;
        var tarjeta = fila.parentNode;
        var estabaAbierta = tarjeta.classList.contains('abierto');
        cerrarTodos();
        if (!estabaAbierta) {
            abrir(tarjeta);
            centrar(tarjeta);
        }
    });
})();