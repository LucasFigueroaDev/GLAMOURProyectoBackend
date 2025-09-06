import { Schema, model } from "mongoose";

const productSoldCollection = 'productSold';

const productSoldSchema = new Schema({
    product_id: {type: Schema.Types.ObjectId, ref: 'products', required: true},
    total_sold: {type: Number},
    last_sold_at: {type: Date, default: Date.now}
});

export const productSoldModel = model(productSoldCollection, productSoldSchema);