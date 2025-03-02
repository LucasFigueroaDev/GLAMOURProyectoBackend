import mongoose from "mongoose";
import { Router } from "express";
import { Base } from '../Dao/base.dao.js';
import { productModel } from '../models/product.model.js';

const router = Router();
const productsService = new Base(productModel);

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
    try {
        let { limit = 8, page = 1, sort = '', category = '', ...query } = req.query; 
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

        return res.render('home');
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
        
        return res.render('details', { productID });
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor al obtener el producto' });
    }
});


export default router