import { supplierRepository } from "../repository/suppliersRepository.js";
import customError from "../utils/customError.js";

class SuppliersService {
    constructor(repository) {
        this.repository = repository
    }

    getAllSuppliers = async () => {
        try {
            const response = await this.repository.getAllSuppliers();
            if (!response) throw new customError(404, 'Error al obtener los proveedores');
            return response;
        } catch (error) {
            throw error;
        }
    }
    getSupplierById = async (id) => {
        try {
            const response = await this.repository.getSupplierById(id);
            if (!response) throw new customError(404, 'Error al obtener el proveedor por id');
            return response;
        } catch (error) {
            throw error;
        }
    }
    insertManySuppliers = async (body) => {
        try {
            if (!Array.isArray(body)) throw new customError(404, 'Error debes enviar un array de objetos');
            const requiredFields = ['name', 'contact', 'email', 'phone', 'address'];
            const invalidFields = body.filter(supplier => { return requiredFields.some(field => !supplier[field]) });
            if (invalidFields.length > 0) throw new customError(404, `Los siguientes campos son obligatorios: ${invalidFields.map(field => field.name).join(', ')}`);
            const names = body.map(supplier => supplier.name);
            const duplicatedNames = names.filter((name, index) => names.indexOf(name) !== index);
            if (duplicatedNames.length > 0) throw new customError(404, `Los siguientes proveedores ya existen: ${duplicatedNames.join(', ')}`);
            const response = await this.repository.insertManySuppliers(body);
            if (!response) throw new customError(404, 'Error al insertar los proveedores');
            return response;
        } catch (error) {
            throw error;
        }
    }
    createSuppliers = async (body) => {
        try {
            const { name, contact, email, phone, address } = body;
            if (!name || !contact || !email || !phone || !address) throw new customError(404, 'Error debes enviar todos los campos');
            const response = await this.repository.createSuppliers(body);
            if (!response) throw new customError(404, 'Error al crear el proveedor');
            return response;
        } catch (error) {
            throw error;
        }
    }
    updateSuppliers = async (id, body) => {
        try {
            const existSupplier = await this.getSupplierById(id);
            const response = await this.repository.updateSuppliers(id, body);
            if (!response) throw new customError(404, 'Error al actualizar el proveedor');
            return response;
        } catch (error) {
            throw error;
        }
    }
    deleteSuppliers = async (id) => {
        try {
            const existSupplier = await this.getSupplierById(id);
            const response = await this.repository.deleteSuppliers(id);
            if (!response) throw new customError(404, 'Error al eliminar el proveedor');
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export const suppliersService = new SuppliersService(supplierRepository);