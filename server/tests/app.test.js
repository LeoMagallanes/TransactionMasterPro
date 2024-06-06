import app from "../src/app.js";
import request from "supertest";
import mongoose from "mongoose";

// Variables para almacenar el servidor y el puerto
let server;
const port = app.get('port');

// Antes de ejecutar los tests, conectarse a la base de datos y levantar el servidor
beforeAll((done) => {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        server = app.listen(port, () => {
            global.agent = request.agent(server);
            done();
        });
    });
}, 10000);  // 10000 ms es el tiempo de espera máximo

// Después de ejecutar todos los tests, cerrar el servidor y desconectarse de la base de datos
afterAll(async () => {
    await server.close();
    await mongoose.disconnect();
});

// Test para verificar que el servidor está corriendo correctamente
describe('GET /api', () => {
    test('should respond with a 200 status code', async () => {
        const response = await request(app).get('/api').send();
        // Verificar que el código de estado sea 200
        expect(response.statusCode).toBe(200);
    });
});

// Test para checar la información del cliente usando su número de cuenta
describe('POST /client', () => {
    test('should respond with a 200 status code with an array', async () => {
        const response = await request(app).post('/api/client').send({ account_number: "239413087210" });
        // Verificar que el código de estado sea 200 y que la respuesta sea un array
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
});

// Test para verificar el inicio de sesión del cliente con usuario y contraseña
describe('POST /client/login', () => {
    test('should respond with a 200 status code and the account_number found', async () => {
        const response = await request(app).post('/api/client/login').send({ username: "a0236887", password: "abc123" });
        // Verificar que el código de estado sea 200 y que el texto de respuesta sea el número de cuenta
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("415283139661");
    });
});

// Test para realizar una transferencia entre cuentas
describe('POST /transfer', () => {
    test('should respond with a 200 status code', async () => {
        const response = await request(app).post('/api/transfer').send({ client_account: "239413087210", to_account_number: '149429081264', amount: '300' });
        // Verificar que el código de estado sea 200
        expect(response.statusCode).toBe(200);
    });
});

// Test para checar las transacciones de una cuenta de cliente específica
describe('POST /transaction', () => {
    test('should respond with a 200 status code with an array', async () => {
        const response = await request(app).post('/api/client').send({ client_account: "239413087210" });
        // Verificar que el código de estado sea 200 y que la respuesta sea un array
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
});