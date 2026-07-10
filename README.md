# Cruz del Sur - Frontend

Frontend del sistema **Cruz del Sur**, desarrollado con **Angular**.  
Esta aplicación permite gestionar clientes, viajes, reservas y usuarios mediante una interfaz web conectada a un backend desarrollado con Spring Boot.

## Descripción

El frontend forma parte de un sistema de gestión para una empresa de transporte. Desde la aplicación se puede iniciar sesión, acceder al menú principal y administrar la información principal del sistema según el rol del usuario autenticado.

La aplicación consume los servicios REST del backend y utiliza autenticación con token JWT para proteger las rutas internas.

## Tecnologías utilizadas

- Angular 21
- TypeScript
- HTML
- CSS
- Angular Router
- Angular Forms
- HttpClient
- JWT para autenticación
- Backend Spring Boot conectado por API REST

## Requisitos previos

- Node.js
- npm
- Angular CLI
- Backend ejecutándose en `http://localhost:8080`

## Instalación

```bash
git clone https://github.com/marrrcelop/cruz-del-sur-frontend.git
cd cruz-del-sur-frontend
npm install
Ejecución del proyecto
npm start
Luego abrir:
http://localhost:4200
Conexión con el backend
La URL base del backend está configurada en:
src/app/core/api.ts
Actualmente apunta a:
http://localhost:8080
Funcionalidades principales
Inicio de sesión
Permite ingresar al sistema mediante credenciales válidas.
Al iniciar sesión correctamente, se guarda el token JWT y se habilita el acceso al menú principal.
Menú principal
Desde el menú principal se puede acceder a:
Clientes
Viajes
Reservas
Usuarios
Gestión de clientes
Permite registrar, listar y eliminar clientes.
Validaciones principales:
Nombre obligatorio
Documento obligatorio
Correo obligatorio y con formato válido
Teléfono con formato válido
Gestión de viajes
Permite registrar, listar y eliminar viajes.
Validaciones principales:
Origen obligatorio
Destino obligatorio
Fecha obligatoria
Precio obligatorio y mayor a cero
El origen y destino no deben ser iguales
Gestión de reservas
Permite registrar, listar y eliminar reservas.
Validaciones principales:
Cliente obligatorio
Viaje obligatorio
Número de asiento obligatorio
El asiento debe ser un número válido
Gestión de usuarios
Permite listar, registrar y eliminar usuarios del sistema.
Esta sección está protegida por rol.
Validaciones principales:
Nombre obligatorio
Correo obligatorio y válido
Contraseña obligatoria
Rol obligatorio
Función por roles
El sistema diferencia el acceso según el rol del usuario autenticado.
La pestaña Usuarios es exclusiva para el rol:
ADMIN
Los usuarios que no tengan rol de administrador no pueden ingresar a la ruta de usuarios.
Si intentan acceder manualmente a la URL, el sistema los redirige al menú principal.
Rutas protegidas:
/home
/clientes
/viajes
/reservas
/usuarios
La ruta /usuarios requiere rol ADMIN.
Seguridad en el frontend
El frontend implementa:
Protección de rutas con authGuard
Validación de sesión activa
Control de acceso por roles
Interceptor para enviar el token JWT en las peticiones HTTP
Redirección automática al login si el usuario no está autenticado
Restricción del módulo Usuarios solo para administradores
Validaciones en tiempo real
Los formularios muestran errores antes de enviar los datos al backend.
Esto mejora la experiencia del usuario y evita enviar información incompleta o inválida.
Las validaciones del frontend complementan las validaciones del backend, pero no las reemplazan.
El backend sigue siendo el encargado principal de proteger la información y aplicar las reglas del sistema.
Estructura principal del proyecto
src/
└── app/
    ├── core/
    │   ├── api.ts
    │   ├── auth.ts
    │   ├── auth-guard.ts
    │   └── auth-interceptor.ts
    ├── login/
    ├── home/
    ├── clientes/
    ├── viajes/
    ├── reservas/
    ├── usuarios/
    ├── app.routes.ts
    └── app.config.ts
Scripts disponibles
Instalar dependencias:
npm install
Ejecutar en desarrollo:
npm start
Compilar el proyecto:
npm run build
Ejecutar pruebas:
npm test
Compilación
Para generar una versión lista para producción:
npm run build
Los archivos compilados se generan en la carpeta:
dist/
Repositorio del backend
https://github.com/marrrcelop/CruzDelSur-main
Errores comunes
Error de conexión con el backend
Verificar que el backend esté encendido en:
http://localhost:8080
Error de CORS
Verificar que el backend permita solicitudes desde:
http://localhost:4200
No se puede ingresar a Usuarios
La pestaña Usuarios solo está disponible para usuarios con rol:
ADMIN
Si el usuario tiene otro rol, será redirigido al menú principal.
Estado del proyecto
El frontend cuenta con:
Integración con backend Spring Boot
Login con JWT
Protección de rutas
Control de acceso por roles
Módulos de clientes, viajes, reservas y usuarios
Validaciones en tiempo real
Interfaz conectada a servicios REST
Restricción del módulo Usuarios solo para administradores