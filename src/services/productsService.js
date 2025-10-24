import { productRepository } from "../repository/productsRepository.js";
import { categoriesService } from "./categories.service.js";
import productDto from "../dto/productDto.js";
import CustomError from "../utils/customError.js";

export class ProductsService {
    constructor(repository) {
        this.repository = repository;
    }
    getAllProducts = async ({ query, options }) => {
        try {
            query.status = true;
            if (query.minPrice || query.maxPrice) {
                query.price = {};
                if (query.minPrice) {
                    query.price.$gte = query.minPrice; // $gte es mayor o igual
                }
                if (query.maxPrice) {
                    query.price.$lte = query.maxPrice; // $lte es menor o igual
                }
                delete query.minPrice;
                delete query.maxPrice;
            }
            const response = await this.repository.getAllProducts(query, options);
            if (!response) throw new CustomError(404, "Error al obtener los productos");
            return {
                payload: response.payload,
                totalPages: response.totalPages,
                page: response.page,
                hasPrevPage: response.hasPrevPage,
                hasNextPage: response.hasNextPage,
                prevPage: response.hasPrevPage ? response.prevPage : null,
                nextPage: response.hasNextPage ? response.nextPage : null
            };
        } catch (error) {
            throw error;
        }
    };
    getProductById = async (id) => {
        try {
            const response = await this.repository.getProductById(id);
            if (!response) throw new CustomError(404, "Error al obtener el producto por id");
            return response;
        } catch (error) {
            throw error;
        }
    };
    getProductByTitle = async (title) => {
        try {
            const response = await this.repository.getProductByTitle(title);
            if (!response) throw new CustomError(404, "Error al obtener el producto por titulo");
            return response;
        } catch (error) {
            throw error;
        }
    };
    getProductsByCategory = async (category) => {
        try {
            const existCategory = await categoriesService.getCategoryById(category);
            const response = await this.repository.getProductsByCategory(category);
            if (!response) throw new CustomError(404, "Error al obtener los productos por categoria");
            return response;
        } catch (error) {
            throw error;
        }
    };
    createProduct = async (product) => {
        try {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
            const maxSize = 4 * 1024 * 1024; // 4MB
            if (product.fileInfo) {
                if (!allowedTypes.includes(product.fileInfo.mimetype)) throw new CustomError(400, "El archivo debe ser una imagen");
                if (product.fileInfo.size > maxSize) throw new CustomError(400, "El archivo debe ser menor a 4MB");
            }
            const existProduct = await this.repository.getProductByTitle(product.title);
            if (existProduct) throw new CustomError(400, "El producto ya existe");
            const requiredFields = ["title", "description", "price", "code", "stock", "category_id", "supplier_id"];
            const missingFields = requiredFields.filter(field => !product[field]);
            if (missingFields.length > 0)
                throw new CustomError(400, `Faltan campos obligatorios: ${missingFields.join(', ')}`);
            if (!product.title.trim()) throw new CustomError(400, "El título no puede estar vacío");
            if (!product.description.trim()) throw new CustomError(400, "La descripción no puede estar vacía");
            if (!product.code.trim()) throw new CustomError(400, "El código no puede estar vacío");
            if (product.stock <= 0) throw new CustomError(400, "El stock debe ser mayor a 0");
            if (product.price <= 0) throw new CustomError(400, "El precio debe ser mayor a 0");
            const response = await this.repository.createProduct(product);
            if (!response) throw new CustomError(500, "Error al crear el producto");
            return productDto.getProductDto(response);
        } catch (error) {
            throw error;
        }
    };
    insertManyProducts = async (products) => {
        try {
            if (!Array.isArray(products)) throw new CustomError(400, "Los productos deben ser un array");
            const requiredFields = ["title", "description", "price", "code", "stock", "category_id", "supplier_id"];
            const invalidFields = products.filter(product => { return requiredFields.some(field => !product[field]); });
            if (invalidFields.length > 0) throw new CustomError(400, `Los productos deben tener los campos obligatorios: ${invalidFields.map(product => product.title).join(', ')}`);
            const titles = products.map(product => product.title);
            for (const title of titles) {
                const existProduct = await this.repository.getProductByTitle(title);
                if (existProduct) throw new CustomError(400, `El producto ${title} ya existe`);
            }
            const response = await this.repository.insertManyProducts(products);
            if (!response) throw new CustomError(404, "Error al crear los productos");
            return response.map(product => {
                return productDto.getProductDto(product);
            })
        } catch (error) {
            throw error;
        }
    }
    updateProduct = async (id, update) => {
        try {
            const existProduct = await this.getProductById(id);
            if (Object.keys(update).length === 0) throw new CustomError(400, "Error faltan datos para actualizar el producto");
            if (update.title && !update.title.trim()) { throw new CustomError(400, "El título no puede estar vacío"); }
            if (update.description && !update.description.trim()) { throw new CustomError(400, "La descripción no puede estar vacía"); }
            if (update.price !== undefined && update.price < 0) { throw new CustomError(400, "El precio debe ser mayor que 0"); }
            if (update.stock !== undefined && update.stock < 0) { throw new CustomError(400, "El stock debe ser mayor que 0 o marcar status false"); }
            if (update.hasOwnProperty("stock") && update.stock === 0) { update.status = false; }
            if (update.category_id && !update.category_id.trim()) { throw new CustomError(400, "Especificar una categoría válida"); }
            if (update.supplier_id && !update.supplier_id.trim()) { throw new CustomError(400, "Especificar un proveedor válido"); }
            const response = await this.repository.updateProduct(id, update);
            if (!response) throw new CustomError(404, "Error al actualizar el producto");
            return productDto.getProductDto(response);
        } catch (error) {
            throw error;
        }
    };
    softDeleteProduct = async (id) => {
        try {
            const existProduct = await this.getProductById(id);
            const response = await this.repository.softDeleteProduct(id);
            if (!response) throw new CustomError(404, "Error al dar de baja el producto");
            return response;
        } catch (error) {
            throw error;
        }
    };
    deleteProduct = async (id) => {
        try {
            const existProduct = await this.getProductById(id);
            const response = await this.repository.deleteProduct(id);
            if (!response) throw new CustomError(404, "Error al eliminar el producto");
            return response;
        } catch (error) {
            throw error;
        }
    };
}

export const productsService = new ProductsService(productRepository);