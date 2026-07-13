# Cruz del Sur - Frontend

Frontend del sistema **Cruz del Sur**, desarrollado con **Angular**.

## Descripción

Esta aplicación permite gestionar clientes, viajes, reservas y usuarios mediante una interfaz web conectada a un backend desarrollado con Spring Boot.

El sistema cuenta con inicio de sesión, rutas protegidas, validaciones en formularios y consumo de servicios REST.

## Tecnologías utilizadas

- Angular 21
- TypeScript
- Angular Router
- Reactive Forms
- HttpClient
- JWT
- CSS

## Funcionalidades principales

- Inicio de sesión con JWT.
- Panel principal del sistema.
- Gestión de clientes.
- Gestión de viajes.
- Gestión de reservas.
- Gestión de usuarios.
- Validaciones en formularios.
- Rutas protegidas.
- Control de acceso por rol.
- Consumo de API REST del backend.

## Requisitos previos

- Node.js
- npm
- Angular CLI
- Backend ejecutándose en `http://localhost:8080`

## Instalación

git clone https://github.com/marrrcelop/cruz-del-sur-frontend-main.git
cd cruz-del-sur-frontend-main
npm install

## Ejecución local

npm start

Luego abrir:

http://localhost:4200

## Configuración del backend

La URL base del backend se encuentra en:

src/app/core/api.ts

Para desarrollo en nube:
export const API_URL = 'https://cruz-del-sur-backend-production.up.railway.app';

## Rutas del sistema

- `/login`: inicio de sesión.
- `/home`: panel principal.
- `/clientes`: módulo de clientes.
- `/viajes`: módulo de viajes.
- `/reservas`: módulo de reservas.
- `/usuarios`: módulo de usuarios.

## Seguridad en frontend

El frontend implementa:

- Protección de rutas con `authGuard`.
- Envío automático del token JWT con `authInterceptor`.
- Validación de sesión activa.
- Redirección al login si el usuario no está autenticado.
- Restricción del módulo usuarios según rol.

## Build de producción

npm run build

Los archivos compilados se generan en la carpeta:

dist/

## Despliegue

El frontend está desplegado en Netlify:

https://stately-chaja-5a3d6b.netlify.app

Backend conectado:

https://cruz-del-sur-backend-production.up.railway.app

La aplicación fue compilada con:

```bash
npm run build

## URL del sistema desplegado

Frontend:

https://stately-chaja-5a3d6b.netlify.app

Backend:

https://cruz-del-sur-backend-production.up.railway.app

## Backend relacionado

Repositorio del backend:

https://github.com/marrrcelop/cruz-del-sur-backend.git

## Estado del proyecto

El frontend cuenta con integración con backend, autenticación JWT, rutas protegidas, validaciones y módulos principales para la gestión del sistema Cruz del Sur.
```md
## Manual de uso

1. Ingresar al sistema desde:

https://stately-chaja-5a3d6b.netlify.app

2. Iniciar sesión con un usuario registrado.

3. Desde el panel principal se puede acceder a:

- Clientes: registrar, listar y eliminar clientes.
- Viajes: registrar, listar y eliminar viajes.
- Reservas: registrar, listar y eliminar reservas.
- Usuarios: gestionar usuarios administrativos.

4. Al iniciar sesión, el frontend guarda el token JWT.

5. El token se envía automáticamente al backend mediante el interceptor HTTP.

6. Si el usuario no está autenticado, las rutas protegidas redirigen al login.