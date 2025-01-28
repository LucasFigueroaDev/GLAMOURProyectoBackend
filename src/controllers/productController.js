import fs from 'node:fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'node:path';

class productController {
    constructor(filePath) {
        this.filePath = filePath
    }

    async loadProducts() {
        try {
            if (fs.existsSync(this.filePath)) {
                const products = fs.promises.readFile(this.filePath, 'utf-8');
                return json.parse(products);
            } else return [];
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createProduct(title, description, price, code, stock, category) {
        try {
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
            const allProducts = await this.loadProducts();
            allProducts.push(newProduct);
            await fs.promises.writeFile(this.filePath, JSON.stringify(allProducts));
            return newProduct;
        } catch (error) {
            throw new Error(error);
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
            let prodId = await this.getProductID(id);
            prodId = { ...prodId, ...value };
            const newProducts= allProducts.filter((prod) => prod.id === id);
            newProducts.push(prodId);
            await fs.promises.writeFile(this.filePath, JSON.stringify(newProducts));
        } catch (error) {
            throw new Error(error);
        }
    }
}