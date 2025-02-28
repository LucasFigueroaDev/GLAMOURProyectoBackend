import express from "express";
import handlebars from "express-handlebars";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import realtime from "./routes/realtime.router.js";
import homeRouter from "./routes/home.router.js";
import { __dirname } from "./utils/utils.js";
import { connectToMongo } from "./connections/mongo.js";
import { productController } from "./controllers/productController.js";
import { Server } from "socket.io";

const app = express();
const port = 8080;


app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + 'views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public')) 

app.use(express.static('public'));

app.use('/', homeRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts/', cartsRouter);
app.use('/realtimeproducts', realtime);

connectToMongo();

// WebSocket Server
const httpServer = app.listen(port, () => console.log(`Servidor On en http://localhost:${port}`));
const webSocketServer = new Server(httpServer);

webSocketServer.on('connection', async (socket) => {
    console.log(`Nuevo dispositivo conectado ID: ${socket.id}`);

    // Obtener todos los productos loadProducts de productController
    const productsList = await productController.loadProducts();

    // Envía la lista de productos al cliente
    socket.emit('home', productsList);
    socket.emit('realTime', productsList);

    // Escucha de eventos
    socket.on('new-product', async (product) =>{ // Evento para crear producto
        await productController.createProduct(product);
        const updatedProductsList = await productController.loadProducts();
        
        webSocketServer.emit('realTime', updatedProductsList);
    });
    socket.on('update-product', async (product)=>{ // Evento modificar producto
        const {id, key, newValue } = product
        await productController.updateProduct(id, key, newValue);
        const updatedProductsList = await productController.loadProducts();
        
        webSocketServer.emit('realTime', updatedProductsList);
    });
    socket.on('delete-product', async (productId)=>{ // Evento eliminar producto
        await productController.deleteProduct(productId);
        const updatedProductsList = await productController.loadProducts();
        
        webSocketServer.emit('realTime', updatedProductsList);
    });

});


