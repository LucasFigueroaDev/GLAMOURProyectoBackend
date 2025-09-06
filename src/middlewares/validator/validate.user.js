import validator from 'validator';
import CustomError from '../../utils/customError.js';

export const validateUser = (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const options = {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1};
        if (!username || !email || !password) throw new CustomError(400, 'Faltan datos');
        if (!validator.isStrongPassword(password, options)) throw new CustomError(400, 'La contraseña no es segura');
        if (!validator.isEmail(email)) throw new CustomError(400, 'El email no es valido');
        next();
    } catch (error) {
        next(error);
    }
}