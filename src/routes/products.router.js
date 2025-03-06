import mongoose from "mongoose";
import { __dirname, uploader } from '../utils/utils.js';
import { Router } from "express";
import { Base } from '../Dao/base.dao.js';
import { productModel } from '../models/product.model.js';

const router = Router();
const productsService = new Base(productModel);

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
    try {
        let { limit = 10, page = 1, sort = '', category = '', ...query } = req.query;
        const sortManager = { 'asc': 1, 'desc': -1 };

        limit = parseInt(limit);
        page = parseInt(page);

        if (category) {
            query.category = category;
        }

        const options = {
            limit,
            page,
            sort: sort ? { price: sortManager[sort] } : {},
            customLabels: { docs: 'payload' }
        };

        const products = await productModel.paginate(query, options);
        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;
        const queryParams = new URLSearchParams({ limit, sort, category }).toString();
        const nextPageUrl = products.hasNextPage ? `${baseUrl}?page=${products.nextPage}&${queryParams}` : null;
        const prevPageUrl = products.hasPrevPage ? `${baseUrl}?page=${products.prevPage}&${queryParams}` : null;

        return res.status(200).json({
            payload: products.payload,
            totalPages: products.totalPages,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevPage: prevPageUrl,
            nextPage: nextPageUrl
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor al obtener todos los productos' });
    }
});


// Ruta para obtener un producto por su ID
router.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        if (!mongoose.isValidObjectId(pid)) return res.status(400).json({ message: 'ID de producto inválido o inexistente' }); // Validamos el id

        const productID = await productsService.getById(pid);
        if (!productID) {
            return res.status(404).json({ message: 'Producto no existe' });
        }

        return res.status(200).json({ payload: productID });
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor al obtener el producto' });
    }
});

// Ruta para crear un producto nuevo
router.post('/', uploader.single('file'), async (req, res) => {
    try {
        const data = req.body;

        if (!data || Object.keys(data).length === 0) return res.status(400).json({ message: 'Error faltan datos para crear el producto' });
        const price = parseFloat(data.price)
        if (isNaN(price) || price < 0) return res.status(400).json({ message: 'Error el precio debe ser un número positivo' });

        const thumbnail = req.file ? req.file.path.split('public')[1] : null;
        const addProduct = await productsService.create({ ...data, price: price, thumbnail: thumbnail });

        return res.status(201).json({ message: 'Producto creado correctamente', payload: addProduct });
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor, no se pudo crear el producto' });
    }
});

// Ruta para modificar un producto ya existente
router.put('/:pid', uploader.single('file'), async (req, res) => {
    try {
        const { pid } = req.params;
        let productData = req.body;

        if (!mongoose.isValidObjectId(pid)) return res.status(400).json({ message: 'ID de producto inválido o inexistente' });

        if (req.file) productData = { ...productData, thumbnail: req.file.path.split('public')[1] };

        if (!productData || Object.keys(productData).length === 0) return res.status(400).json({ message: 'No se enviaron datos para actualizar el producto' });

        const updatedProduct = await productsService.update(pid, productData);

        if (!updatedProduct) return res.status(404).json({ message: 'Producto no encontrado' });

        return res.status(200).json({ message: 'Producto actualizado correctamente', payload: updatedProduct });
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor, no se logró procesar la solicitud' });
    }
});

// Ruta para eliminar un producto específico
router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        if (!mongoose.isValidObjectId(pid)) return res.status(400).json({ message: 'ID de producto inválido o inexistente' });

        const deleteProduct = await productsService.delete(pid);
        if (!deleteProduct || deleteProduct.deletedCount === 0) return res.status(404).json({ message: 'Producto no encontrado' });

        return res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor no se logro procesar la solicitud eliminar' });
    }
});

export default router;