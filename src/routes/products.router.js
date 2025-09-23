import { uploader } from '../utils/utils.js';
import { Router } from "express";
import { productsController } from '../controller/products.controller.js';
const router = Router();

router.get('/', productsController.getAllProducts);
router.get('/:pid', productsController.getProductById);
router.post('/', uploader.single('file'), productsController.createProduct);
router.post('/insertMany', productsController.insertManyProducts);
router.put('/:pid', uploader.single('file'), productsController.updateProduct);
router.put('/delete/:pid', productsController.softDeleteProduct); // Da de baja el producto
router.delete('/:pid', productsController.deleteProduct); // Elimina de la base de datos

export default router;