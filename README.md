# 📦 Dashboard de Productos – Inventario App

Sistema de gestión de productos con login, roles (admin/usuario), exportación de datos, filtros avanzados y visualización. Proyecto completo con frontend + backend + base de datos. 100% funcional en local.

## 🚀 Tecnologías utilizadas

- **Frontend:** Next.js 15 + TailwindCSS + TypeScript
- **Backend:** NestJS + Prisma + PostgreSQL
- **Autenticación:** JWT (Token basado en roles)
- **Exportación:** ExcelJS y PDFKit
- **UI Mejorada:** react-toastify, react-confirm-alert

## ✨ Funcionalidades

- 🔐 Login con token JWT
- 👤 Registro de usuarios con rol (USER o ADMIN)
- 🔒 Protección de rutas según rol
- 📋 CRUD completo de productos
- 🔎 Filtros por nombre, precio y stock
- 🔁 Paginación y ordenamiento por precio (sin recargar)
- 💡 Indicador visual de productos en oferta (precio < $20)
- 📤 Descarga de productos en PDF o Excel con filtros aplicados
- 📱 Diseño responsive
- ✅ Confirmaciones visuales y notificaciones no intrusivas

## 🧭 Estructura del proyecto

```
inventario-app/
│
├── frontend/         # Cliente Next.js
├── backend/          # Servidor NestJS
├── package.json      # Comando npm run dev para ambos
└── README.md
```

## 🛠 Cómo correr el proyecto localmente

### 🔹 Requisitos previos

- Tener [Node.js](https://nodejs.org/) (v18 o superior)
- Tener [PostgreSQL](https://www.postgresql.org/) instalado
- Tener `.env` en `backend/` con esta variable para desarrollo local:

```
DATABASE_URL="file:./dev.db"
```

### 🔸 Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/inventario-app.git
cd inventario-app
```

### 🔸 Instalar dependencias de todo el proyecto

#### Proyecto raíz:

```bash
npm install
```

Esto instalará los paquetes necesarios para usar `concurrently`.

#### Frontend:

```bash
cd frontend
npm install
```

#### Backend:

```bash
cd ../backend
npm install
cp .env.example .env
npx prisma db push
npx prisma generate
npx prisma migrate dev
```
Esto creará la base de datos `dev.db`

### 🔹 Iniciar el proyecto (frontend + backend)

Desde la raíz (`inventario-app/`), simplemente corre:

```bash
npm run dev
```

Esto ejecutará:

- `frontend` en: [http://localhost:3000](http://localhost:3000)
- `backend` en: [http://localhost:3001](http://localhost:3001)

## 📷 Capturas

> Proximamente.

## 🧪 Rutas protegidas

- Solo los usuarios con rol `ADMIN` pueden:
  - Crear productos
  - Editar productos
  - Eliminar productos
  - Exportar datos

- Los usuarios `USER` pueden:
  - Visualizar y filtrar productos
  - Acceder a productos en oferta

## 🧪 Variables de entorno

Consulta `/backend/.env.example` para ver las necesarias.

---

## 🛡 Seguridad

- Las variables sensibles (`JWT_SECRET`, `DATABASE_URL`) están en `.env`
- El frontend se conecta al backend usando `axios` con token en `localStorage`

---

## 🛠 Estado actual

✅ Totalmente funcional en local  
🚫 Despliegue en la nube no configurado

---

## 📄 Licencia

Proyecto de práctica desarrollado por Ricardo Natera.  
Puedes usarlo, mejorarlo o adaptarlo libremente con fines educativos o personales.
