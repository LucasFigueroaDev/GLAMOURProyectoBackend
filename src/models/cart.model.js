import mongoose, { Model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cartsCollection = 'carts';

const cartSchema = new Schema({
    products: {
        type:[{
            quantity: {type: Number, default: 0},
            product: {type: mongoose.Schema.Types.ObjectId, ref: 'products'}
        }]
    }
});

export const cartModel = model(cartsCollection, cartSchema);