import { Schema, model } from "mongoose"; 

const inventoryCollection = 'inventory';

const inventorySchema = new Schema ({
    product_id: { type: Schema.Types.ObjectId, ref: 'products', required: true },
    quantity: { type: Number}, // + para entrada - para salida
    action: { type: String}, // compra, venta, ajuste
    created_at: { type: Date, default: Date.now }
});

export const inventoryModel = model(inventoryCollection, inventorySchema);