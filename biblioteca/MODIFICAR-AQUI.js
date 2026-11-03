

window.BIBLIOTECA_CONFIG = {
    /* true  → al pulsar un botón PDF también se abre en una pestaña nueva
               (lo que hacía antes script.js, útil para la APK / WebView).
       false → solo se descarga o abre de forma normal. */
    compatibilidadApk: true
};

window.LIBROS = [
    {
        titulo: "Creacion del Col. J. F. B.",
        categoria: "Reseña Historica",
        autor: "",
        descripcion: "Descubre como fue fundado el Colegio Juan Francisco Bohórquez",
        portada: "biblioteca/imagenes/frontis.webp",
        alt: "Creacion del Colegio",
        palabras: "creacion colegio fundacion",
        archivos: [
            { texto: "📥 Descargar PDF", ruta: "biblioteca/CREACIÓN DE NUESTRO COLEGIO.pdf", abrir: true }
        ]
    },

    {
        titulo: "Creacion de la Banda de Música del Col. J.F.B.",
        categoria: "Reseña Historica",
        autor: "",
        descripcion: "Descubre como fue creado la banda de música del Colegio Juan Francisco Bohórquez",
        portada: "biblioteca/imagenes/banda.jpg",
        alt: "Creacion banda de musica",
        palabras: "banda musica fundacion",
        archivos: [
            { texto: "📥 Descargar PDF", ruta: "biblioteca/CREACIÓN DE LA BANDA DE GUERRA.pdf" }
        ]
    },

    {
        titulo: "Himno al Col. J.F.B.",
        categoria: "Himno al Col. J.F.B.",
        autor: "",
        descripcion: "Descubre la letra del Himno al Colegio “Juan Francisco Bohórquez”",
        portada: "biblioteca/imagenes/himno.webp",
        alt: "himno col. J.F.B.",
        palabras: "himno",
        archivos: [
            { texto: "📥 Descargar PDF", ruta: "biblioteca/HIMNO AL COLEGIO.pdf" }
        ]
    },

    {
        titulo: "Reglamento Interno del Col. J.F.B.",
        categoria: "Documento",
        autor: "",
        descripcion: "Conoce las normas, respeta a los demás y construyamos juntos un mejor colegio.",
        portada: "biblioteca/imagenes/reglamento.webp",
        alt: "Reglamento del Col. J.F.B.",
        palabras: "reglamento interno normas",
        archivos: [
            { texto: "📥 Descargar PDF", ruta: "biblioteca/REGLAMENTO INTERNO DEL COLEGIO BOHORQUEZ.pdf" }
        ]
    },

    {
        titulo: "Historia sobre la creación del Municipio de Betanzos",
        categoria: "Documento",
        autor: "",
        descripcion: "Encuentra un breve resumen, sobre la creacion del Municipio de Betanzos",
        portada: "biblioteca/imagenes/betanzos.png",
        alt: "Betanzos",
        palabras: "Betanzos",
        archivos: [
            { texto: "📥 Descargar PDF", ruta: "biblioteca/historia-betanzos.pdf" }
        ]
    },

    {
        titulo: "La razón de estar contigo",
        categoria: "Novela de ficción",
        autor: "W. Bruce Cameron",
        descripcion: "Narra las vidas de un perro que renace una y otra vez, buscando su verdadero propósito. Entre sus dueños destaca Ethan, un niño con quien comparte un lazo inolvidable. Es una historia tierna sobre la lealtad y el amor incondicional.",
        portada: "biblioteca/imagenes/estar contigo.png",
        alt: "La razón de estar contigo",
        palabras: "La razón de estar contigo",
        archivos: [
            { texto: "📥 Descargar PDF", ruta: "biblioteca/estar contigo.pdf" }
        ]
    },

    {
        titulo: "Boulevard",
        categoria: "Novela Juvenil",
        autor: "Flor M. Salvador",
        descripcion: "Mezcla una historia de amor intensa con secretos, giros inesperados y emociones fuertes, con un toque de misterio que mantiene al lector enganchado. Su frase promocional lo resume bien: ¿quién dijo que después de la tormenta sale el sol cuando puede haber un rayo?",
        portada: "biblioteca/imagenes/boulevarth.png",
        alt: "Boulevard",
        palabras: "Boulevard",
        archivos: [
            { texto: "📥 Descargar PDF", ruta: "biblioteca/boulevarth.pdf" }
        ]
    },

    {
        titulo: "Don quijote de la Mancha",
        categoria: "Novela Clasica",
        autor: "Miguel de Cervantes Saavedra",
        descripcion: "Cuenta la historia de Alonso Quijano, un hidalgo que enloquece de tanto leer libros de caballerías y se lanza a recorrer La Mancha como caballero andante, acompañado de su escudero Sancho Panza.",
        portada: "biblioteca/imagenes/quijote.jpg",
        alt: "Don quijote de la Mancha",
        palabras: "don quijote de la mancha",
        archivos: [
            { texto: "📥 Descargar PDF", ruta: "biblioteca/don quijote.pdf" }
        ]
    },

    {
        titulo: "El principito",
        categoria: "Novela",
        autor: "Antoine de Saint-Exupéry",
        descripcion: "El Principito (1943), de Antoine de Saint-Exupéry, es una novela corta en forma de cuento filosófico. Un piloto cuyo avión se avería en el desierto del Sahara conoce a un niño misterioso, el Principito, que viene de un pequeño asteroide donde vive con una rosa a la que ama.",
        portada: "biblioteca/imagenes/principito.webp",
        alt: "El principito",
        palabras: "el principito",
        archivos: [
            { texto: "📥 Descargar PDF", ruta: "biblioteca/El principito.pdf" }
        ]
    },

    {
        titulo: "Los compás 2",
        categoria: "Los compás 2",
        autor: "",
        descripcion: "Compas 2. Los Compas escapan de la prisión es una novela de humor de Mikecrack, Timba Vk y El Trollino. Tras encontrar el diamantito legendario, los Compas son detenidos injustamente por el sargento Pimiento",
        portada: "biblioteca/imagenes/los compas.webp",
        alt: "Los compas",
        palabras: "los compas 2 interno",
        archivos: [
            { texto: "📥 Descargar PDF", ruta: "biblioteca/los compas 2.pdf" }
        ]
    },
    
    {
        titulo: "1° Secundaria",
        categoria: "Texto Ministerio de Educación 2025",
        autor: "",
        descripcion: "Texto del Ministerio de Educacion de 1° de secundaria correspondiente a la gestion 2025.",
        portada: "biblioteca/imagenes/primero.jpg",
        alt: "texto ministerio",
        palabras: "texto ministerio primero 1ro",
        archivos: [
            { texto: "📥 Texto Principal", ruta: "biblioteca/primero/1ro año de escolaridad [2025].pdf" },
            { texto: "📄 A. Plasticas", ruta: "biblioteca/primero/Artes Plásticas y Visuales.pdf" },
            { texto: "📄 Filosofía - Psicología", ruta: "biblioteca/primero/Cosmovisiones, Filosofía y Psicología.pdf" },
            { texto: "📄 Música", ruta: "biblioteca/primero/Educación Musical.pdf" },
            { texto: "📄 Ingles", ruta: "biblioteca/primero/Lengua Extranjera Inglés.pdf" },
            { texto: "📄 T. Tecnología", ruta: "biblioteca/primero/Técnica Tecnológica General.pdf" },
            { texto: "📄 Religión", ruta: "biblioteca/primero/Valores, Espiritualidades y Religiones.pdf" }
        ]
    },

    {
        titulo: "2° Secundaria",
        categoria: "Texto Ministerio de Educación 2025",
        autor: "",
        descripcion: "Texto del Ministerio de Educacion de 2° de secundaria correspondiente a la gestion 2025.",
        portada: "biblioteca/imagenes/segundo.jpg",
        alt: "texto ministerio",
        palabras: "texto ministerio segundo 2do",
        archivos: [
            { texto: "📥 Texto Principal", ruta: "biblioteca/segundo/2do año de escolaridad [2025].pdf" },
            { texto: "📄 A. Plasticas", ruta: "biblioteca/segundo/2do año de escolaridad - Artes Plásticas y Visuales [2025].pdf" },
            { texto: "📄 Filosofía - Psicología", ruta: "biblioteca/segundo/2do año de escolaridad - Cosmovisiones, Filosofía y Psicología [2025].pdf" },
            { texto: "📄 Música", ruta: "biblioteca/segundo/2do año de escolaridad - Educación Musical [2025].pdf" },
            { texto: "📄 Ingles", ruta: "biblioteca/segundo/2do año de escolaridad - Lengua Extranjera Inglés [2025].pdf" },
            { texto: "📄 T. Tecnología", ruta: "biblioteca/segundo/2do año de escolaridad - Técnica Tecnológica General [2025].pdf" },
            { texto: "📄 Religión", ruta: "biblioteca/segundo/2do año de escolaridad - Valores, Espiritualidades y Religiones [2025].pdf" }
        ]
    },

    {
        titulo: "3° Secundaria",
        categoria: "Texto Ministerio de Educación 2025",
        autor: "",
        descripcion: "Texto del Ministerio de Educacion de 3° de secundaria correspondiente a la gestion 2025.",
        portada: "biblioteca/imagenes/tercero.jpg",
        alt: "texto ministerio",
        palabras: "texto ministerio tercero 3ro",
        archivos: [
            { texto: "📥 Texto Principal", ruta: "biblioteca/tercero/3er año de escolaridad [2025].pdf" },
            { texto: "📄 A. Plasticas", ruta: "biblioteca/tercero/3er año de escolaridad - Artes Plásticas y Visuales [2025].pdf" },
            { texto: "📄 Filosofía - Psicología", ruta: "biblioteca/tercero/3er año de escolaridad - Cosmovisiones, Filosofía y Psicología [2025].pdf" },
            { texto: "📄 Música", ruta: "biblioteca/tercero/3er año de escolaridad - Educación Musical [2025].pdf" },
            { texto: "📄 Ingles", ruta: "biblioteca/tercero/3er año de escolaridad - Lengua Extranjera Inglés [2025].pdf" },
            { texto: "📄 T. Tecnología", ruta: "biblioteca/tercero/3er año de escolaridad - Técnica Tecnológica General [2025].pdf" },
            { texto: "📄 Religión", ruta: "biblioteca/tercero/3er año de escolaridad - Valores, Espiritualidades y Religiones [2025].pdf" }
        ]
    },

    {
        titulo: "4° Secundaria",
        categoria: "Texto Ministerio de Educación 2025",
        autor: "",
        descripcion: "Texto del Ministerio de Educacion de 4° de secundaria correspondiente a la gestion 2025.",
        portada: "biblioteca/imagenes/cuarto.jpg",
        alt: "texto ministerio",
        palabras: "texto ministerio cuarto 4to",
        archivos: [
            { texto: "📥 Texto Principal", ruta: "biblioteca/cuarto/4to año de escolaridad [2025].pdf" },
            { texto: "📄 A. Plasticas", ruta: "biblioteca/cuarto/4to año de escolaridad - Artes Plásticas y Visuales [2025].pdf" },
            { texto: "📄 Filosofía - Psicología", ruta: "biblioteca/cuarto/4to año de escolaridad - Cosmovisiones, Filosofía y Psicología [2025].pdf" },
            { texto: "📄 Música", ruta: "biblioteca/cuarto/4to año de escolaridad - Educación Musical [2025].pdf" },
            { texto: "📄 Ingles", ruta: "biblioteca/cuarto/4to año de escolaridad - Lengua Extranjera Inglés [2025].pdf" },
            { texto: "📄 Religión", ruta: "biblioteca/cuarto/4to año de escolaridad - Valores, Espiritualidades y Religiones [2025].pdf" }
        ]
    },

    {
        titulo: "5° Secundaria",
        categoria: "Texto Ministerio de Educación 2025",
        autor: "",
        descripcion: "Texto del Ministerio de Educacion de 5° de secundaria correspondiente a la gestion 2025.",
        portada: "biblioteca/imagenes/quinto.jpg",
        alt: "texto ministerio",
        palabras: "texto ministerio quinto 5to",
        archivos: [
            { texto: "📥 Texto Principal", ruta: "biblioteca/quinto/5to año de escolaridad [2025].pdf" },
            { texto: "📄 A. Plasticas", ruta: "biblioteca/quinto/5to año de escolaridad - Artes Plásticas y Visuales [2025].pdf" },
            { texto: "📄 Filosofía - Psicología", ruta: "biblioteca/quinto/5to año de escolaridad - Cosmovisiones, Filosofía y Psicología [2025].pdf" },
            { texto: "📄 Música", ruta: "biblioteca/quinto/5to año de escolaridad - Educación Musical [2025].pdf" },
            { texto: "📄 Ingles", ruta: "biblioteca/quinto/5to año de escolaridad - Lengua Extranjera Inglés [2025].pdf" },
            { texto: "📄 Religión", ruta: "biblioteca/quinto/5to año de escolaridad - Valores, Espiritualidades y Religiones [2025].pdf" }
        ]
    },

    {
        titulo: "6° Secundaria",
        categoria: "Texto Ministerio de Educación 2025",
        autor: "",
        descripcion: "Texto del Ministerio de Educacion de 6° de secundaria correspondiente a la gestion 2025.",
        portada: "biblioteca/imagenes/sexto.jpg",
        alt: "texto ministerio",
        palabras: "texto ministerio sexto 6to",
        archivos: [
            { texto: "📥 Texto Principal", ruta: "biblioteca/sexto/6to año de escolaridad [2025].pdf" },
            { texto: "📄 A. Plasticas", ruta: "biblioteca/sexto/6to año de escolaridad - Artes Plásticas y Visuales [2025].pdf" },
            { texto: "📄 Filosofía - Psicología", ruta: "biblioteca/sexto/6to año de escolaridad - Cosmovisiones, Filosofía y Psicología [2025].pdf" },
            { texto: "📄 Música", ruta: "biblioteca/sexto/6to año de escolaridad - Educación Musical [2025].pdf" },
            { texto: "📄 Ingles", ruta: "biblioteca/sexto/6to año de escolaridad - Lengua Extranjera Inglés [2025].pdf" },
            { texto: "📄 Religión", ruta: "biblioteca/sexto/6to año de escolaridad - Valores, Espiritualidades y Religiones [2025].pdf" }
        ]
    }
];


