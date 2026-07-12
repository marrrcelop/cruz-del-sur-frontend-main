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

Para desarrollo local:

export const API_URL = 'http://localhost:8080';

Para producción o despliegue en la nube, reemplazar por la URL real del backend:

export const API_URL = 'https://URL-DE-TU-BACKEND';

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

El frontend puede desplegarse en plataformas como:

- Vercel
- Netlify
- Firebase Hosting

Para desplegar:

1. Subir el proyecto a GitHub.
2. Conectar el repositorio con la plataforma elegida.
3. Configurar el comando de instalación:

npm install

4. Configurar el comando de build:

npm run build

5. Configurar la carpeta de salida generada dentro de `dist/`.
6. Cambiar `API_URL` por la URL pública del backend desplegado.

## URL del sistema desplegado

Frontend:

https://URL-DE-TU-FRONTEND

Backend:

https://URL-DE-TU-BACKEND

## Backend relacionado

Repositorio del backend:

https://github.com/marrrcelop/cruz-del-sur-backend.git

## Estado del proyecto

El frontend cuenta con integración con backend, autenticación JWT, rutas protegidas, validaciones y módulos principales para la gestión del sistema Cruz del Sur.