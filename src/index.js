import express from "express";
import handlebars from 'express-handlebars';
import realTimeProductsRouter from '../src/routes/realTimeProducts.route.js';
import productsRouter from '../src/routes/products.route.js';
import cartsRouter from '../src/routes/carts.route.js';
import path from 'path';
import { Server } from "socket.io";

const app = express();
const port = 8080;
const servertHttp = app.listen({port}, ()=> console.log(`Servidor On en http://localhost:${port}`));
const webSocketServer = new Server(servertHttp);

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(process.cwd(), 'src', 'views'));
app.set('view engine', 'handlebars');
app.set('webSocketServer', webSocketServer);
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', productsRouter);
app.use('/api/carts/', cartsRouter);
app.use('/api/realTimeProducts', realTimeProductsRouter);

webSocketServer.on('connection', async (socket) => {
    console.log('Nuevo dispositivo conectado');

});


