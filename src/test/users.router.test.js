import request from 'supertest';
import { expect } from 'chai';
import { log, error, warn } from '../utils/logger.js';
import app from '../app.js';

describe('users router', () => {
    let testUserId;
    const testUserData = {
        email: 'nOJ2d@example.com',
        password: '1234'
    };

    before(async () => {
        const response = await request(app).post('/api/users/register').send(testUserData);
        expect(response.status).to.equal(201);
        testUserId = response.body.data.payload.id;
        log(`[SETUP] Usuario registrado con ID: ${testUserId}`);
        expect(testUserId).to.be.a('string', 'El ID de usuario no se pudo extraer correctamente.');
    })

    it('GET /api/users/allusers We expect a list of users with status code 200', async () => {
        const response = await request(app).get('/api/users/allusers');
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
    })

    it('GET /api/users/:id We expect a user with status code 200', async () => {
        const response = await request(app).get(`/api/users/${testUserId}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
    })

    it('GET /api/users/:id We expect an error when getting a user with status code 404', async () => {
        const response = await request(app).get('/api/users/000000000000000000000000');
        expect(response.status).to.equal(404);
        expect(response.body).to.be.an('object');
    })

    it('GET /api/users/email/:email We expect a user with status code 200', async () => {
        const response = await request(app).get(`/api/users/email/${testUserData.email}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
    })

    it('POST /api/users/login We expect a successful login from a user with status code 200', async () => {
        const response = await request(app).post('/api/users/login').send(testUserData);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
    })

    it('PUT /api/users/update/:id We expect to update a user with status code 200', async () => {
        const response = await request(app).put(`/api/users/update/${testUserId}`).send({ role: 'admin' });
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
    })

    it('PUT /api/users/update/:id We expect an error when updating a user with an existing email status code 404', async () => {
        const response = await request(app).put(`/api/users/update/${testUserId}`).send({ email: 'test1@correo.com' });
        expect(response.status).to.equal(404);
        expect(response.body).to.be.an('object');
    })

    after(async () => {
        log(`Intentando eliminar usuario ID: ${testUserId}`);
        if (!testUserId) {
            warn('No hay testUserId válido para eliminar. Saltando limpieza.');
            return;
        }
        const deleteResponse = await request(app).delete(`/api/users/delete/${testUserId}`);
        try {
            expect(deleteResponse.status).to.be.oneOf([200, 204],
                `El servidor falló al eliminar el usuario, Status: ${deleteResponse.status}`
            );
            log(`Usuario ${testUserId} eliminado exitosamente (Status ${deleteResponse.status}).`);
        } catch (err) {
            error('ERROR EN LA ELIMINACIÓN:', deleteResponse.body, err);
            throw err; // Lanza el error para que la suite falle si la limpieza falla
        }
    });
})