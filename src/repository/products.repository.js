import { productDao } from "../dao/product.dao.js";

class productRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getAllProducts = async () => {
        return await this.dao.getAll();
    };

    getProductById = async (id) => {
        return await this.dao.getById(id);
    };

    createProduct = async (product) => {
        return await this.dao.create(product);
    };

    updateProduct = async (id, product) => {
        return await this.dao.update(id, product);
    };

    deleteProduct = async (id) => {
        return await this.dao.delete(id);
    };
}

export const productRepository = new productRepository(productDao);