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
        historia: "Un guerrero de prueba para ver cómo queda la lista."
    },
    {
        nombre: "Ejemplo Mago",
        raza: "Elfo",
        edad: 150,
        clase: "Mago",
        rol: "Secundario",
        creador: "Admin",
        vivo: false,
        historia: "Un mago antiguo que falleció en la gran guerra."
    }
];

// REFERENCIAS AL HTML
const listaHTML = document.getElementById('lista-personajes');
const form = document.getElementById('form-personaje');

// --- 1. FUNCIÓN PARA MOSTRAR PERSONAJES ---
function mostrarPersonajes(listaDeDatos) {
    listaHTML.innerHTML = ""; // Limpiar lista actual

    if (listaDeDatos.length === 0) {
        listaHTML.innerHTML = "<p>No se encontraron personajes.</p>";
        return;
    }

    // Recorremos los datos y creamos las "tarjetas"
    listaDeDatos.forEach(p => {
        // Determinamos estado
        const estadoTexto = p.vivo ? "Vivo" : "Muerto 💀";
        
        // Creamos el elemento visual
        const tarjeta = document.createElement('div');
        
        // Estilo básico en línea para que se distinga (ya que no usamos CSS externo aún)
        tarjeta.style.border = "1px solid #ccc";
        tarjeta.style.padding = "15px";
        tarjeta.style.marginBottom = "10px";
        tarjeta.style.borderRadius = "8px";
        tarjeta.style.backgroundColor = "#f9f9f9";

        tarjeta.innerHTML = `
            <h3 style="margin-top: 0;">${p.nombre} <small style="color: blue;">(${p.rol})</small></h3>
            <p><strong>Raza:</strong> ${p.raza} | <strong>Clase:</strong> ${p.clase} | <strong>Edad:</strong> ${p.edad}</p>
            <p><strong>Estado:</strong> ${estadoTexto}</p>
            <p><strong>Creador:</strong> ${p.creador}</p>
            <p><em>"${p.historia}"</em></p>
            <hr>
        `;
        
        listaHTML.appendChild(tarjeta);
    });
}

// --- 2. FUNCIÓN PARA AGREGAR NUEVO (GUARDAR) ---
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que se recargue la página

    // Capturamos los datos del formulario
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

    // Lo guardamos en nuestro array local
    baseDeDatosLocal.unshift(nuevoPj); // 'unshift' lo pone al principio de la lista

    // Limpiamos el formulario
    form.reset();

    // Actualizamos la vista
    alert("Personaje agregado temporalmente (Local)");
    aplicarFiltros(); // Para que se muestre en la lista
});

// --- 3. FUNCIÓN DE BÚSQUEDA Y FILTROS ---
const inputBusqueda = document.getElementById('busqueda-texto');
const selectRol = document.getElementById('filtro-rol');
const selectEstado = document.getElementById('filtro-estado');

// Escuchamos cambios en los 3 filtros
inputBusqueda.addEventListener('input', aplicarFiltros);
selectRol.addEventListener('change', aplicarFiltros);
selectEstado.addEventListener('change', aplicarFiltros);

function aplicarFiltros() {
    const texto = inputBusqueda.value.toLowerCase();
    const rolSeleccionado = selectRol.value;
    const estadoSeleccionado = selectEstado.value;

    // Filtramos la base de datos local
    const resultados = baseDeDatosLocal.filter(p => {
        // 1. Filtro Texto (Nombre)
        const coincideNombre = p.nombre.toLowerCase().includes(texto);
        
        // 2. Filtro Rol
        let coincideRol = true;
        if (rolSeleccionado !== "todos") {
            coincideRol = p.rol === rolSeleccionado;
        }

        // 3. Filtro Estado
        let coincideEstado = true;
        if (estadoSeleccionado !== "todos") {
            if (estadoSeleccionado === "vivo" && !p.vivo) coincideEstado = false;
            if (estadoSeleccionado === "muerto" && p.vivo) coincideEstado = false;
        }

        return coincideNombre && coincideRol && coincideEstado;
    });

    // Mostramos los resultados filtrados
    mostrarPersonajes(resultados);
}

// INICIAR AL CARGAR LA PÁGINA
mostrarPersonajes(baseDeDatosLocal);