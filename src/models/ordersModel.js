import mongoose, { model, Schema } from "mongoose";

const ordersCollection = 'orders';

const orderSchema = new Schema({
    client_id: { type: Schema.Types.ObjectId, ref: 'clients', required: true },
    total: {type: number},
    status: {type: String, default: 'pending'},
    created_at: { type: Date, default: Date.now },
    items: [
        {
            product_id: { type: Schema.Types.ObjectId, ref: 'products'},
            quantity: { type: Number},
            price: { type: Number}
        }
    ]
});

export const orderModel = model(ordersCollection, orderSchema);