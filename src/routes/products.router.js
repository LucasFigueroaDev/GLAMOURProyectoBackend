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
        let { limit } = req.query; // Params para limitar la cantidad de productos a retornar
        let products = await productsService.getAll();
        if (limit) {
            limit = parseInt(limit);
            if (isNaN(limit) || limit <= 0) { // Verificar que es un número y que no sea negativo
                return res.status(400).json({ message: 'El limite debe ser un número válido y mayor a cero' });
            }
            products = products.slice(0, limit);
        }

        return res.status(200).json({payload: products});
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor al obtener todos los productos' });
    }
});

// Ruta para obtener un producto por su ID
router.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params; // Params del ID del producto a retornar
        if (!mongoose.isValidObjectId(pid)) return res.status(400).json({ message: 'ID de producto inválido o inexistente' }); // Validamos el id

        const productID = await productsService.getById(pid);
        if (!productID) {
            return res.status(404).json({ message: 'Producto no existe' });
        }

        return res.status(200).json({payload: productID});
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
        const { pid } = req.params; // Params del producto a modificar (ID)
        const productData = req.body; // Params de la data que se va a modificar del producto

        if (!mongoose.isValidObjectId(pid)) return res.status(400).json({ message: 'ID de producto inválido o inexistente' });
        if (!productData || Object.keys(productData).length === 0) return res.status(400).json({ message: 'Datos inválidos para actualizar el producto' });
        if (req.file) productData.thumbnail = req.file.path.split('public')[1];

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

        return res.status(200).json({ message: 'Producto eliminado correctamente'});
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor no se logro procesar la solicitud eliminar' });
    }
});

export default router;