import app from "./app.js";
import 'dotenv/config'; // Para cargar tus variables .env en desarrollo

// Define el puerto para desarrollo
const PORT = process.env.PORT || 3000;

// En desarrollo, la aplicación debe escuchar en un puerto
app.listen(PORT, () => {
    console.log(`[DEV] Servidor escuchando en http://localhost:${PORT}`);
});

// Este archivo NO se sube a Vercel ni se usa para el deployment.
// Solo es para iniciar el servidor localmente.
