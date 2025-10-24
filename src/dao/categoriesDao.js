import { categoryModel } from "../models/categoriesModel.js";
import BaseDao from "./base.dao.js";

class CategoriesDao extends BaseDao {
    constructor(model) {
        super(model);
    }

    getByName = async (name) => {
        const trimmedName = name.trim();
        return await this.model.findOne({ name: { $regex: new RegExp(`^${trimmedName}$`, 'i') }});
    }
}

export const categoriesDao = new CategoriesDao(categoryModel);