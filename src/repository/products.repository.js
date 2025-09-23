import { productDao } from "../dao/product.dao.js";

class ProductRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getAllProducts = async (query, options) => {
        return await this.dao.getAllProducts(query, options);
    };

    getProductById = async (id) => {
        return await this.dao.getById(id);
    };

    getProductByTitle = async (title) => {
        return await this.dao.getProductByTitle(title);
    };

    createProduct = async (product) => {
        return await this.dao.create(product);
    };

    insertManyProducts = async (products) => {
        return await this.dao.insertManyProducts(products);
    };

    updateProduct = async (id, update) => {
        return await this.dao.update(id, {...update, updatedAt: new Date()}, { new: true });
    };

    softDeleteProduct = async (id) => {
        return await this.dao.softDeleteProduct(id);
    };

    deleteProduct = async (id) => {
        return await this.dao.delete(id);
    };
}

export const productRepository = new ProductRepository(productDao);