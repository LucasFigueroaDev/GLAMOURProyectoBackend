import { uploader } from '../utils/utils.js';
import { Router } from "express";
import { productsController } from '../controller/products.controller.js';
const router = Router();

router.get('/all', productsController.getAllProducts);
router.get('/new-arrivals', productsController.getNewArrivals);
router.get('/:id', productsController.getProductById);
router.get('/category/:category', productsController.getProductsByCategory);
router.post('/create', uploader.single('file'), productsController.createProduct);
router.post('/insertMany', productsController.insertManyProducts);
router.put('/:id', uploader.single('file'), productsController.updateProduct);
router.put('/delete/:id', productsController.softDeleteProduct); // Da de baja el producto
router.delete('/:id', productsController.deleteProduct); // Elimina de la base de datos

export default router;