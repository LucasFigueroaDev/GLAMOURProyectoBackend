import express from "express";
import productsRouter from '../src/routes/products.route.js';

const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products/', productsRouter);

app.listen({port}, ()=> {
    console.log(`Servidor On en http://localhost:${port}`);
    
});

