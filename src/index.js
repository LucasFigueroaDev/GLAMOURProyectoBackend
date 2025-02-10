import express from "express";
import handlebars from 'express-handlebars';
import productsRouter from '../src/routes/products.route.js';
import cartsRouter from '../src/routes/carts.route.js';
import path from 'path';

const app = express();
const port = 8080;
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(process.cwd(), 'src', 'views'));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', productsRouter);
app.use('/api/carts/', cartsRouter);

app.listen({port}, ()=> {
    console.log(`Servidor On en http://localhost:${port}`);
});

