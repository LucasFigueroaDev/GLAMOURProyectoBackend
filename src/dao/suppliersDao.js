import { supplierModel } from "../models/supplierModel.js";
import BaseDao from "./base.dao.js";

class SupplierDao extends BaseDao {
    constructor(model) {
        super(model);
    }

    insertManySuppliers = async (suppliers) => {
        return await this.model.insertMany(suppliers);
    }
}

export const supplierDao = new SupplierDao(supplierModel);