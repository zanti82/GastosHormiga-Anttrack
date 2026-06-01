# AntTrack – Control de Gastos Hormiga

AntTrack es una aplicación desarrollada en React con Vite, diseñada para identificar, registrar y controlar los llamados gastos hormiga, que son los pequeños consumos diarios que parecen insignificantes, pero que al final del mes impactan fuertemente tus finanzas personales y de tu familia.

La app permite llevar un seguimiento organizado y visual de tus gastos pequeños, facilitando la toma de decisiones financieras más conscientes y acertadas, revisando mes a mes cuales son tus gastos mas importantes innecesarios.

## Objetivo

El objetivo de AntTrack es:

- Identificar patrones de consumo innecesarios
- Reducir fugas de dinero invisibles
- Crear hábitos financieros más saludables
- Tomar el control real de tu presupuesto

## Participantes

- Aurelio Velasquez
- Maricela Ochoa
- Julian Posada
- Santiago Ramirez
- Maria Fernanda Herrera

---

# 🚀 Landing Page — React Project

Una landing page moderna y responsiva construida con React, Tailwind CSS, Sweetalert2 y Google Fonts.

---

## 📁 Estructura del Proyecto

app-ant-track/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── ContactForm.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── DashboardPage.jsx
│   │   └── EstadisticasPage.jsx
│   ├── services/
│   │   └── api.js
│   ├── routes/
│   │   └── AppRouter.jsx
│   ├── helpers/
│   │   └── local-storage.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md

---

---

## 🛠️ Tecnologías Utilizadas

| Tecnología       | Uso                                               |
|------------------|---------------------------------------------------|
| React 18         | Biblioteca principal de UI                        |
| Tailwind CSS     | Estilos utilitarios y diseño responsivo           |
| SweetAlert2      | Alertas y confirmaciones interactivas             |
| Google Fonts     | Tipografía personalizada y estilo visual          |
| Web3Forms        | Recepción y gestión de mensajes del formulario    |
| Recharts         | Visualización de gastos en gráficas interactivas  |

---

## ✨ Componentes y Secciones

### 🔹 Navbar
Barra de navegación fija en la parte superior con enlaces de anclaje hacia las distintas secciones de la página. Responsiva con menú hamburguesa en móvil.

### 🔹 Header
Sección hero principal con título destacado, descripción y dos botones de llamada a la acción (comenzar gratis) y (Contacto).

### 🔹 Sección 1 (Ant Track)
Primera sección de contenido con información relevante sobre el producto o servicio que se ofrece.

### 🔹 Sección 2 (Así funciona)
Segunda sección con características, incluidas unas cards, en la que se explica el funcionamiento.

### 🔹 Sección 3 (Experiencias)
Tercera sección con 3 cards con información de clientes.

### 🔹 Formulario de Contacto
Formulario interactivo con los siguientes campos:
- **Nombre** — Requerido
- **Email** — Requerido, con validación de formato
- **Mensaje** — Requerido

El envío se gestiona a través de **Web3Forms**, que recibe los mensajes y los reenvía al correo configurado. Las alertas de éxito o error se muestran con **SweetAlert2**.

### 🔹 Footer
Pie de página con información de la empresa, links de navegación y redes sociales.

### 🔹 Dashboard de Gastos
Panel principal donde el usuario registra sus gastos hormiga y consulta el historial. Incluye un botón flotante en la esquina inferior derecha que lleva a la página de estadísticas.

### 🔹 Estadísticas con Recharts
Página dedicada a la visualización gráfica de los gastos registrados. Se accede desde el botón **"Ver estadísticas"** en el dashboard. Muestra tres tipos de gráficas:

- 📊 **Barras** — gastos totales por mes
- 🥧 **Torta** — distribución por categoría (alimentación, transporte, salud, etc.)
- 🥧 **Torta** — distribución por método de pago (tarjeta, efectivo, Nequi, etc.)

---

## 📦 Instalación

### 1. Clona el repositorio

```bash
git clone https://github.com/aurejr11/app-ant-track-FrontendII
cd tu-repositorio
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Instala Recharts

```bash
npm install recharts

```

### 4. Instala SweetAlert2

```bash
npm install sweetalert2
```

### 5. Inicia el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## ⚙️ Configuración

### Tailwind CSS

`tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

