import CustomError from "../utils/customError.js";
import { categoriesRepository } from "../repository/categoriesRepository.js";

class CategoryService {
    constructor(repository) {
        this.repository = repository;
    }

    getAllCategories = async () => {
        try {
            const response = await this.repository.getAllCategories();
            if (!response) throw new CustomError(404, 'Error al obtener las categorias');
            return response;
        } catch (error) {
            throw error;
        }
    }

    getCategoryById = async (id) => {
        try {
            const response = await this.repository.getCategoryById(id);
            if (!response) throw new CustomError(404, 'Error al obtener la categoria por id');
            return response;
        } catch (error) {
            throw error;
        }
    }

    getByName = async (name) => {
        try {
            const response = await this.repository.getByName(name);
            return response;
        } catch (error) {
            throw error;
        }
    }

    createCategory = async (category) => {
        try {
            const { name, description, image } = category
            const trimmedName = name ? name.trim() : null;
            if (!trimmedName || !description || !image) throw new CustomError(400, 'Los campos name, description y image son obligatorios');
            const existName = await this.getByName(trimmedName);
            if(existName) throw new CustomError(400, 'La categoria ya existe');
            const categoryData = { name: trimmedName, description, image };
            const response = await this.repository.createCategory(categoryData);
            if (!response) throw new CustomError(404, 'Error al crear la categoria');
            return response;
        } catch (error) {
            throw error; 
        }
    }

    updateCategory = async (id, category) => {
        try {
            if (!category || Object.keys(category).length === 0) throw new CustomError(400, 'No se enviaron campos para actualizar la categoria');
            const categoryId = await this.getCategoryById(id);
            const response = await this.repository.updateCategory(id, category);
            if (!response) throw new CustomError(404, 'Error al actualizar la categoria');
            return response;
        } catch (error) {
            throw error;
        }
    }

    deleteCategory = async (id) => {
        try {
            const categoryId = await this.getCategoryById(id);
            const response = await this.repository.deleteCategory(id);
            if (!response) throw new CustomError(404, 'Error al eliminar la categoria');
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export const categoriesService = new CategoryService(categoriesRepository);