import passport from "passport"; // Módulo principal de Passport para autenticación
import { ExtractJwt, Strategy } from "passport-jwt"; // Componentes necesarios para la estrategia JWT
import "dotenv/config"; // Carga las variables de entorno desde el archivo .env (necesario para JWT_SECRET)

// Función Verificadora del Token (verifyToken)
/*
* Esta es la función principal que Passport llama después de decodificar (desencriptar) 
* exitosamente el JWT. 
* * Argumentos:
* - jwt_payload: Es el objeto (payload) decodificado del token JWT.
* - done: Es la función callback que se usa para indicar a Passport si la autenticación
* fue exitosa o fallida (similar a 'next' en Express).
*/
const verifyToken = async (jwt_payload, done) => {
    if (!jwt_payload) {
        return done(null, false, { message: "Invalid token" });
    }
    // Si el payload existe, la autenticación es exitosa.
    // El primer argumento es el error (null si no hay error).
    // El segundo argumento (jwt_payload) es el 'user' que se adjuntará a req.user.
    return done(null, jwt_payload);
}

// Extractor de Cookie 
/*
* Esta es una función helper personalizada que indica a Passport dónde buscar 
* el JWT dentro de la petición HTTP (req).
* * En este caso, la estrategia buscará el token en las cookies.
*/
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) { token = req.cookies["token"]; }
    return token;
};

// Objeto de Configuración de la Estrategia
/*
* Objeto que contiene todos los parámetros necesarios para inicializar la estrategia Passport JWT.
*/
const strategyConfig = {
    // 1. jwtFromRequest: Le dice a la estrategia cómo obtener el JWT.
    //    Utiliza ExtractJwt.fromExtractors para permitir el uso de una o más funciones
    //    extractoras personalizadas (en este caso, solo cookieExtractor).
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),

    // 2. secretOrKey: La clave secreta (secreto) que se usó para firmar el JWT.
    //    Es crucial que coincida con la clave usada para generar el token.
    //    Se obtiene de las variables de entorno (process.env.JWT_SECRET) por seguridad.
    secretOrKey: process.env.JWT_SECRET,
};

// Inicialización de la Estrategia
passport.use('jwt-cookies', new Strategy(strategyConfig, verifyToken));