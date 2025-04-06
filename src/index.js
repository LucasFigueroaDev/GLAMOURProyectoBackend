import express from "express";
import handlebars from "express-handlebars";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import homeRouter from "./routes/home.router.js";
import path from 'node:path';
import { __dirname } from "./utils/utils.js";
import { connectToMongo } from "./connections/mongo.js";

const app = express();

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '..//public')) 

app.use(express.static('public'));

app.use('/', homeRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts/', cartsRouter);

connectToMongo();

export default app;


