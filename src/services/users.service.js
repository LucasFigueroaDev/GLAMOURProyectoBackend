import CustomError from "../utils/customError.js";
import userDto from "../dto/user.dto.js"
import jwt from "jsonwebtoken";
import { usersRepository } from "../repository/users.repository.js";
import { createHash, passwordValidation } from "../utils/createHash.js";
import "dotenv/config";

class UsersService {
    constructor(repository) {
        this.repository = repository
    }

    generateToken = (user, time = '1h') => {
        const payload = {
            id: user._id,
            username: user.username,
            role: user.role
        }
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: time });
    }

    getAllUsers = async () => {
        try {
            const response = await this.repository.getAllUsers();
            if (!response) throw new CustomError(404, 'Error al obtener los usuarios');
            return response;
        } catch (error) {
            throw error;
        }
    }

    getUserById = async (id) => {
        try {
            const response = await this.repository.getUserById(id);
            if (!response) throw new CustomError(404, 'Error al obtener el usuario por id');
            return userDto.getUserTokenFrom(response);
        } catch (error) {
            throw error;
        }
    }

    getUserByEmail = async (email) => {
        try {
            const response = await this.repository.getUserByEmail(email);
            return userDto.getUserTokenFrom(response);
        } catch (error) {
            throw error;
        }
    }


    createUser = async (user) => {
        try {
            const { email, password } = user;
            if(!email || !password) throw new CustomError(400, 'Faltan datos');
            const existEmail = await this.repository.getUserByEmail(email);
            if (existEmail) throw new CustomError(400, 'El email ya esta en uso');
            const hashedPassword = await createHash(password);
            user.password = hashedPassword;
            const response = await this.repository.createUser(user);
            if (!response) throw new CustomError(400, 'Error al crear el usuario');
            return userDto.getUserTokenFrom(response);
        } catch (error) {
            throw error;
        }
    }

    updateUser = async (id, body) => {
        try {
            const { email } = body;
            const user = await this.getUserById(id);
            if (user.email !== email) {
                const existEmail = await this.repository.getUserByEmail(email);
                if (existEmail) throw new CustomError(404, 'El email ya esta en uso');
            }
            const response = await this.repository.updateUser(id, body);
            if (!response) throw new CustomError(400, 'Error al actualizar el usuario');
            return userDto.getUserTokenFrom(response);
        } catch (error) {
            throw error;
        }
    }

    userDelete = async (id) => {
        try {
            const user = await this.getUserById(id);
            const response = await this.repository.userDelete(id);
            if (!response) throw new CustomError(404, 'Error al eliminar el usuario');
            return response;
        } catch (error) {
            throw error;
        }
    }

    deleteUserByEmail = async (email) => {
        try {
            const user = await this.getUserByEmail(email);
            if (!user) throw new CustomError(404, 'El usuario no existe');
            const response = await this.repository.deleteUserByEmail(email);
            if (!response) throw new CustomError(404, 'Error al eliminar el usuario');
            return response;
        } catch (error) {
            throw error;
        }
    }

    userLogin = async (user) => {
        try {
            const { email, password } = user;
            const existUser = await this.repository.getUserByEmail(email);
            if (!existUser) throw new CustomError(400, 'El usuario no existe');
            const isValidPassword = await passwordValidation(password, existUser.password);
            if (!isValidPassword) throw new CustomError(400, 'La contraseña es incorrecta');
            return this.generateToken(existUser);
        } catch (error) {
            throw error;
        }
    }
}

export const usersService = new UsersService(usersRepository);