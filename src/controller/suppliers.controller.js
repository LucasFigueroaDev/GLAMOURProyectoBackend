import { suppliersService } from "../services/suppliers.service.js";
import { createResponse } from "../utils/createResponse.js";

class SuppliersController {
    constructor(service){
        this.service = service
    }

    getAllSuppliers = async (req, res, next) => {
        try {
            const suppliers = await this.service.getAllSuppliers();
            createResponse(res, 200, { status: "Exito al obtener todos los proveedores", payload: suppliers });
        } catch (error) {
            next(error);
        }
    }
    getSupplierById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const supplier = await this.service.getSupplierById(id);
            createResponse(res, 200, { status: "Exito al obtener el proveedor por id", payload: supplier });
        } catch (error) {
            next(error);
        }
    }
    insertManySuppliers = async (req, res, next) => {
        try {
            const suppliers = await this.service.insertManySuppliers(req.body);
            createResponse(res, 201, { status: "Exito al crear los proveedores", payload: suppliers });
        } catch (error) {
            next(error);
        }
    }
    createSupplier = async (req, res, next) => {
        try {
            const supplier = await this.service.createSupplier(req.body);
            createResponse(res, 201, { status: "Exito al crear el proveedor", payload: supplier });
        } catch (error) {
            next(error);
        }
    }
    updateSupplier = async (req, res, next) => {
        try {
            const { id } = req.params;
            const updateBody = req.body;
            const supplierUpdated = await this.service.supplierUpdate(id, updateBody);
            createResponse(res, 200, { status: "Exito al actualizar el proveedor", payload: supplierUpdated });
        } catch (error) {
            next(error);
        }
    }
    deleteSupplier = async (req, res, next) => {
        try {
            const { id } = req.params;
            const supplierDeleted = await this.service.deleteSupplier(id);
            createResponse(res, 200, { status: "Exito al eliminar el proveedor", payload: supplierDeleted });
        } catch (error) {
            next(error);
        }
    }
}

export const suppliersController = new SuppliersController(suppliersService);