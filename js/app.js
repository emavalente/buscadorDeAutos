// Variables
const resultado = document.querySelector("#resultado");

// selectores de Búsqueda
const selectMarca = document.querySelector("#marca");
const selectYear = document.querySelector("#year");
const selectMinimo = document.querySelector("#minimo");
const selectMaximo = document.querySelector("#maximo");
const selectPuertas = document.querySelector("#puertas");
const selectTransmision = document.querySelector("#transmision");
const selectColor = document.querySelector("#color");

const max = new Date().getFullYear();
const min = max - 10;

// Objeto generado por al búsqueda
const datosBusqueda = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

// Eventos
document.addEventListener("DOMContentLoaded", () => {
  // Muestra los automoviles al cargar la app.
  mostrarAutos(autos);

  // Llena la opciones de Años.
  llenarSelect();
});

// Eventos de selectores. Van llenando los datosBusqueda y filtran la misma.
selectMarca.addEventListener("change", (e) => {
  datosBusqueda.marca = e.target.value;
  buscarAutos();
});

selectYear.addEventListener("change", (e) => {
  datosBusqueda.year = e.target.value;
  buscarAutos();
});

selectMinimo.addEventListener("change", (e) => {
  datosBusqueda.minimo = e.target.value;
  buscarAutos();
});

selectMaximo.addEventListener("change", (e) => {
  datosBusqueda.maximo = e.target.value;
  buscarAutos();
});

selectPuertas.addEventListener("change", (e) => {
  datosBusqueda.puertas = e.target.value;
  buscarAutos();
});

selectTransmision.addEventListener("change", (e) => {
  datosBusqueda.transmision = e.target.value;
  buscarAutos();
});

selectColor.addEventListener("change", (e) => {
  datosBusqueda.color = e.target.value;
  buscarAutos();
});

// Funciones
function mostrarAutos(autos) {
  limpiarResultados();

  // Muestra todos los autos de la base de datos
  autos.forEach((auto) => {
    const { marca, modelo, year, precio, puertas, color, transmision } = auto;
    const autoHTML = document.createElement("p");
    autoHTML.textContent = `
    Marca: ${marca} - Modelo: ${modelo} - Año: ${year} - Puertas: ${puertas} - Color: ${color} - Transmision: ${transmision} - Precio: ${precio}
    `;

    // insertar en HTML
    resultado.appendChild(autoHTML);
  });
}

// Limpiar Resultados
function limpiarResultados() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

// Genera los años del select Año
function llenarSelect() {
  for (let i = max; i >= min; i--) {
    const opcion = document.createElement("option");
    opcion.value = i;
    opcion.textContent = i;

    selectYear.appendChild(opcion);
  }
}

// Filtra en base a la busqueda
function buscarAutos() {
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);
  console.log(resultado);
  if (resultado.length > 0) {
    mostrarAutos(resultado);
  } else {
    limpiarResultados();
    sinResultado();
  }
}

// Filtros individuales
function filtrarMarca(auto) {
  // Si en datosBusqueda existe una marca seleccionada
  if (datosBusqueda.marca) {
    // retorna el auto recibido que es igual al de la búsqueda
    return auto.marca === datosBusqueda.marca;
  }
  return auto; // si no hay seleccionado retorna todos
}

function filtrarYear(auto) {
  // Si en datosBusqueda existe una marca seleccionada
  if (datosBusqueda.year) {
    // retorna el auto recibido que es igual al de la búsqueda
    return auto.year == datosBusqueda.year;
    // Se utiliza igualdad simple ya que son tipos de datos diferentes numbre == string
    // Tambien se podr'ia solucionar así:
    // return auto.year === parseInt(datosBusqueda.year);
  }
  return auto; // si no hay seleccionado retorna todos
}

function filtrarMinimo(auto) {
  if (datosBusqueda.minimo) {
    return auto.precio >= datosBusqueda.minimo;
  }
  return auto;
}

function filtrarMaximo(auto) {
  if (datosBusqueda.maximo) {
    return auto.precio <= datosBusqueda.maximo;
  }
  return auto;
}

function filtrarPuertas(auto) {
  if (datosBusqueda.puertas) {
    return auto.puertas == datosBusqueda.puertas;
  }
  return auto;
}

function filtrarTransmision(auto) {
  if (datosBusqueda.transmision) {
    return auto.transmision == datosBusqueda.transmision;
  }
  return auto;
}

function filtrarColor(auto) {
  if (datosBusqueda.color) {
    return auto.color == datosBusqueda.color;
  }
  return auto;
}

function sinResultado() {
  const sinResultado = document.createElement("div");
  sinResultado.classList.add("alerta", "error");
  sinResultado.textContent = "No se han encontrado resultados";
  resultado.appendChild(sinResultado);
}
