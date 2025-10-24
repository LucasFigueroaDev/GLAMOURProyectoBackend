import { supplierDao } from "../dao/suppliersDao.js";

class SupplierRepository {
    constructor(dao) {
        this.dao = dao;
    }
    getAllSuppliers = async () => {
        return await this.dao.getAll();
    }
    getSupplierById = async (id) => {
        return await this.dao.getById(id);
    }
    insertManySuppliers = async (body) => {
        return await this.dao.insertManySuppliers(body);
    }
    createSuppliers = async (body) => {
        return await this.dao.create(body);
    }
    updateSuppliers = async (id, body) => {
        return await this.dao.update(id, body);
    }
    deleteSupplier = async (id) => {
        return await this.dao.delete(id);
    }
}

export const supplierRepository = new SupplierRepository(supplierDao);