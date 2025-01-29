import fs from 'node:fs';
import path from 'node:path';
import { productController } from './productController.js';
import { v4 as uuidv4 } from 'uuid';

class CartsController {
    constructor(filePath) {
        this.filePath = filePath
    }

    async loadCarts() {
        try {
            if (fs.existsSync(this.filePath)) {
                const carts = await fs.promises.readFile(this.filePath, 'utf-8');
                const jsonCarts = JSON.parse(carts);
                return jsonCarts
            } else {
                return [];
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async createCart() {
        try {
            const cart = {
                id: uuidv4(),
                products: []
            };
            const allCarts = await this.loadCarts();
            allCarts.push(cart);
            await fs.promises.writeFile(this.filePath, JSON.stringify(allCarts, null, 4))
            return cart;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getCartID(id) {
        try {
            const allCarts = await this.loadCarts();
            const cartId = allCarts.find((cart) => cart.id === id);
            if (!cartId) {
                throw new Error('Carrito no existe');
            }
            return cartId
        } catch (error) {
            throw new Error(error);
        }
    }

    async addProductToCart(prodId, cartId) {
        try {
            const getProduct = await productController.getProductID(prodId);
            if (!getProduct) {
                throw new Error('El producto no existe');
            }
            const allCarts = await this.loadCarts();
            const getCart = await this.getCartID(cartId);
            if (!getCart) {
                throw new Error('El carrito no existe');
            }
            const prodInCart = getCart.products.find((prod) => prod.id === prodId);
            if (!prodInCart) {
                const product = {
                    id: prodId,
                    quantity: 1
                };
                getCart.products.push(product);
            } else {
                prodInCart.quantity += 1;
            }
            const updateCarts = allCarts.map((cart) => {
                if (cart.id === cartId) {
                    return getCart;
                }
                return cart
            });

            await fs.promises.writeFile(this.filePath, JSON.stringify(updateCarts, null, 4));
            return getCart;

        } catch (error) {
            throw new Error(error)
        }
    }
}

export const cartsController = new CartsController(path.join(process.cwd(), 'data/carts.json'));
