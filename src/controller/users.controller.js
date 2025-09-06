import { userService } from "../services/users.service.js";
import { createResponse } from "../utils/createResponse.js";

class usersController {
    constructor(service) {
        this.service = service
    }

    getAllUsers = async (req, res, next) => {
        try {
            const users = await this.service.getAllUsers();
            createResponse(res, 200, { status: "Exito al obtener todos los usuarios", payload: users });
        } catch (error) {
            next(error);
        }
    }

    getUserById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await this.service.getUserById(id);
            createResponse(res, 200, { status: "Exito al obtener el usuario por id", payload: user });
        } catch (error) {
            next(error);
        }
    }

    getUserByEmail = async (req, res, next) => {
        try {
            const { email } = req.params;
            const user = await this.service.getUserByEmail(email);
            createResponse(res, 200, { status: "Exito al obtener el usuario por email", payload: user });
        } catch (error) {
            next(error);
        }
    }

    getUserByUsername = async (req, res, next) => {
        try {
            const { username } = req.params;
            const user = await this.service.getUserByUsername(username);
            createResponse(res, 200, { status: "Exito al obtener el usuario por username", payload: user });
        } catch (error) {
            next(error);
        }
    }

    createUser = async (req, res, next) => {
        try {
            const user = await this.service.createUser(req.body);
            createResponse(res, 200, { status: "Exito al crear el usuario", payload: user });
        } catch (error) {
            next(error);
        }
    }

    updateUser = async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await this.service.updateUser(id, req.body);
            createResponse(res, 200, { status: "Exito al actualizar el usuario", payload: user });
        } catch (error) {
            next(error);
        }
    }

    deleteUser = async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await this.service.deleteUser(id);
            createResponse(res, 200, { status: "Exito al borrar el usuario", payload: user });
        } catch (error) {
            next(error);
        }
    }

    login = async (req, res, next) => {
        try {
            const userLogin = req.body;
            const token = await this.service.userLogin(userLogin);
            res.cookie('token', token, { httpOnly: true })
            createResponse(res, 200, { status: "Usuario logueado con exito", token: token });
        } catch (error) {
            next(error);
        }
    }
}

export const usersController = new usersController(userService);