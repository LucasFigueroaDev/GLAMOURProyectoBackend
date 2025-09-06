import { userModel } from '../models/user.model.js';
import { baseDao } from './base.dao.js';
class userDao extends baseDao {
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

export const userDao = new userDao(userModel);