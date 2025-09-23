import express from "express";
import handlebars from "express-handlebars";
import path from 'node:path';
import cors from 'cors';
import apiRouter from "./routes/index.js";
import { __dirname } from "./utils/utils.js";
import { connectToMongo } from "./config/connections/mongo.js";

const app = express();

app.use(cors({
    origin: 'https://glamour-proyecto-backend.vercel.app/',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '../../public')) 

app.use(express.static('public'));
app.use('/api', apiRouter);

connectToMongo();

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
    
    //console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

export default app;