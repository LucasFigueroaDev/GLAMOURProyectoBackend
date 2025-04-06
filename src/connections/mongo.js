import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_KEY, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            maxPoolSize: 10,
            retryWrites: true,
            w: 'majority'
        })
            .then(() => console.log('Conexión a la base de datos exitosa'));
    } catch (error) {
        console.log('Error al conectarse a la base de datos');
        process.exit(1);
    }
};