import { Router } from "express";
import { CartsDao } from "../Dao/carts.dao.js";
import { cartModel } from "../models/cart.model.js";
import mongoose from "mongoose";

const cartsService = new CartsDao(cartModel);

const router = Router();

router.get('/', async (req, res) => {
    try {
        const getAllCarts = await cartsService.getAll();
        if (!getAllCarts) return res.status(400).json({ message: 'No hay ningun carrito creado' });
        return res.status(200).json({ cart: getAllCarts });
    } catch (error) {
        return res.status(500).json({ message: 'Error no se logro procesar tu solicitud' });
    }
});

// Ruta para obtener un carrito por su ID
router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(cid)) return res.status(400).json({ message: 'ID de carrito invalido o inexistente' });
    try {
        const cart = await cartsService.getByIdPopulate(cid);

        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
        if (cart.products.length === 0) {
            return res.render('carts', {
                title: 'Mi tienda - Carrito de compras',
                cart: cart,
                products: [],
                message: 'Tu carrito está vacío'
            });
        }
        cart.products = cart.products.map(product => {
            product.total = (product.quantity * product.product.price).toFixed(2);
            return product;
        });

        const total = cart.products.reduce((acc, item) => {
            return acc + (item.product.price * item.quantity)
        }, 0)

        const totalPrice = total.toFixed(2);

        return res.render('carts', { title: 'Mi tienda - Carrito de compras', cart: cart, products: cart.products, totalPrice, sectionInfoAndLogos: false });
    } catch (error) {
        return res.status(500).json({ message: 'Error no se pudo procesar tu solicitud' });
    }
});

// Ruta para crear un carrito nuevo
router.post('/', async (req, res) => {
    try {
        const newCart = await cartsService.create({ products: [] });
        return res.status(201).json({ message: 'Carrito creado con exito', cart: newCart });
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear un nuevo carrito' });
    }
});

// Ruta para la eliminacion de todos los productos del carrito
router.delete('/:cid', async (req, res) => {
    const { cid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(cid)) return res.status(400).json({ message: 'ID de carrito invalido o inexistente' });
    try {
        const cart = await cartsService.getById(cid);
        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

        const cartUpdate = await cartsService.update(cid, { products: [] }, { new: true });

        return res.status(200).json({ success: true, message: 'Carrito vaciado' });
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor, no se logro vaciar el carrito' });
    }
});

// Ruta para agregar un producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        if (!mongoose.Types.ObjectId.isValid(cid)) return res.status(400).json({ message: 'ID de carrito invalido o inexistente' });
        if (!mongoose.Types.ObjectId.isValid(pid)) return res.status(400).json({ message: 'ID de producto invalido o inexistente' });

        const cart = await cartsService.getById(cid);
        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

        const productIndex = cart.products.findIndex(p => p.product.toString() === pid);
        let updateQuery;
        if (productIndex !== -1) {
            updateQuery = {
                $inc: { [`products.${productIndex}.quantity`]: 1 }
            };
        } else {
            updateQuery = {
                $push: { products: { product: pid, quantity: 1 } }
            };
        }

        const cartUpdate = await cartsService.updatewithPopulate({ _id: cid }, updateQuery, { new: true });

        return res.status(200).json({ message: 'Producto agregado con exito', cart: cartUpdate })
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor, no se logro agregar el producto' })
    }
});

// Ruta para modificar un carrito
router.put('/:cid', async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;

    if (!mongoose.Types.ObjectId.isValid(cid)) return res.status(400).json({ message: 'ID de carrito invalido o inexistente' });

    try {
        const cartsFind = await cartsService.getById(cid);
        if (!cartsFind) return res.status(404).json({ message: 'No se encontro el carrito' });

        const newCart = {
            ...cartsFind,
            products
        }
        const cartUpdate = await cartsService.update(cid, newCart, { new: true, });
        return res.status(200).json({ message: 'Actualizacion de productos', cart: cartUpdate })
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor, no se logro agregar el producto' })
    }
});

//Ruta para actualizar la cantidad del producto
router.put('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    if (typeof quantity !== 'number' || quantity <= 0) {
        return res.status(400).json({ message: 'Cantidad inválida' });
    }
    try {
        const cart = await cartsService.getById(cid);
        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

        const indexProd = cart.products.findIndex(prod => {
            return prod && prod.product && prod.product._id.toString() === pid;
        });
        if (indexProd === -1) {
            return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
        }
        cart.products[indexProd].quantity = quantity;

        const cartUpdate = await cartsService.updatewithPopulate(cid, cart, { new: true });

        return res.status(200).json({ message: 'Cantidad del producto actualizada', cart: cartUpdate });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Ruta para eliminar un producto del carrito 
router.delete('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(cid)) return res.status(400).json({ message: 'ID de carrito invalido o inexistente' });
    if (!mongoose.Types.ObjectId.isValid(pid)) return res.status(400).json({ message: 'ID de producto invalido o inexistente' });
    try {
        const cart = await cartsService.getById(cid);
        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
        const cartFiltered = { ...cart, products: cart.products.filter(prod => prod.product.toString() !== pid) };

        const cartUpdate = await cartsService.update(cid, { products: cartFiltered.products }, { new: true });
        return res.status(200).json({ success: true, message: 'Producto eliminado' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});

export default router;