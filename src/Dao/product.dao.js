import { productModel } from "../models/product.model.js";
import { mongoDao } from "./mongo.dao.js";

class productDao extends MongoDao {
    constructor(model) {
        super(model);
    }

    getProductByTitle = async (title) => {
        return await this.model.findOne({ title });
    }
}

export const productDao = new productDao(productModel);