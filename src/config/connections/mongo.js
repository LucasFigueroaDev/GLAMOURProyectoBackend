import mongoose from 'mongoose';
import { log, error } from '../../utils/logger.js';
import 'dotenv/config';

export const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_KEY, {
            dbName: 'DB-Glamour',
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            maxPoolSize: 10,
            retryWrites: true,
            w: 'majority'
        });
        log('Conexión a la base de datos exitosa');
    } catch (err) {
        error('Error al conectarse a la base de datos', err.message);
        process.exit(1);
    }
};