import { Schema, model } from "mongoose";

const paymentsCollection = 'payments';

const paymentSchema = new Schema ({
    order_id: { type: Schema.Types.ObjectId, ref: 'orders', required: true },
    amount: { type: Number, required: true },
    payment_method: { type: String},
    status: { type: String},
    created_at: { type: Date, default: Date.now }
});

export const paymentModel = model(paymentsCollection, paymentSchema);