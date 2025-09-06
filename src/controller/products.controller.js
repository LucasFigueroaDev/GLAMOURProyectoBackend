import { productsService } from "../services/products.service.js";
import { createResponse } from "../utils/createResponse.js";
import { __dirname } from '../utils/utils.js';


class productsController {
    constructor(service) {
        this.service = service;
    }
    getAllProducts = async (req, res, next) => {
        try {
            let { limit = 10, page = 1, sort = '', category = '', ...filters } = req.query;
            const sortManager = { 'asc': 1, 'desc': -1 };
            limit = parseInt(limit);
            page = parseInt(page);
            if (category) {
                filters.category = category;
            }
            const options = {
                limit,
                page,
                sort: sort ? { price: sortManager[sort] } : {},
                customLabels: { docs: 'payload' }
            };
            const products = await this.service.getAllProducts({ query: filters, options });
            const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;
            const queryParams = new URLSearchParams({ limit, sort, category }).toString();

            const nextPageUrl = products.hasNextPage
                ? `${baseUrl}?page=${products.nextPage}&${queryParams}` : null;

            const prevPageUrl = products.hasPrevPage
                ? `${baseUrl}?page=${products.prevPage}&${queryParams}` : null;
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
            const thumbnail = req.file ? req.file.path.split('public')[1] : null;
            if (req.file) productData = { ...productData, thumbnail: req.file.path.split('public')[1] };
            const product = await this.service.createProduct(req.body);
            createResponse(res, 201, { status: "Exito al crear el producto", payload: product });
        } catch (error) {
            next(error);
        }
    };
    updateProduct = async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await this.service.updateProduct(id, req.body);
            createResponse(res, 200, { status: "Exito al actualizar el producto", payload: product });
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

export const productsController = new productsController(productsService);