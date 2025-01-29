import fs from 'node:fs';
import path from 'node:path';
import { v4 as uuidv4 } from 'uuid';

class ProductController {
    constructor(filePath) {
        this.filePath = filePath
    }

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
            } else { return [] };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createProduct(title, description, price, code, stock, category) {
        const newProduct = {
            id: uuidv4(),
            title,
            description,
            price,
            code,
            stock,
            category,
            status: true
        };
        try {
            const allProducts = await this.loadProducts();
            allProducts.push(newProduct);
            await fs.promises.writeFile(this.filePath, JSON.stringify(allProducts, null, 4));
            return newProduct;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getProductID(id) {
        try {
            const allProducts = await this.loadProducts();
            const productId = allProducts.find((product) => product.id === id);
            if (!productId) {
                throw new Error('Error producto no encontrado');
            }
            return productId;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateProduct(value, id) {
        try {
            const allProducts = await this.loadProducts();
            const prodId = await this.getProductID(id);
            prodId = { ...prodId, ...value };
            const newList = allProducts.filter((prod) => prod.id !== id);
            newList.push(prodId);
            await fs.promises.writeFile(this.filePath, JSON.stringify(newList, null, 4));
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteProduct(id) {
        try {
            const allProducts = await this.loadProducts();
            const deleteProd = await this.getProductID(id);
            const newList = allProducts.filter((prod) => prod.id !== id);
            await fs.promises.writeFile(this.filePath, JSON.stringify(newList, null, 4));
            return deleteProd;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteAllProducts() {
        try {
            const allProducts = await this.loadProducts();
            if (!allProducts.length >= 1) {
                throw new Error('Los productos estan vacios');
            }
            await fs.promises.unlink(this.filePath);
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const productController = new ProductController(path.join(process.cwd(), 'data/products.json'));