import { Router } from "express";
import { suppliersController } from "../controller/suppliersController.js";

const router = Router();

router.get('/', suppliersController.getAllSuppliers);
router.get('/:id', suppliersController.getSupplierById);
router.post('/insertMany', suppliersController.insertManySuppliers);
router.post('/create', suppliersController.createSupplier);
router.put('/update/:id', suppliersController.updateSupplier);
router.delete('/delete/:id', suppliersController.deleteSupplier);

export default router;