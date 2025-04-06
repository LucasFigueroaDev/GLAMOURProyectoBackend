import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_KEY, {
            dbName: 'db-Project-CoderHouse-BackEnd-I',
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000
        })
            .then(() => console.log('Conexión a la base de datos exitosa'));
    } catch (error) {
        console.log('Error al conectarse a la base de datos');
    }
};