# 🌐 REST API — COVID-19

Aplicación web de práctica para consumir una **API REST pública** con JavaScript y presentar información de forma dinámica. El proyecto utiliza `fetch`, `async/await`, manejo de estados de carga/error y renderizado de resultados en el DOM.

> Proyecto orientado a demostrar consumo de APIs desde frontend y manejo de respuestas HTTP.

## 🚀 Funcionalidades

La aplicación consulta tres endpoints principales de `disease.sh`:

1. **Datos globales** de COVID-19.
2. **Consulta por país** ingresado por el usuario.
3. **Top 5 de países** ordenados por número de casos.

## 🛠️ Stack

- HTML5
- CSS3
- JavaScript
- Fetch API
- REST
- JSON

## 🔌 Endpoints utilizados

```text
GET https://disease.sh/v3/covid-19/all
GET https://disease.sh/v3/covid-19/countries/{pais}
GET https://disease.sh/v3/covid-19/countries?sort=cases
```

## 🧩 Flujo

```text
Interacción del usuario
        │
        ▼
JavaScript / Fetch API
        │
        ▼
HTTP GET → disease.sh
        │
        ▼
Respuesta JSON
        │
        ├── validación HTTP
        ├── manejo de errores
        └── transformación de datos
        │
        ▼
Render dinámico en el DOM
```

## ✅ Conceptos aplicados

- Peticiones HTTP asíncronas.
- Uso de `fetch()` y `async/await`.
- Validación de `response.ok`.
- Manejo de excepciones con `try/catch`.
- Consumo y lectura de JSON.
- Estados de carga y error.
- Formateo de números con localización `es-CO`.
- Manipulación del DOM.
- Búsqueda mediante input y evento `keydown`.
- Generación dinámica de tablas y tarjetas.

## 📁 Estructura

```text
API/
├── index.html
├── style.css
├── script.js
└── README.md
```

## ▶️ Cómo probarlo

1. Clona el repositorio.
2. Abre la carpeta en Visual Studio Code.
3. Ejecuta un servidor HTTP local, por ejemplo:

```bash
python -m http.server 5500
```

4. Abre `http://localhost:5500`.
5. Prueba las consultas globales, por país y el ranking.

## 🎯 Qué demuestra este proyecto

Este repositorio muestra fundamentos de integración con servicios externos desde JavaScript: construcción de peticiones, lectura de respuestas, manejo de fallos y transformación de información para la interfaz.

---

**Autor:** Johan Serrano  
[GitHub](https://github.com/johanserrano200613) · [Email](mailto:johanserrano200613@gmail.com)
