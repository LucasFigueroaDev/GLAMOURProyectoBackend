# Tienda de Ropa - Backend con Node.js y Express

Este proyecto es un sistema de backend para una tienda de ropa desarrollado con Node.js, Express y Mongoose para la gestión de la base de datos. Incluye funcionalidades como la gestión de productos Y carrito de compras. Además, se utiliza Handlebars para renderizar las vistas, Multer para la subida de archivos, y SweetAlert2 para notificaciones interactivas en el frontend.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript.
- **Express**: Framework para construir aplicaciones web y APIs.
- **MongoDb**: Base de datos NoSQL
- **Mongoose**: Librería para modelar objetos MongoDB.
- **Axios**: Cliente HTTP para realizar peticiones al backend.
- **Dotenv**: Manejo de variables de entorno.
- **Handlebars**: Motor de plantillas para renderizar vistas.
- **Multer**: Middleware para la subida de archivos.
- **SweetAlert2**: Librería para alertas y notificaciones interactivas.

## Requisitos Previos

- Node.js instalado (versión 14.x o superior).
- MongoDB instalado y corriendo.
- NPM o Yarn para la gestión de dependencias.

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/LucasFigueroaDev/ProyectoBackEnd.git
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno:

   ```env
   MONGO_KEY=mongodb:
   ```

4. Inicia el servidor:

   ```bash
   npm run dev
   ```

   El servidor estará disponible en `http://localhost:8080`.

## Estructura del Proyecto

```
ProyectoBackEnd/
│
├── public/                # Archivos estáticos (CSS, JS, imágenes)
│   ├── css/               # Hojas de estilo CSS
│   ├── img/               # Imágenes utilizadas en el proyecto
│   └── js/                # Archivos JavaScript del frontend
│
├── src/                   # Código fuente del proyecto
│   ├── connections/       # Configuración de conexiones (MongoDB)
│   ├── Dao/               # Data Access Object (Patrón de acceso a datos)
│   ├── models/            # Modelos de la base de datos (Mongoose)
│   ├── routes/            # Rutas de la API (Express)
│   ├── utils/             # Utilidades y funciones auxiliares
│   ├── views/             # Vistas del proyecto (Handlebars)
│   └── index.js           # Punto de entrada de la aplicación
│
├── .env                   # Variables de entorno (configuración sensible)
├── .gitignore             # Archivos y carpetas ignorados por Git
├── package.json           # Dependencias y scripts del proyecto
└── README.md              # Documentación del proyecto
```

## Uso

### Gestión de Productos

- **Crear un producto**: Realiza una petición POST a `/api/products` con los datos del producto.
- **Obtener productos**: Realiza una petición GET a `/api/products`.
- **Actualizar un producto**: Realiza una petición PUT a `/api/products/:pid`.
- **Eliminar un producto**: Realiza una petición DELETE a `/api/products/:pid`.

### Carrito de Compras

- **Agregar producto al carrito**: Realiza una petición POST a `/api/cart/:cid` con el ID del producto.
- **Ver carrito**: Realiza una petición GET a `/api/cart/.cid`.
- **Eliminar producto del carrito**: Realiza una petición DELETE a `/api/cart/:cid/product/:pid`.

## Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactarme:

- **Nombre**: Figueroa Lucas
- **Email**: lucasafigueroa93@gmail.com
- **GitHub**: https://github.com/LucasFigueroaDev
```
