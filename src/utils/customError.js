export default class CustomError extends Error {   
    constructor(status = 500, message = 'Error interno del servidor', name = 'CustomError') {
        super(message);
        this.status = status;
        this.name = name;
        // Captura el stack trace desde donde se lanza el error,
        // omitiendo el constructor de esta clase para mayor claridad en logs
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}