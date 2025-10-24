import { categoriesService } from "../services/categoriesService.js";
import { createResponse } from "../utils/createResponse.js";

class CategoryController {
    constructor(service) {
        this.service = service;
    }

    getAllCategories = async (req, res, next) => {
        try {
            const categories = await this.service.getAllCategories();
            createResponse(res, 200, { status: "Exito al obtener todas las categorias", payload: categories });
        } catch (error) {
            next(error);
        }
    }

    getCategoryById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const category = await this.service.getCategoryById(id);
            createResponse(res, 200, { status: "Exito al obtener la categoria por id", payload: category });
        } catch (error) {
            next(error);
        }
    }

    createCategory = async (req, res, next) => {
        try {
            const category = await this.service.createCategory(req.body);
            createResponse(res, 201, { status: "Exito al crear la categoria", payload: category });
        } catch (error) {
            next(error);
        }
    }

    updateCategory = async (req, res, next) => {
        try {
            const { id } = req.params;
            const category = await this.service.updateCategory(id, req.body);
            createResponse(res, 200, { status: "Exito al actualizar la categoria", payload: category });
        } catch (error) {
            next(error);
        }
    }

    deleteCategory = async (req, res, next) => {
        try {
            const { id } = req.params;
            const category = await this.service.deleteCategory(id);
            createResponse(res, 200, { status: "Exito al eliminar la categoria", payload: category });
        } catch (error) {
            next(error);
        }
    }
}

export const categoriesController = new CategoryController(categoriesService);