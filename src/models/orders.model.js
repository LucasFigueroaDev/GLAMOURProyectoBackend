import mongoose, { model, Schema } from "mongoose";

const ordersCollection = 'orders';

const orderSchema = new Schema({
    user_id: { type: mongoose.Types.ObjectId, ref: 'users' },
    status: { type: String, default: 'pending', enum: ['pending', 'completed', 'cancelled'] },
    products: [
        {
            product: { type: mongoose.Types.ObjectId, ref: 'products' },
            quantity: { type: Number }
        }
    ],
    total_amount: { type: Number },
    created_at: { type: Date, default: Date.now }
});

export const orderModel = model(ordersCollection, orderSchema);