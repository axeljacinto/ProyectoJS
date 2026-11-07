# 🚀 Guía de Instalación y Despliegue Local

Esta guía detalla paso a paso cómo clonar, configurar y levantar el proyecto **PCBuilder 3D** en cualquier equipo (Windows, macOS o Linux) desde cero.

---

## 📋 1. Prerrequisitos del Sistema

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas en tu máquina:

- **Node.js**: Versión 18.x, 20.x o superior ([Descargar Node.js](https://nodejs.org/)).
- **Git**: Sistema de control de versiones ([Descargar Git](https://git-scm.com/)).
- **Docker Desktop / Docker Compose**: Recomendado para levantar la base de datos PostgreSQL en un solo comando ([Descargar Docker Desktop](https://www.docker.com/products/docker-desktop/)).
  *(Si no dispones de Docker, puedes utilizar una instalación local de PostgreSQL).*

---

## 📥 2. Clonar el Proyecto

Abre una terminal y clona el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
cd Proyecto
```

---

## 🗄️ 3. Puesta en Marcha de la Base de Datos (PostgreSQL)

### Opción A: Mediante Docker (Recomendada)
El proyecto incluye un archivo `docker-compose.yml` preconfigurado en la carpeta `backend/`. El puerto exterior está configurado en el **`5433`** para evitar conflictos si ya tienes otra instancia de Postgres corriendo en el puerto 5432.

Desde la raíz del proyecto, ejecuta:

```bash
cd backend
docker compose up -d
```

Verifica que el contenedor esté corriendo:
```bash
docker ps
```
*(Deberías ver el contenedor `pc_catalog_db` en estado `Up`).*

### Opción B: Usando PostgreSQL Local (Sin Docker)
Si prefieres usar un PostgreSQL instalado en tu sistema operativo:
1. Abre tu gestor de PostgreSQL (`psql` o `pgAdmin`).
2. Crea la base de datos:
   ```sql
   CREATE DATABASE pc_catalog;
   ```
3. Crea el usuario y otórgale permisos (o utiliza tu usuario `postgres` predeterminado):
   ```sql
   CREATE USER catalog_user WITH ENCRYPTED PASSWORD 'catalog_password';
   GRANT ALL PRIVILEGES ON DATABASE pc_catalog TO catalog_user;
   ```

---

## ⚙️ 4. Configuración y Arranque del Backend

### 4.1. Configurar variables de entorno
Dentro de la carpeta `backend/`:

```bash
# En Linux / macOS:
cp .env.example .env

# En Windows (PowerShell / CMD):
copy .env.example .env
```

Revisa el archivo `.env`. Si utilizas Docker, la configuración por defecto ya está lista:
```env
PORT=3000
NODE_ENV=development
DATABASE_URL="postgresql://catalog_user:catalog_password@localhost:5433/pc_catalog?schema=public"
JWT_SECRET="clave_secreta_super_segura_para_firmar_jwt_de_ejemplo"
JWT_EXPIRES_IN="2h"
FRONTEND_URL="http://localhost:5173"
```
*(Nota: Si usas PostgreSQL local en el puerto estándar 5432, cambia `5433` por `5432` en `DATABASE_URL`).*

### 4.2. Instalar dependencias
```bash
npm install
```

### 4.3. Generar Cliente y Migraciones de Prisma
Aplica el esquema de la base de datos a PostgreSQL:
```bash
npx prisma migrate dev --name init
```

### 4.4. Cargar datos iniciales de prueba (Seed)
Ejecuta el script de seed para crear los usuarios de prueba, las 8 categorías oficiales de la escena 3D, las marcas y los componentes iniciales:
```bash
npm run seed
```

### 4.5. Iniciar el Servidor Backend
```bash
npm run dev
```
El servidor backend estará escuchando en **`http://localhost:3000`**.  
Puedes verificar su estado abriendo en el navegador o con curl:
```bash
curl http://localhost:3000/health
# Respuesta: {"ok":true,"status":"online",...}
```

---

## 💻 5. Configuración y Arranque del Frontend

Abre una **nueva pestaña o ventana de la terminal**:

```bash
cd Proyecto/frontend
```

### 5.1. Instalar dependencias
```bash
npm install
```

### 5.2. Iniciar el Servidor de Desarrollo
```bash
npm run dev
```

El frontend estará disponible de inmediato en:  
👉 **`http://localhost:5173`**

---

## 🔐 6. Cuentas de Acceso Precargadas para Pruebas

El script de `seed.js` crea 3 usuarios con diferentes niveles de autorización para probar la seguridad y la matriz de permisos:

| Rol | Correo Electrónico | Contraseña | Permisos Destacados |
| :--- | :--- | :--- | :--- |
| **Administrador** | `admin@pccatalog.com` | `Password123!` | Acceso total: CRUD componentes, gestión de roles de usuario, categorías y marcas |
| **Vendedor** | `vendedor@pccatalog.com` | `Password123!` | Crear y editar componentes en el catálogo |
| **Cliente** | `cliente@pccatalog.com` | `Password123!` | Exploración del catálogo, filtros y visualización 3D |

---

## 🧪 7. Ejecutar Pruebas Unitarias de POO

El proyecto cuenta con pruebas automáticas con **Vitest** para comprobar el encapsulamiento de atributos privados con `#`, las clases abstractas y el polimorfismo:

Desde la carpeta `backend/`:
```bash
npm test
```

---

## 🔧 8. Solución de Problemas Frecuentes (Troubleshooting)

- **Error: `bind: address already in use: 5432` o `5433`:**  
  Hay otro servicio ocupando ese puerto. Edita el puerto en `backend/docker-compose.yml` (ej. `"5434:5432"`) y actualiza `DATABASE_URL` en `backend/.env`.
- **Error: `P1001: Can't reach database server`:**  
  Asegúrate de que Docker esté corriendo (`docker ps`). Si se detuvo, levántalo con `cd backend && docker compose up -d`.
- **CORS bloqueado:**  
  Verifica que `FRONTEND_URL="http://localhost:5173"` en `backend/.env` coincida exactamente con la URL donde Vite levantó el frontend.
- **La sesión no persiste al recargar:**  
  Asegúrate de no bloquear cookies de terceros en el navegador para `localhost`, ya que el JWT se almacena de forma segura en cookies `httpOnly`.

