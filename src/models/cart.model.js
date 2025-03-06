import mongoose, { model, Schema } from "mongoose";

const cartsCollection = 'carts';

const cartSchema = new Schema({
    products: {
        type:[{
            quantity: {type: Number, default: 0},
            product: {type: mongoose.Schema.Types.ObjectId, ref: 'products'},
            _id: false
        }]
    }
});

export const cartModel = model(cartsCollection, cartSchema);