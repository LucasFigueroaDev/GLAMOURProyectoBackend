import { categoriesDao } from "../dao/categoriesDao.js";

class CategoryRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getAllCategories = async () => {
        return await this.dao.getAll();
    }

    getByName = async (name) => {
        return await this.dao.getByName(name);
    }

    getCategoryById = async (id) => {
        return await this.dao.getById(id);
    }

    createCategory = async (category) => {
        return await this.dao.create(category);
    }

    updateCategory = async (id, category) => {
        return await this.dao.update(id, category);
    }

    deleteCategory = async (id) => {
        return await this.dao.delete(id);
    }
}

export const categoriesRepository = new CategoryRepository(categoriesDao);