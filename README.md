******* PalmaClo – Express + MySQL (Login + Roles + CRUD de Productos)******

Este proyecto implementa un backend con Express.js y MySQL integrado a una web desarrollada en HTML, CSS y JavaScript, cumpliendo con los siguientes requerimientos:

Login de usuarios

Manejo de sesión con JWT

2 roles de usuario (user y admin)

CRUD completo de productos (solo para administrador)
_________________________________________________
Requisitos

Node.js 18+

MySQL (XAMPP / WAMP / MySQL Server / phpMyAdmin)
__________________________________________________

***** 1) Crear base de datos y tablas *****

Abrir MySQL (Workbench o phpMyAdmin) y ejecutar el script correspondiente:

source sql/schema.sql;

Este script crea la base de datos palmaclo y las tablas necesarias para usuarios y productos.
____________________________________________________

***** 2) Configurar variables de entorno ********

Copiar el archivo de ejemplo y completar los datos necesarios:

cp .env.example .env

Variables requeridas:

DB_HOST

DB_USER

DB_PASSWORD

DB_NAME

JWT_SECRET
____________________________________________________
***** 3) Instalar dependencias ******

Desde la carpeta raíz del proyecto ejecutar:

npm install
____________________________________________________
****** 4) Levantar el proyecto ******

Modo desarrollo:

npm run dev

Modo normal:

npm start

Accesos desde el navegador:

Home: http://localhost:3000/

Login: http://localhost:3000/login

Admin (solo admin): http://localhost:3000/admin.html
__________________________________________________
****** 5) Crear un usuario administrador ******

Iniciar sesión con un usuario existente.

En MySQL, cambiar su rol a admin:

USE palmaclo;
UPDATE users SET rol = 'admin' WHERE email = 'TU_EMAIL@MAIL.COM';

Volver a iniciar sesión y acceder al panel de administración.
__________________________________________________

Funcionalidades principales
Usuario común
Inicia sesión
Visualiza productos
Navega por la tienda
Administrador
Accede al panel de administración
Agrega productos
Edita productos
Elimina productos
Las opciones de administración solo se muestran si el usuario tiene rol admin.
____________________________________________________

Endpoints (API)
Autenticación

POST /api/auth/login

POST /api/auth/logout

GET /api/auth/me

Productos

GET /api/productos

POST /api/productos (solo admin)

PUT /api/productos/:id (solo admin)

DELETE /api/productos/:id (solo admin)
____________________________________________________
Notas importantes:

La sesión se maneja mediante JWT almacenado en cookies HTTP-only.

El control de seguridad se realiza en el backend.

Si un usuario sin rol administrador intenta acceder a operaciones CRUD, la API responde con 403 – No autorizado.

El frontend solo muestra botones de edición y eliminación si el usuario es administrador.
_____________________________________________________
Contexto académico
Proyecto desarrollado con fines educativos, aplicando conceptos de:

Desarrollo web full stack

Arquitectura cliente-servidor

Autenticación y autorización

Consumo de API REST

Manipulación dinámica del DOM
