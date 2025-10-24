import express from "express";
import cookieParser from "cookie-parser";
import path from 'node:path';
import cors from 'cors';
import apiRouter from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler/errorHandler.js";
import { __dirname } from "./utils/utils.js";
import { log } from "./utils/logger.js";
import { connectToMongo } from "./config/connections/mongo.js";
import './config/passportJWT/jwt.config.js';
const app = express();

const environment = process.env.NODE_ENV || 'development';
log(`Ejecutando en modo: ${environment}`);
let allowedOrigins;
if (environment === 'development') {
    allowedOrigins = 'http://localhost:5173';
} else {
    allowedOrigins = 'https://glamour-proyecto-backend.vercel.app';
}
if (environment === 'development') {
    // Configuración de CORS para el entorno de desarrollo
    app.use(cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true
    }));
}
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            return callback(new Error(`La política CORS no permite el acceso desde el origen: ${origin}`), false);
        }
        return callback(null, true);
    }
}
app.use(cors(corsOptions));

// Body Parsers y Cookies
app.use(express.json()); // Para manejar bodies JSON
app.use(express.urlencoded({ extended: true })); // Para manejar datos de formularios
app.use(cookieParser()); // Para manejar cookies (útil para autenticación/sesiones)

// Archivos Estáticos 
app.use(express.static(path.join(__dirname, '..', 'public')));

// Router Principal 
app.use('/api', apiRouter);

// Manejo de Errores 
app.use(errorHandler);

// Conexión a Base de Datos
connectToMongo();

export default app;
