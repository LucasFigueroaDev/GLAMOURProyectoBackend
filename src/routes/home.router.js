import mongoose from "mongoose";
import { Router } from "express";
import { Base } from '../Dao/base.dao.js';
import { productModel } from '../models/product.model.js';
import { CartsDao } from "../Dao/carts.dao.js";
import { cartModel } from "../models/cart.model.js";

const router = Router();
const productsService = new Base(productModel);
const cartsService = new CartsDao(cartModel);

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
    try {
        let { limit = 10, page = 1, sort = '', category = '', ...query } = req.query;
        const sortManager = { 'asc': 1, 'desc': -1 };

        limit = parseInt(limit);
        page = parseInt(page);

        const options = {
            limit,
            page,
            sort: sort ? { price: sortManager[sort] } : {},
            customLabels: { docs: 'payload' }
        };

        const products = await productModel.paginate(query, options);

        return res.render('home', { title: 'Mi tienda' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor al obtener todos los productos' });
    }
});

// Ruta para obtener un producto por su ID
router.get('/home/:pid', async (req, res) => {
    try {
        const { pid } = req.params; // Params del ID del producto a retornar
        if (!mongoose.isValidObjectId(pid)) return res.status(400).json({ message: 'ID de producto inválido o inexistente' }); // Validamos el id

        let productID = await productsService.getById(pid);
        if (!productID) {
            return res.status(404).json({ message: 'Producto no existe' });
        }
        productID = productID.toObject();

        return res.render('details', { title: `${productID.title}`, productID });
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor al obtener el producto' });
    }
});

router.get('/home/cart/:cid', async (req, res) => {
    const { cid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(cid)) return res.status(400).json({ message: 'ID de carrito invalido o inexistente' });
    
    try {
        const cart = await cartsService.getById(cid);
        if (!cart) return res.status(404).json({ message: 'Error en carrito, no existe' });

        return res.status(200).json(cart);
    } catch (error) {
        console.error('❌ Error en la consulta del carrito:', error);  // Log de error más detallado
        return res.status(500).json({ message: 'Error en la solicitud del carrito, intentalo de nuevo más tarde' });
    }
});



export default router