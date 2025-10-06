import { productModel } from "../models/product.model.js";
import BaseDao from "./base.dao.js";
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

    insertManyProducts = async (products) => {
        return await this.model.insertMany(products);
    }

    softDeleteProduct = async (id) => {
        return await this.model.findByIdAndUpdate(id, { status: false,updated_at: new Date(), deleted_at: new Date() }, { new: true });
    }
}

export const productDao = new ProductDao(productModel);