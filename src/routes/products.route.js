import { Router } from "express";
import { productController } from "../controllers/productController.js";

const router = Router();

router.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productController.loadProducts();
        if (limit && !isNaN(limit)) {
            const limitedProducts = products.slice(0, parseInt(limit));
            return res.status(200).json(limitedProducts);
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const productID = await productController.getProductID(pid);
        res.status(200).json(productID);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const prod = await productController.createProduct(
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.code,
        req.body.stock,
        req.body.category
    );
    try {
        res.status(201).json({ message: 'Producto creado correctamente', product: prod });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor, no se pudo crear el producto' });
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const prodUpID = await productController.updateProduct(req.body, pid);
        res.status(200).json({ message: 'Producto actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor, no se logro procesar la solicitud' });
    }
});

router.delete('/', async (req, res) => {
    try {
        await productController.deleteAllProducts();
        res.json({ message: 'Todos los productos fueron eliminados correctamente' });
    } catch (error) {
        res.status(404).json({ message: 'Error al intentar borrar todos los productos' });
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const prod = await productController.deleteProduct(pid);
        res.status(200).json({message: 'Producto eliminado correctamente'});
    } catch (error) {
        res.status(500).json({message: 'Error en el servidor no se logro procesar la solicitud eliminar'});
    }
});

export default router;