import { Schema, model } from "mongoose";

const cartsCollection = 'carts';

const cartSchema = new Schema ({
    client_id: { type: Schema.Types.ObjectId, ref: 'clients', required: true },
    items: [
        {
            product_id: { type: Schema.Types.ObjectId, ref: 'products'},
            quantity: { type: Number},
        }
    ],
    added_at: { type: Date, default: Date.now }
});

export const cartModel = model(cartsCollection, cartSchema);
