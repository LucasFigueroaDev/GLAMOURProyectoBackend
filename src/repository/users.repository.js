import { userDao } from "../dao/user.dao.js";

class userRepository {
    constructor(dao) {
        this.dao = dao;
    }
    
    getAllUsers = async () => {
        return await this.dao.getAll();
    }

    getUserById = async (id) => {
        return await this.dao.getUserById(id);
    }

    getUserByEmail = async (email) => {
        return await this.dao.getByEmail(email);
    }

    getUserByUsername = async (username) => {
        return await this.dao.getByUsername(username);
    }

    createUser = async (user) => {
        return await this.dao.create(user);
    }

    updateUser = async (id, user) => {
        return await this.dao.update(id, user);
    }

    userDelete = async (id) => {
        return await this.dao.delete(id);
    }

    userDeleteByEmail = async (email) => {
        return await this.dao.deleteByEmail(email);
    }

}

export const usersRepository = new userRepository(userDao);