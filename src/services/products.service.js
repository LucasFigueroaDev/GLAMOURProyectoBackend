import { productRepository } from "../repository/products.repository.js";
import productDto from "../dto/product.dto.js";
import CustomError from "../utils/customError.js";

export class productsService {
    constructor(repository) {
        this.repository = repository;
    }
    getAllProducts = async () => {
        try {
            const response = await this.repository.getAllProducts();
            if (!response) throw new CustomError(404, "Error al obtener los productos");
            return response;
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
    createProduct = async (product) => {
        try {
            const existProduct = await this.repository.getProductByTitle(title);
            if (existProduct) throw new CustomError(400, "El producto ya existe");
            const response = await this.repository.createProduct(product);
            if (!response) throw new CustomError(404, "Error al crear el producto");
            return productDto.getProductDto(response);
        } catch (error) {
            throw error;
        }
    };
    updateProduct = async (id, product) => {
        try {
            const existProduct = await this.getProductById(id);
            const response = await this.repository.updateProduct(id, product);
            if (!response) throw new CustomError(404, "Error al actualizar el producto");
            return productDto.getProductDto(response);
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

export const productsService = new productsService(productRepository);