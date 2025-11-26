// --- DATOS DE PRUEBA (SIMULANDO BASE DE DATOS) ---
let baseDeDatosLocal = [
    {
        nombre: "Ejemplo Guerrero",
        raza: "Orco",
        edad: 30,
        clase: "Guerrero",
        rol: "Protagonista",
        creador: "Admin",
        vivo: true,
        historia: "Un guerrero de prueba."
    },
    {
        nombre: "Ejemplo Mago",
        raza: "Elfo",
        edad: 150,
        clase: "Mago",
        rol: "Secundario",
        creador: "Admin",
        vivo: false,
        historia: "Un mago antiguo."
    },
    {
        nombre: "Zombi de Prueba",
        raza: "No-Muerto",
        edad: 12, // Años de muerto
        clase: "Monstruo",
        rol: "NPC",
        creador: "Admin",
        vivo: false,
        historia: "Solo camina y gruñe."
    }
];

// REFERENCIAS AL HTML
const listaHTML = document.getElementById('lista-personajes');
const form = document.getElementById('form-personaje');
// Referencias de Filtros
const inputBusqueda = document.getElementById('busqueda-texto');
const selectRol = document.getElementById('filtro-rol');
const selectEstado = document.getElementById('filtro-estado');
const selectOrden = document.getElementById('ordenar-resultados');

// --- 1. FUNCIÓN PARA MOSTRAR PERSONAJES (VISTA) ---
function mostrarPersonajes(listaDeDatos) {
    listaHTML.innerHTML = ""; // Limpiar lista actual

    if (listaDeDatos.length === 0) {
        listaHTML.innerHTML = "<p>No se encontraron personajes.</p>";
        return;
    }

    // Recorremos los datos y creamos las "tarjetas"
    listaDeDatos.forEach(p => {
        const estadoTexto = p.vivo ? "Vivo 💚" : "Muerto 💀";
        const tarjeta = document.createElement('div');
        
        // Estilo básico
        tarjeta.style.border = "1px solid #ccc";
        tarjeta.style.padding = "15px";
        tarjeta.style.marginBottom = "10px";
        tarjeta.style.borderRadius = "8px";
        tarjeta.style.backgroundColor = p.vivo ? "#f9fff9" : "#fff0f0"; // Fondo verde suave si vive, rojo suave si muere

        tarjeta.innerHTML = `
            <h3 style="margin-top: 0;">${p.nombre} <small style="color: blue;">(${p.rol})</small></h3>
            <p><strong>Raza:</strong> ${p.raza} | <strong>Clase:</strong> ${p.clase} | <strong>Edad:</strong> ${p.edad}</p>
            <p><strong>Estado:</strong> ${estadoTexto}</p>
            <p><strong>Creador:</strong> ${p.creador}</p>
            <p><em>"${p.historia}"</em></p>
        `;
        
        listaHTML.appendChild(tarjeta);
    });
}

// --- 2. FUNCIÓN PARA AGREGAR NUEVO (GUARDAR) ---
form.addEventListener('submit', function(e) {
    e.preventDefault(); 

    const nuevoPj = {
        nombre: document.getElementById('inp-nombre').value,
        raza: document.getElementById('inp-raza').value,
        edad: document.getElementById('inp-edad').value,
        clase: document.getElementById('inp-clase').value,
        altura: document.getElementById('inp-altura').value,
        peso: document.getElementById('inp-peso').value,
        profesion: document.getElementById('inp-profesion').value,
        fecha: document.getElementById('inp-fecha').value,
        rol: document.getElementById('inp-rol').value,
        creador: document.getElementById('inp-creador').value,
        vivo: document.getElementById('inp-vive').checked,
        historia: document.getElementById('inp-historia').value
    };

    baseDeDatosLocal.unshift(nuevoPj); // Agregar al inicio
    form.reset(); // Limpiar formulario
    alert("Personaje agregado correctamente.");
    aplicarFiltros(); // Actualizar lista
});

// --- 3. LÓGICA CENTRAL: FILTRAR Y ORDENAR ---

// Escuchamos cambios en TODOS los controles
inputBusqueda.addEventListener('input', aplicarFiltros);
selectRol.addEventListener('change', aplicarFiltros);
selectEstado.addEventListener('change', aplicarFiltros);
selectOrden.addEventListener('change', aplicarFiltros);

function aplicarFiltros() {
    // A. Capturar valores
    const texto = inputBusqueda.value.toLowerCase();
    const rolSeleccionado = selectRol.value;
    const estadoSeleccionado = selectEstado.value;
    const ordenSeleccionado = selectOrden.value;

    // B. FILTRAR (Quitar lo que no coincide)
    let resultados = baseDeDatosLocal.filter(p => {
        // Filtro Texto
        const coincideNombre = (p.nombre || "").toLowerCase().includes(texto);
        
        // Filtro Rol
        let coincideRol = true;
        if (rolSeleccionado !== "todos") {
            coincideRol = p.rol === rolSeleccionado;
        }

        // Filtro Estado
        let coincideEstado = true;
        if (estadoSeleccionado !== "todos") {
            if (estadoSeleccionado === "vivo" && !p.vivo) coincideEstado = false;
            if (estadoSeleccionado === "muerto" && p.vivo) coincideEstado = false;
        }

        return coincideNombre && coincideRol && coincideEstado;
    });

    // C. ORDENAR (Acomodar lo que quedó)
    resultados.sort((a, b) => {
        switch (ordenSeleccionado) {
            case 'nombre-asc':
                return (a.nombre || "").localeCompare(b.nombre || "");
            
            case 'nombre-desc':
                return (b.nombre || "").localeCompare(a.nombre || "");

            case 'edad-asc':
                return (Number(a.edad) || 0) - (Number(b.edad) || 0);

            case 'edad-desc':
                return (Number(b.edad) || 0) - (Number(a.edad) || 0);
            
            case 'raza':
                return (a.raza || "").localeCompare(b.raza || "");

            case 'vivo':
                // true (1) va antes que false (0)
                return (a.vivo === b.vivo) ? 0 : a.vivo ? -1 : 1;

            default:
                return 0;
        }
    });

    // D. Mostrar el resultado final
    mostrarPersonajes(resultados);
}

// INICIAR AL CARGAR
aplicarFiltros();