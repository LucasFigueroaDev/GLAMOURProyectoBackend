import { Router } from "express";
import { productController } from '../controllers/productController.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const realProducts = await productController.loadProducts();
        res.render('realTime', { products: realProducts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const product = await productController.createProduct(
            req.body.title,
            req.body.description,
            req.body.price,
            req.body.code,
            req.body.stock,
            req.body.category,
            req.body.image
        );
        req.app.get('webSocketServer').emit('newProduct', product);
        res.redirect('/api/realTimeProducts');
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor, no se pudo crear el producto' });
    }
});

router.post('/delete', async (req, res) => {
    try {
        const { id } = req.body;
        const prod = await productController.deleteProduct(id);
        req.app.get('webSocketServer').emit('deleteProduct', id); 
        res.redirect('/api/realTimeProducts');
    } catch (error) {
        res.status(500).json({message: 'Error en el servidor no se logro procesar la solicitud eliminar'});
    }
});

export default router;
