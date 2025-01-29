import { Router } from "express";
import { cartsController } from "../controllers/cartsController.js";

const router = Router();

router.post('/', async (req, res) => {
    try {
        const newCart = await cartsController.createCart()
        res.json({ message: newCart });
    } catch (error) {
        res.status(404).json({ message: 'Error al crear un nuevo carrito' });
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cartID = await cartsController.getCartID(cid);
        res.status(200).json({ carrito: cid, productos: cartID.products });
    } catch (error) {
        res.status(400).json({ message: 'Error no se pudo procesar tu solicitud' })
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid } = req.params;
        const { pid } = req.params;
        const addProduct = await cartsController.addProductToCart(pid, cid);
        res.status(200).json({ addProduct });
    } catch (error) {
        res.status({message: error.message});
    }
});

export default router;