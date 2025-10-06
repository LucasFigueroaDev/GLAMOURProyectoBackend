import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';

describe('products router', () => {
    let testProductId;
    let testProductId2;
    let testProductId3;
    const testProductData = {
        title: 'Test Product',
        description: 'This is a test product',
        price: 9.99,
        code: 'TEST123',
        stock: 10,
        category_id: '000000000000000000000000',
        supplier_id: '000000000000000000000000'
    };

    const testProductData2 = {
        title: 'Test Product 2',
        description: 'This is a test product 2',
        price: 9.99,
        code: 'TEST123',
        stock: 10,
        category_id: '000000000000000000000000',
        supplier_id: '000000000000000000000000'
    };

    const testProductData3 = {
        title: 'Test Product 3',
        description: 'This is a test product 3',
        price: 9.99,
        code: 'TEST123',
        stock: 10,
        category_id: '000000000000000000000000',
        supplier_id: '000000000000000000000000'
    };

    before(async () => {
        const response = await request(app).post('/api/products/create').send(testProductData);
        console.log('Response:', response.status, response.body);
        expect(response.status).to.equal(201);
        testProductId = response.body.data.payload.id;
        console.log(`[SETUP] Producto creado con ID: ${testProductId}`);
        expect(testProductId).to.be.a('string', 'El ID de producto no se pudo extraer correctamente.');
    })

    it('GET /api/products/ We expect a list of products with status code 200', async () => {
        const response = await request(app).get('/api/products');
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
    })

    it('GET /api/products/:id We expect a product with status code 200', async () => {
        const response = await request(app).get(`/api/products/${testProductId}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
    })

    it('GET /api/products/:id We expect an error when getting a product with status code 404', async () => {
        const response = await request(app).get('/api/products/000000000000000000000000');
        expect(response.status).to.equal(404);
        expect(response.body).to.be.an('object');
    })

    it('PUT /api/products/:id We expect to update a product with status code 200', async () => {
        const response = await request(app).put(`/api/products/${testProductId}`).send({ title: 'Test Product Updated' });
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
    })

    it('PUT /api/products/:id We expect an error when updating a product with status code 404', async () => {
        const response = await request(app).put('/api/products/000000000000000000000000').send({ title: 'Test Product Updated' });
        expect(response.status).to.equal(404);
        expect(response.body).to.be.an('object');
    })

    it('PUT /api/products/delete/:id We hope to decommission a product with status code 200', async () => {
        const response = await request(app).put(`/api/products/delete/${testProductId}`);
        console.log('Response softdeleteproduct:', response.status, response.body);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
    })

    it('POST /api/products/insertMany We expect to insert many products with status code 201', async () => {
        const response = await request(app).post('/api/products/insertMany').send([testProductData2, testProductData3]);
        testProductId2 = response.body.data.payload[0].id;
        testProductId3 = response.body.data.payload[1].id;
        console.log(`[SETUP] Productos creados con ID: ${testProductId2} y ${testProductId3}`);
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');
    })

    it('DELETE /api/products/:id We hope to delete a product with status code 200', async () => {
        const response = await request(app).delete(`/api/products/${testProductId2}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
    })

    it('DELETE /api/products/:id We hope to delete a product with status code 200', async () => {
        const response = await request(app).delete(`/api/products/${testProductId3}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
    })

    after(async () => {
        console.log(`[TEARDOWN] Intentando eliminar producto ID: ${testProductId}`);
        if (!testProductId) {
            console.log('[TEARDOWN] No hay testProductId valido para eliminar. Saltando limpieza.');
            return;
        }
        const deleteResponse = await request(app).delete(`/api/products/${testProductId}`);
        try {
            expect(deleteResponse.status).to.equal(200),
                `El servidor falló al eliminar el producto, Status: ${deleteResponse.status}`
            console.log(`[TEARDOWN] ✔️ Producto ${testProductId} eliminado exitosamente (Status ${deleteResponse.status}).`);
        } catch (error) {
            console.log('[TEARDOWN] ❌ ERROR EN LA ELIMINACIÓN:', deleteResponse.body);
            throw error;
        }
    })
})