import { productModel } from "../models/productModel.js";
import BaseDao from "./baseDao.js";
class ProductDao extends BaseDao {
    constructor(model) {
        super(model);
    }

    getAllProducts = async (query, options) => {
        return await this.model.paginate(query, options);
    }

    getProductByTitle = async (title) => {
        return await this.model.findOne({ title });
    }

    getProductsByCategory = async (categoryId) => {
        return await this.model.find({ category_id: categoryId });
    }

    insertManyProducts = async (products) => {
        return await this.model.insertMany(products);
    }

    softDeleteProduct = async (id) => {
        return await this.model.findByIdAndUpdate(id, { status: false, updated_at: new Date(), deleted_at: new Date() }, { new: true });
    }
}

export const productDao = new ProductDao(productModel);