/* ============================================================
   LISTA DE LIBROS Y DOCUMENTOS  (el ÚNICO archivo que debes editar)

   PARA AGREGAR UN LIBRO:
     copia un bloque { ... } completo y pégalo donde quieras
     (al inicio para que salga primero), con una coma entre
     bloque y bloque.
   PARA QUITAR UNO: borra el bloque completo (con su coma).

   titulo      → nombre del libro o documento
   categoria   → palabra pequeña de arriba (LIBRO, DOCUMENTO...)
   autor       → nombre del autor ("" si no hay: se ve "Autor:" vacío)
   descripcion → texto corto
   portada     → imagen de la portada, por ejemplo "Imagenes/libro.jpg"
   alt         → descripción de la imagen (opcional)
   palabras    → palabras extra para el buscador (opcional), separadas
                 por espacios. Ejemplo: "primero 1ro texto"
   archivos    → los botones de descarga:
                   texto → lo que dice el botón
                   ruta  → ruta del PDF, por ejemplo "documentos/libro.pdf"
                   abrir → true si debe abrirse en otra pestaña (opcional)
                 El PRIMER archivo es el botón principal (verde); los
                 demás salen como botones secundarios.

   El buscador encuentra por título, autor, categoría y palabras,
   sin importar mayúsculas ni tildes.

   Si un texto lleva comillas dentro, usa comillas tipográficas “así”
   o comillas simples, para no romper el archivo.
   ============================================================ */