import { productsService } from "../services/products.service.js";
import { createResponse } from "../utils/createResponse.js";
import { __dirname } from '../utils/utils.js';


class ProductsController {
    constructor(service) {
        this.service = service;
    }
    getAllProducts = async (req, res, next) => {
        try {
            let { limit = 10, page = 1, sort = '', category, minPrice, maxPrice, ...filters } = req.query;
            const sortManager = { 'asc': 1, 'desc': -1 };
            limit = parseInt(limit);
            page = parseInt(page);
            if (category) { filters.category = category; }
            if (minPrice) { filters.minPrice = minPrice; }
            if (maxPrice) { filters.maxPrice = maxPrice; }
            const options = {
                limit,
                page,
                sort: sort ? { price: sortManager[sort] } : {},
                customLabels: { docs: 'payload' }
            };
            const products = await this.service.getAllProducts({ query: filters, options });
            const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;
            const queryParams = new URLSearchParams({ limit, sort, category, minPrice, maxPrice }).toString();
            const nextPageUrl = products.hasNextPage ? `${baseUrl}?page=${products.nextPage}&${queryParams}` : null;
            const prevPageUrl = products.hasPrevPage ? `${baseUrl}?page=${products.prevPage}&${queryParams}` : null;
            createResponse(res, 200, {
                payload: products.payload,
                totalPages: products.totalPages,
                page: products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevPage: prevPageUrl,
                nextPage: nextPageUrl
            });
        } catch (error) {
            next(error);
        }
    };
    getNewArrivals = async (req, res, next) => {
        try {
            const limit = 12;
            const page = 1;
            const getNewArrivalsOptions = {
                limit,
                page,
                sort: { created_at: -1 },
                customLabels: { docs: 'payload' }
            };
            const filter = { status: true };
            const products = await this.service.getAllProducts({ query: filter, options: getNewArrivalsOptions });
            if (!products.payload || products.payload.length === 0) {
                return createResponse(res, 200, { status: "No hay productos nuevos", payload: [] });
            } else {
                return createResponse(res, 200, { status: "Exito al obtener los productos nuevos", payload: products.payload });
            }
        } catch (error) {
            next(error);
        }
    };
    getProductsByCategory = async (req, res, next) => {
        try {
            const { category } = req.params;
            const products = await this.service.getProductsByCategory(category);
            createResponse(res, 200, { status: "Exito al obtener los productos por categoria", payload: products });
        } catch (error) {
            next(error);
        }
    };
    getProductById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await this.service.getProductById(id);
            createResponse(res, 200, { status: "Exito al obtener el producto por id", payload: product });
        } catch (error) {
            next(error);
        }
    };
    getProductByTitle = async (req, res, next) => {
        try {
            const { title } = req.params;
            const product = await this.service.getProductByTitle(title);
            createResponse(res, 200, { status: "Exito al obtener el producto por titulo", payload: product });
        } catch (error) {
            next(error);
        }
    };
    createProduct = async (req, res, next) => {
        try {
            const productData = { ...req.body };
            if (req.file) {
                productData.thumbnail = req.file.path.split('public')[1];
                productData.fileInfo = {
                    mimetype: req.file.mimetype,
                    size: req.file.size
                };
            }
            const product = await this.service.createProduct(productData);
            createResponse(res, 201, { status: "Producto creado correctamente", payload: product });
        } catch (error) {
            next(error);
        }
    };
    insertManyProducts = async (req, res, next) => {
        try {
            const products = await this.service.insertManyProducts(req.body);
            createResponse(res, 201, { status: "Exito al crear los productos", payload: products });
        } catch (error) {
            next(error);
        }
    }
    updateProduct = async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = { ...req.body, thumbnail: req.file ? req.file.path.split('public')[1] : null };
            const product = await this.service.updateProduct(id, data);
            createResponse(res, 200, { status: "Exito al actualizar el producto", payload: product });
        } catch (error) {
            next(error);
        }
    };
    softDeleteProduct = async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await this.service.softDeleteProduct(id);
            createResponse(res, 200, { status: "Exito al eliminar el producto", payload: product });
        } catch (error) {
            next(error);
        }
    };
    deleteProduct = async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await this.service.deleteProduct(id);
            createResponse(res, 200, { status: "Exito al eliminar el producto", payload: product });
        } catch (error) {
            next(error);
        }
    };
}

export const productsController = new ProductsController(productsService);