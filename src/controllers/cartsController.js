import fs from 'node:fs'; 
import path from 'node:path'; 
import { v4 as uuidv4 } from 'uuid';

// Definición de la clase CartsController para gestionar los carritos de compra
class CartsController {
    constructor(filePath) {
        this.filePath = filePath; 
    }

    // Método para cargar los carritos desde el archivo
    async loadCarts() {
        try {
            if (fs.existsSync(this.filePath)) { 
                const carts = await fs.promises.readFile(this.filePath, 'utf-8'); 
                const jsonCarts = JSON.parse(carts); 
                return jsonCarts; 
            } else {
                return []; 
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    // Método para crear un nuevo carrito vacío
    async createCart() {
        try {
            const cart = {
                id: uuidv4(), 
                products: [] // Inicializa el carrito sin productos
            };
            const allCarts = await this.loadCarts(); // Carga los carritos existentes
            allCarts.push(cart); // Agrega el nuevo carrito a la lista
            await fs.promises.writeFile(this.filePath, JSON.stringify(allCarts, null, 4)); // Guarda la lista actualizada en el archivo
            return cart; 
        } catch (error) {
            throw new Error(error);
        }
    }

    // Método para obtener un carrito por su ID
    async getCartID(id) {
        try {
            const allCarts = await this.loadCarts(); 
            const cartId = allCarts.find((cart) => cart.id === id); // Busca el carrito por ID
            if (!cartId) {
                throw new Error('Carrito no existe'); 
            }
            return cartId;
        } catch (error) {
            throw new Error(error); 
        }
    }

    // Método para agregar un producto a un carrito
    async addProductToCart(prodId, cartId) {
        try {
            const getProduct = await productController.getProductID(prodId); // Verifica que el producto existe en la base de productos
            if (!getProduct) {
                throw new Error('El producto no existe');
            }
            const allCarts = await this.loadCarts(); // Carga los carritos existentes
            const getCart = await this.getCartID(cartId); // Obtiene el carrito por ID
            if (!getCart) {
                throw new Error('El carrito no existe');
            }
            // Verifica si el producto ya está en el carrito
            const prodInCart = getCart.products.find((prod) => prod.id === prodId);
            if (!prodInCart) {
                // Si el producto no está en el carrito, lo agrega con cantidad 1
                const product = {
                    id: prodId,
                    quantity: 1
                };
                getCart.products.push(product);
            } else {
                // Si el producto ya está en el carrito, incrementa la cantidad
                prodInCart.quantity += 1;
            }
            // Actualiza la lista de carritos con los cambios
            const updateCarts = allCarts.map((cart) => {
                if (cart.id === cartId) {
                    return getCart; // Reemplaza el carrito modificado
                }
                return cart; // Deja los demás carritos sin cambios
            });
            // Guarda la lista actualizada en el archivo
            await fs.promises.writeFile(this.filePath, JSON.stringify(updateCarts, null, 4));
            return getCart; // Retorna el carrito actualizado
        } catch (error) {
            throw new Error(error); 
        }
    }
}

// Instancia de CartsController con la ruta del archivo de carritos
export const cartsController = new CartsController(path.join(process.cwd(), 'data/carts.json'));

