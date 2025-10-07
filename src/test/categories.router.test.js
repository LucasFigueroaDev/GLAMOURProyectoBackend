import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';

describe('categories router', () => {
    let testCategoryId;
    let testCategoryId2;
    const testCategoryData = {
        name: 'Test Category',
        description: 'This is a test category',
        image: 'https://example.com/test-category.jpg'
    };

    const testCategoryData2 = {
        name: 'Test Category2',
        description: 'This is a test category',
        image: 'https://example.com/test-category.jpg'
    };

    before(async () => {
        const response = await request(app).post('/api/categories/create').send(testCategoryData);
        console.log(response.body);

        expect(response.status).to.equal(201);
        testCategoryId = response.body.data.payload._id;
        console.log(`[SETUP] Categoría creada con ID: ${testCategoryId}`);
        expect(testCategoryId).to.be.a('string', 'El ID de categoría no se pudo extraer correctamente.');
    })

    it('GET /api/categories We expect a list of categories with status code 200', async () => {
        const response = await request(app).get('/api/categories');
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
    })

    it('GET /api/categories/:id We expect a category with status code 200', async () => {
        const response = await request(app).get(`/api/categories/${testCategoryId}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
    })

    it('GET /api/categories/:id We expect an error when getting a category with status code 404', async () => {
        const response = await request(app).get('/api/categories/000000000000000000000000');
        expect(response.status).to.equal(404);
        expect(response.body).to.be.an('object');
    })

    it('PUT /api/categories/update/:id We expect to update a category with status code 200', async () => {
        const response = await request(app).put(`/api/categories/update/${testCategoryId}`).send({ name: 'Test Category Updated' });
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
    })

    it('POST /api/categories/create We expect an error code 400 when creating a category with an existing name (SELF-CHECK)', async () => {
        const selfCheckData = {
            name: 'Categoria SELF-CHECK',
            description: 'Testing duplicate creation within the same test block.',
            image: 'https://example.com/self-check.jpg'
        };
        let selfCheckId;
        try {
            // CREACIÓN EXITOSA
            const createResponse = await request(app).post('/api/categories/create').send(selfCheckData);
            expect(createResponse.status).to.equal(201);
            selfCheckId = createResponse.body.data.payload._id;
            // INTENTO DE DUPLICADO (Debe fallar con 400)
            const duplicateResponse = await request(app).post('/api/categories/create').send(selfCheckData);
            console.log("Respuesta del duplicado:", duplicateResponse.body);
            expect(duplicateResponse.status).to.equal(400);
            expect(duplicateResponse.body).to.be.an('object');
        } finally {
            // LIMPIEZA INMEDIATA
            if (selfCheckId) {
                await request(app).delete(`/api/categories/delete/${selfCheckId}`);
            }
        }
    });

    after(async () => {
        console.log(`[TEARDOWN] Intentando eliminar categoría ID: ${testCategoryId}`);
        if (!testCategoryId) {
            console.log('[TEARDOWN] No hay testCategoryId valido para eliminar. Saltando limpieza.');
            return;
        }
        const deleteResponse = await request(app).delete(`/api/categories/delete/${testCategoryId}`);
        try {
            expect(deleteResponse.status).to.equal(200),
                `El servidor falló al eliminar la categoría, Status: ${deleteResponse.status}`
            console.log(`[TEARDOWN] ✔️ Categoría ${testCategoryId} eliminada exitosamente (Status ${deleteResponse.status}).`);
        } catch (error) {
            console.log('[TEARDOWN] ❌ ERROR EN LA ELIMINACIÓN:', deleteResponse.body);
            throw error;
        }
    })
})