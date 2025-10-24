import { Schema, model } from "mongoose";

const clientsCollection = 'clients';
const clientSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    age: {type: Number, required: true},
    address: { type: String, required: true },
    phone: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
})

export const clientModel = model(clientsCollection, clientSchema);