`src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### Google Fonts

La fuente se importa en el `<head>` del archivo `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
  rel="stylesheet"
/>
```

Y se aplica globalmente en `src/index.css`:

```css
body {
  font-family: 'Outfit', sans-serif;
}
```

---

### SweetAlert2

[SweetAlert2](https://sweetalert2.github.io/) es una librería de alertas y modales interactivos. Se usa en toda la aplicación para confirmar acciones, mostrar errores y notificar al usuario.

#### Instalación

```bash
npm install sweetalert2
```

#### Tipos de alerta utilizados

| Tipo        | Cuándo se usa                                      |
|-------------|----------------------------------------------------|
| `success`   | Gasto registrado, cuenta creada, login correcto    |
| `error`     | Error de conexión, datos incorrectos               |
| `question`  | Confirmación antes de cerrar sesión                |

#### Ejemplo de uso — alerta de éxito

```jsx
import Swal from "sweetalert2";

Swal.fire({
  icon: "success",
  title: "¡Gasto registrado!",
  text: "Tu gasto fue guardado correctamente.",
  confirmButtonColor: "#2563eb",
});
```

#### Ejemplo de uso — confirmación con dos opciones

```jsx
Swal.fire({
  title: "¿Cerrar sesión?",
  text: "Volverás a la página principal",
  icon: "question",
  showCancelButton: true,
  confirmButtonColor: "#dc2626",
  cancelButtonColor: "#6b7280",
  confirmButtonText: "Salir",
  cancelButtonText: "Quedarme"
}).then((result) => {
  if (result.isConfirmed) {
    // acción al confirmar
  }
});
```

#### Ejemplo de uso — alerta de error

```jsx
Swal.fire({
  icon: "error",
  title: "Sin conexión",
  text: "No se pudo conectar con el servidor.",
  confirmButtonColor: "#2563eb",
});
```

---

### Recharts

[Recharts](https://recharts.org/) es una librería de gráficas para React basada en SVG. Se usa en la página `EstadisticasPage.jsx` para mostrar los gastos de forma visual.

#### Instalación

```bash
npm install recharts
```

#### Componentes utilizados

| Componente            | Descripción                              |
|-----------------------|------------------------------------------|
| `BarChart` + `Bar`    | Gráfica de barras para gastos por mes    |
| `PieChart` + `Pie`    | Gráfica de torta para categorías y pagos |
| `Cell`                | Colorea cada porción de la torta         |
| `Tooltip`             | Muestra el valor al pasar el mouse       |
| `Legend`              | Leyenda con los nombres de cada sección  |
| `ResponsiveContainer` | Hace las gráficas adaptables al ancho    |

#### Ejemplo de uso — gráfica de barras

```jsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid,
         Tooltip, ResponsiveContainer } from "recharts";

const datos = [
  { name: "Enero",   total: 65000  },
  { name: "Febrero", total: 82000  },
  { name: "Marzo",   total: 110000 },
];

<ResponsiveContainer width="100%" height={300}>
  <BarChart data={datos}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="total" fill="#2563eb" radius={[4, 4, 0, 0]} />
  </BarChart>
</ResponsiveContainer>
```

#### Ejemplo de uso — gráfica de torta

```jsx
import { PieChart, Pie, Cell, Tooltip,
         Legend, ResponsiveContainer } from "recharts";

const datos = [
  { name: "Alimentación", value: 165000 },
  { name: "Transporte",   value: 107000 },
  { name: "Otros",        value: 58000  },
];

const COLORS = ["#2563eb", "#16a34a", "#dc2626"];

<ResponsiveContainer width="100%" height={280}>
  <PieChart>
    <Pie data={datos} dataKey="value" nameKey="name"
         outerRadius={100}
         label={({ name, percent }) =>
           `${name} ${(percent * 100).toFixed(0)}%`
         }
    >
      {datos.map((_, i) => (
        <Cell key={i} fill={COLORS[i % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
    <Legend />
  </PieChart>
</ResponsiveContainer>

---

## 📱 Responsividad

El proyecto utiliza el sistema de breakpoints de Tailwind CSS:

| Breakpoint | Prefijo | Ancho mínimo |
|------------|---------|--------------|
| Mobile     | (base)  | 0px          |
| Tablet     | `md:`   | 768px        |
| Desktop    | `lg:`   | 1024px       |
| XL         | `xl:`   | 1280px       |

---
