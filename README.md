# 💙❤️ FC Barcelona Fan Clubs Manager

Aplicación web desarrollada con **Angular 19**, **Node.js** y **MySQL** para gestionar Peñas oficiales del Fútbol Club Barcelona a nivel mundial. Permite visualizar, crear, editar y eliminar fanclubs, así como gestionar sus eventos, visualizar su localización en un mapa, consultar estadísticas y ver eventos en un calendario interactivo.

---

## 📄 Descripción

Este proyecto consiste en una SPA (Single Page Application) con un backend en Node.js y una base de datos MySQL llamada `fanclub_barcelona`, que contiene dos entidades principales:

- **fansclubs**: Representa las Peñas oficiales.
- **eventclubs**: Almacena los eventos organizados por las Peñas.

Las dos tablas están relacionadas por la clave foránea `fanclub_id`.

---

## ✨ Características principales

### **1️⃣ Listado de Peñas (`/penas-blaugrana`)**

- Muestra un CRUD completo:
  - **Nombre**
  - **Ubicación**
  - **Año de fundación**
  - **Número de miembros**
  - **Próximo evento**
- Acciones disponibles:
  - **Editar**
  - **Eliminar**
  - **Crear nueva peña**
  - **Descargar CSV**

> 🧩 Componente: `list-fanclubs`  
> 📋 Formulario reutilizado: `add-edit-fanclub`

---

### **2️⃣ Mapa de Peñas (`/mapa`)**

- Muestra las ubicaciones geográficas de las peñas en un **mapa interactivo con Leaflet**.
- Filtro por número de miembros.
- Opción para centrar el mapa según tu geolocalización actual.

---

### **3️⃣ Calendario de Eventos (`/calendario`)**

- Vista mensual de eventos con **FullCalendar**.
- Crear, editar y eliminar eventos.
- Modal dinámico para gestionar los eventos por estado.

> 🛠 Servicio utilizado: `modal-state.service.ts`

---

### **4️⃣ Gráficos y Estadísticas (`/graficos`)**

- **Gráfico de barras**: Número de peñas fundadas por año.
- **Gráfico tipo donut**: Cantidad de eventos mensuales organizados por las peñas.

> 📊 Librería: `chart.js`

---

## 🛠️ Arquitectura del Frontend

### 📁 Estructura de Componentes

- `home`: Página de bienvenida
- `header`: Navegación principal
- `map`: Mapa con ubicación de peñas
- `calendar`: Calendario de eventos
- `charts`: Estadísticas y gráficas
- `list-fanclubs`: Tabla CRUD de Peñas
- `add-edit-fanclub`: Formulario dinámico de alta y edición

### 📦 Módulos compartidos

- `shared/loader`: Componente de carga reutilizable
- `services`:
  - `fanclub.service.ts`
  - `eventfanclub.service.ts`
  - `modal-state.service.ts`
- `interfaces`:
  - `fanclub.ts`
  - `fanClubEvent.ts`

---

## 🧰 Tecnologías y Librerías

### Frontend

- ✅ **Angular 19** con Standalone Components
- 🎨 **Tailwind CSS 4** para diseño responsivo
- 📆 **FullCalendar** para eventos
- 🗺 **Leaflet** para mapas interactivos
- 📊 **Chart.js** para gráficas
- 🔔 **ngx-toastr** para notificaciones
- 📦 **RxJS**, `HttpClient`, `ReactiveForms`

### Backend

- 🔧 **Node.js + Express**
- 🐬 **MySQL** con base de datos `fanclub_barcelona`

---

## 📦 Requisitos

- Node.js (v18+)
- MySQL
- Angular CLI:

```bash
npm install -g @angular/cli
```

---

## 🛠️ Instalación

### Backend

1️⃣ Clonar el backend desde tu repositorio.

```bash
git clone https://github.com/Victorreca/fcbarcelona-fan-clubs
cd backend
```

2️⃣ Configurar `.env` con credenciales de MySQL y correr el servidor:

```bash
npm install
npm run dev
npx tsc --watch
```

---

### Frontend

1️⃣ Clonar el frontend:

```bash
cd frontend
```

2️⃣ Instalar dependencias:

```bash
npm install
```

3️⃣ Ejecutar la app:

```bash
ng serve -o
```

---

## 📊 Base de Datos

Base: `fanclub_barcelona`

### Tablas:

- `fansclubs`:
  - `id`, `name`, `location`, `latitude`, `longitude`, `membersCount`, `foundedYear`
- `eventclubs`:
  - `id`, `fanclub_id`, `name`, `date`, `time`, `location`

---

## 🤝 Contribuciones

1️⃣ Realiza un **fork** del repositorio.  
2️⃣ Crea una rama para tu feature:

```bash
git checkout -b mi-feature
```

3️⃣ Realiza tus cambios, commitea y haz un Pull Request.

---

### 📌 Autor

Desarrollado con ❤️ por **Víctor Redondo**  
Contacto: [vrviktor@gmail.com]
