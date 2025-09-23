import { userModel } from '../models/user.model.js';
import BaseDao from './base.dao.js';
class UserDao extends BaseDao {
    constructor(model) {
        super(model);
    }

    getByEmail = async (email) => {
        return await this.model.findOne({ email });
    }

    getUserById = async (id) => {
        return await this.model.findById(id).populate('cart');
    }

    deleteByEmail = async (email) => {
        return await this.model.findOneAndDelete({ email });
    }

    getByUsername = async (username) => {
        return await this.model.findOne({ username });
    }

}

export const userDao = new UserDao(userModel);