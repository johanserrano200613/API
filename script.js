// =============================================
//  COVID API — script.js
//  API base: https://disease.sh/v3/covid-19
// =============================================

const BASE_URL = "https://disease.sh/v3/covid-19";

// ---- Utilidades ----

// Formatea números grandes con puntos (ej: 1.234.567)
function formatearNumero(num) {
  if (num === undefined || num === null) return "N/D";
  return num.toLocaleString("es-CO");
}

// Muestra estado de carga en un div
function mostrarCargando(idDiv) {
  const div = document.getElementById(idDiv);
  div.className = "resultado";
  div.innerHTML = `<p class="cargando">⏳ Consultando API...</p>`;
}

// Muestra error en un div
function mostrarError(idDiv, mensaje) {
  const div = document.getElementById(idDiv);
  div.className = "resultado error";
  div.innerHTML = `<p style="color: var(--rojo);">❌ Error: ${mensaje}</p>`;
}


// =============================================
//  ENDPOINT 1 — Datos Globales
//  GET /all
// =============================================
async function obtenerGlobal() {
  mostrarCargando("resultado-global");

  try {
    const respuesta = await fetch(`${BASE_URL}/all`);

    if (!respuesta.ok) {
      throw new Error(`HTTP ${respuesta.status}`);
    }

    const datos = await respuesta.json();

    const div = document.getElementById("resultado-global");
    div.className = "resultado activo";
    div.innerHTML = `
      <div class="stats-grid">
        <div class="stat-box">
          <div class="etiqueta">Casos totales</div>
          <div class="valor casos">${formatearNumero(datos.cases)}</div>
        </div>
        <div class="stat-box">
          <div class="etiqueta">Muertes</div>
          <div class="valor muertes">${formatearNumero(datos.deaths)}</div>
        </div>
        <div class="stat-box">
          <div class="etiqueta">Activos</div>
          <div class="valor activos">${formatearNumero(datos.active)}</div>
        </div>
        <div class="stat-box">
          <div class="etiqueta">Recuperados</div>
          <div class="valor rec">${formatearNumero(datos.recovered)}</div>
        </div>
        <div class="stat-box">
          <div class="etiqueta">Pruebas</div>
          <div class="valor pruebas">${formatearNumero(datos.tests)}</div>
        </div>
      </div>
    `;

  } catch (error) {
    mostrarError("resultado-global", error.message);
  }
}


// =============================================
//  ENDPOINT 2 — Datos por País
//  GET /countries/{country}
// =============================================
async function obtenerPais() {
  const input = document.getElementById("input-pais");
  const pais = input.value.trim();

  if (!pais) {
    mostrarError("resultado-pais", "Debes escribir un país.");
    return;
  }

  mostrarCargando("resultado-pais");

  try {
    const respuesta = await fetch(`${BASE_URL}/countries/${pais}`);

    if (!respuesta.ok) {
      throw new Error(`País no encontrado (HTTP ${respuesta.status})`);
    }

    const datos = await respuesta.json();

    const div = document.getElementById("resultado-pais");
    div.className = "resultado activo";
    div.innerHTML = `
      <p class="nombre-pais">📍 ${datos.country}</p>
      <div class="stats-grid">
        <div class="stat-box">
          <div class="etiqueta">Casos totales</div>
          <div class="valor casos">${formatearNumero(datos.cases)}</div>
        </div>
        <div class="stat-box">
          <div class="etiqueta">Hoy</div>
          <div class="valor casos">+${formatearNumero(datos.todayCases)}</div>
        </div>
        <div class="stat-box">
          <div class="etiqueta">Muertes</div>
          <div class="valor muertes">${formatearNumero(datos.deaths)}</div>
        </div>
        <div class="stat-box">
          <div class="etiqueta">Muertes hoy</div>
          <div class="valor muertes">+${formatearNumero(datos.todayDeaths)}</div>
        </div>
        <div class="stat-box">
          <div class="etiqueta">Recuperados</div>
          <div class="valor rec">${formatearNumero(datos.recovered)}</div>
        </div>
        <div class="stat-box">
          <div class="etiqueta">Activos</div>
          <div class="valor activos">${formatearNumero(datos.active)}</div>
        </div>
      </div>
    `;

  } catch (error) {
    mostrarError("resultado-pais", error.message);
  }
}

// Permitir buscar con Enter en el input
document.getElementById("input-pais").addEventListener("keydown", function (e) {
  if (e.key === "Enter") obtenerPais();
});


// =============================================
//  ENDPOINT 3 — Top 5 Países por Casos
//  GET /countries?sort=cases
// =============================================
async function obtenerTop() {
  mostrarCargando("resultado-top");

  try {
    const respuesta = await fetch(`${BASE_URL}/countries?sort=cases`);

    if (!respuesta.ok) {
      throw new Error(`HTTP ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    const top5 = datos.slice(0, 5); // Solo los primeros 5

    let filas = "";
    top5.forEach((pais, index) => {
      filas += `
        <tr>
          <td class="rank">#${index + 1}</td>
          <td>${pais.country}</td>
          <td style="color: var(--amarillo)">${formatearNumero(pais.cases)}</td>
          <td style="color: var(--rojo)">${formatearNumero(pais.deaths)}</td>
          <td style="color: var(--verde)">${formatearNumero(pais.recovered)}</td>
        </tr>
      `;
    });

    const div = document.getElementById("resultado-top");
    div.className = "resultado activo";
    div.innerHTML = `
      <table class="tabla-top">
        <thead>
          <tr>
            <th>#</th>
            <th>País</th>
            <th>Casos</th>
            <th>Muertes</th>
            <th>Recuperados</th>
          </tr>
        </thead>
        <tbody>
          ${filas}
        </tbody>
      </table>
    `;

  } catch (error) {
    mostrarError("resultado-top", error.message);
  }
}
