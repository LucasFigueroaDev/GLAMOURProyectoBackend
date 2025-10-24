import { userModel } from '../models/userModel.js';
import BaseDao from './baseDao.js';
class UserDao extends BaseDao {
    constructor(model) {
        super(model);
    }

    getByEmail = async (email) => {
        return await this.model.findOne({ email });
    }

    getUserById = async (id) => {
        return await this.model.findById(id);
    }

    deleteByEmail = async (email) => {
        return await this.model.findOneAndDelete({ email });
    }

}

export const userDao = new UserDao(userModel);