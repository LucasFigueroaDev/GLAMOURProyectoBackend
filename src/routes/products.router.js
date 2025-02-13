import { Router } from "express";
import { productController } from "../controllers/productController.js";

const router = Router();

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const { limit } = req.query; // Params para limitar la cantidad de productos a retornar
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

// Ruta para obtener un producto por su ID
router.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params; // Params del ID del producto a retornar
        const productID = await productController.getProductID(pid);
        res.status(200).json(productID);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Ruta para crear un producto nuevo
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

// Ruta para modificar un producto ya existente
router.put('/:pid', async (req, res) => {
    try {
        const { pid } = req.params; // Params del producto a modificar (ID)
        const productData = req.body; // Params de la data que se va a modificar del producto

        if (!productData || Object.keys(productData).length === 0) {
            return res.status(400).json({ message: 'Datos inválidos para actualizar el producto' });
        }

        const updatedProduct = await productController.updateProduct(productData, pid);

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json({ message: 'Producto actualizado correctamente', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor, no se logró procesar la solicitud' });
    }
});

// Ruta para eliminar todos los productos
router.delete('/', async (req, res) => {
    try {
        await productController.deleteAllProducts();
        res.json({ message: 'Todos los productos fueron eliminados correctamente' });
    } catch (error) {
        res.status(404).json({ message: 'Error al intentar borrar todos los productos' });
    }
});

// Ruta para eliminar un producto específico
router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const prod = await productController.deleteProduct(pid);
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor no se logro procesar la solicitud eliminar' });
    }
});

export default router;