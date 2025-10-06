import express from "express";
import cookieParser from "cookie-parser";
import path from 'node:path';
import cors from 'cors';
import apiRouter from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler/errorHandler.js";
import { __dirname } from "./utils/utils.js"; // Asume que este helper proporciona la ruta del directorio
import { connectToMongo } from "./config/connections/mongo.js";
import './config/passportJWT/jwt.config.js';
const app = express();

//CORS: Permite peticiones desde el frontend de Vercel
app.use(cors({
    origin: 'https://glamour-proyecto-backend.vercel.app/',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));

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
