# 🖥️ Gestor de Catálogo de Componentes de PC (PC Builder & Catalog)

Proyecto de Gestión de Catálogo de Componentes de Hardware desarrollado con arquitectura modular en capas, Programación Orientada a Objetos (POO) estricta en JavaScript (ES Modules), base de datos relacional PostgreSQL con Prisma ORM, autenticación robusta mediante JWT en cookies `httpOnly`, y un frontend moderno en React + Vite con un modelo 3D interactivo en Three.js / React Three Fiber.

---

## 👥 División del Equipo y Asignación de Tareas

Para garantizar un desarrollo ágil y sin colisiones entre los 3 integrantes, el proyecto se encuentra dividido en los siguientes roles y documentos de trabajo:

| Integrante | Rol Principal | Documento de Tareas |
| :--- | :--- | :--- |
| **Integrante 1** | **Backend Core, Seguridad, Auth y Usuarios** | [TAREAS_INTEGRANTE_1_BACKEND_CORE.md](file:///home/v4/Usfx/SegundoSemestre/ProgramacionIntermedia/Proyecto/docs/TAREAS_INTEGRANTE_1_BACKEND_CORE.md) |
| **Integrante 2** | **Backend Dominio, Catálogo, POO, Seed y Tests** | [TAREAS_INTEGRANTE_2_BACKEND_DOMINIO.md](file:///home/v4/Usfx/SegundoSemestre/ProgramacionIntermedia/Proyecto/docs/TAREAS_INTEGRANTE_2_BACKEND_DOMINIO.md) |
| **Integrante 3** | **Frontend SPA, UI/UX, Escena 3D y Formularios** | [TAREAS_INTEGRANTE_3_FRONTEND_3D.md](file:///home/v4/Usfx/SegundoSemestre/ProgramacionIntermedia/Proyecto/docs/TAREAS_INTEGRANTE_3_FRONTEND_3D.md) |

Consulte también:
- [Guía de Instalación Rápida para Otros Equipos](file:///home/v4/Usfx/SegundoSemestre/ProgramacionIntermedia/Proyecto/GUIA_INSTALACION.md)
- [Documentación Exhaustiva de Clases y POO (Backend & Frontend)](file:///home/v4/Usfx/SegundoSemestre/ProgramacionIntermedia/Proyecto/docs/DOCUMENTACION_CLASES_POO.md)
- [Convenciones de Trabajo y Contrato de API](file:///home/v4/Usfx/SegundoSemestre/ProgramacionIntermedia/Proyecto/docs/CONVENCIONES_Y_CONTRATO_API.md)

---

## 🏗️ Arquitectura del Sistema

### Backend
- **Flujo en capas:** `Ruta` ➔ `Middleware (Auth / Permisos / Validación)` ➔ `Controlador` ➔ `Servicio` ➔ `Repositorio (con Hidratación)` ➔ `Base de Datos (Prisma)`
- **POO en Dominio:** 
  - Clases abstractas simuladas (`new.target`).
  - Atributos estrictamente privados con `#`.
  - Polimorfismo mediante métodos de negocio (`obtenerPermisos()`, `obtenerEspecificaciones()`, `esCompatibleCon()`).
  - Fábricas (`UsuarioFactory`, `ComponenteFactory`) para desacoplar la creación de instancias de la persistencia.

### Frontend
- **Stack:** React 18+ con Vite, Tailwind CSS y Lucide Icons.
- **Gestión de Datos:** TanStack Query para caché, sincronización y estados de carga.
- **Formularios Dinámicos:** React Hook Form + Zod con esquemas adaptativos según el tipo de componente.
- **Diferenciador 3D:** Three.js + React Three Fiber + Drei. Permite explorar una PC armada, separarla en piezas interactivas y filtrar el catálogo al hacer clic en cada componente.

---

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js v18+ instalado.
- Docker y Docker Compose (opcional, para levantar PostgreSQL en un comando).

### 1. Clonar y configurar variables de entorno
```bash
git clone <URL_DEL_REPOSITORIO>
cd Proyecto
```

Configurar backend:
```bash
cp backend/.env.example backend/.env
```

### 2. Levantar Base de Datos (Docker)
```bash
cd backend
docker compose up -d
```

### 3. Instalar y correr Backend
```bash
cd backend
npm install
npx prisma migrate dev --name init
npm run seed
npm run dev
```

### 4. Instalar y correr Frontend
```bash
cd ../frontend
npm install
npm run dev
```
Acceder en el navegador a `http://localhost:5173`.

