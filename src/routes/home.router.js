import { Router } from "express";
import { productController } from "../controllers/productController.js";

const router = Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const productID = await productController.getProductID(id);
        res.render('details', { product: productID });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

export default router