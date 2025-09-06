// Importa supertest para hacer peticiones HTTP al servidor Express
import request from 'supertest';
// Importa chai para hacer aserciones (expect)
import * as chai from 'chai';
// Importa la aplicación Express desde el archivo principal del servidor
import app from '../index.js';

// Obtiene la función expect de chai para las aserciones
const expect = chai.expect;

// Grupo de pruebas para el endpoint POST /login
describe('POST /login', () => {
    // Prueba: rechaza credenciales incorrectas
    it('debe rechazar credenciales incorrectas', async () => {
        // Envía una petición POST con correo y password inválidos
        const res = await request(app)
        .post('/login')
        .send({ correo: 'noexiste@mail.com', password: '12345' });
        // Espera que el status sea 401 (no autorizado)
        expect(res.status).to.equal(401);
        // Espera que el mensaje de error sea el esperado
        expect(res.body.error).to.equal('Credenciales incorrectas');
    });

    // Prueba: permite login con credenciales correctas
    it('debe permitir login con credenciales correctas', async () => {
        // Envía una petición POST con correo y password válidos (usuario real en la BD)
        const res = await request(app)
        .post('/login')
        .send({ correo: 'elproxd@gmail.com', password: '1234' }); // Cambia por un usuario real de tu BD
        // Espera que el status sea 200 (OK)
        expect(res.status).to.equal(200);
        // Espera que la respuesta tenga las propiedades esperadas
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('nombres');
        expect(res.body).to.have.property('id_rol');
    });

    // Prueba: rechaza login si faltan campos
    it('debe rechazar login si faltan campos', async () => {
        // Envía una petición POST con campos vacíos
        const res = await request(app)
        .post('/login')
        .send({ correo: '', password: '' });
        // Espera que el status sea 400 (bad request) o 401 (no autorizado)
        expect(res.status).to.be.oneOf([400, 401]);
    });
});