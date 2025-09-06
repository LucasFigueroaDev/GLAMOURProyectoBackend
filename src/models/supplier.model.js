import { Schema, model } from "mongoose";

const suppliersCollection = 'suppliers';

const suppliersSchema = new Schema ({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
})

export const supplierModel = model(suppliersCollection, suppliersSchema);