import { Schema, model } from "mongoose";

const shipmentsCollection = 'shipments'; // envios

const shipmentSchema = new Schema({
    order_id: { type: Schema.Types.ObjectId, ref: 'orders', required: true },
    carrier: { type: String },
    tracking_number: { type: String },
    status: {type: String},
    shipped_at: { type: Date},
    delivered_at: { type: Date}
});

export const shipmentModel = model(shipmentsCollection, shipmentSchema);