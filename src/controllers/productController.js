import fs from 'node:fs';
import path from 'node:path';
import { v4 as uuidv4 } from 'uuid';

// Creación de ProductController para gestionar productos
class ProductController {
    constructor(filePath) {
        this.filePath = filePath; // Ruta donde se almacenará el archivo de productos
    }

    // Método para cargar los productos desde el archivo
    async loadProducts() {
        try {
            if (fs.existsSync(this.filePath)) {
                const products = await fs.promises.readFile(this.filePath, 'utf-8');
                if (products.trim() === '') {
                    return [];
                }
                try {
                    return JSON.parse(products);
                } catch (error) {
                    throw new Error("El archivo de productos no está correctamente formateado.");
                }
            } else {
                return [];
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Método para crear un nuevo producto y guardarlo en el archivo
    async createProduct(product) {
        try {
            const allProducts = await this.loadProducts(); // Carga los productos existentes
            const { title, description, price, code, stock, category, imagen, status } = product;

            let newProduct = {
                id: uuidv4(), // Genera un ID único para el producto
                title: title || "Sin título",  // Si no viene, asigna un valor por defecto
                description: description || "Sin descripción",
                price: price ? parseFloat(price) : 0,
                code: code || "Sin código",
                stock: stock ? parseInt(stock) : 0,
                category: category || "Sin categoría",
                imagen: imagen || "",
                status: status !== undefined ? status : true // Si no viene, se asigna true
            };
            
            allProducts.push(newProduct); // Agrega el nuevo producto a la lista
            await fs.promises.writeFile(this.filePath, JSON.stringify(allProducts, null, 4)); // Guarda la lista actualizada en el archivo
            return newProduct;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Método para obtener un producto por su ID
    async getProductID(id) {
        try {
            const allProducts = await this.loadProducts();
            const productId = allProducts.find((product) => product.id === id); // Busca el producto por ID
            if (!productId) {
                throw new Error('Error producto no encontrado');
            }
            return productId;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Método para actualizar un producto existente
    async updateProduct(id, key, value) {
        try {
            const allProducts = await this.loadProducts();
            const index = allProducts.findIndex(prod => prod.id === id); // Busca el índice del producto a actualizar
            if (index === -1) {
                throw new Error(`Producto con ID ${id} no encontrado`);
            }
            allProducts[index][key] = value;
            await fs.promises.writeFile(this.filePath, JSON.stringify(allProducts, null, 4));
            return allProducts[index]; // Retorna el producto actualizado
        } catch (error) {
            throw new Error(`Error al actualizar el producto: ${error.message}`);
        }
    }

    // Método para eliminar un producto por su ID
    async deleteProduct(id) {
        try {
            const allProducts = await this.loadProducts();
            const deleteProd = await this.getProductID(id);
            const newList = allProducts.filter((prod) => prod.id !== id); // Filtra la lista sin el producto eliminado
            await fs.promises.writeFile(this.filePath, JSON.stringify(newList, null, 4)); // Guarda la nueva lista sin el producto eliminado
            return deleteProd; // Retorna el producto eliminado
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Método para eliminar todos los productos del archivo
    async deleteAllProducts() {
        try {
            const allProducts = await this.loadProducts();
            if (allProducts.length >= 1) { // Verifica si hay productos
                throw new Error('Los productos están vacíos');
            }
            await fs.promises.unlink(this.filePath); // Elimina el archivo de productos
        } catch (error) {
            throw new Error(error);
        }
    }
}

// Instancia de ProductController con la ruta del archivo de productos
export const productController = new ProductController(path.join(process.cwd(), 'data/products.json'));
