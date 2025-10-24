import { Schema, model } from "mongoose";

const ticketsCollection = 'tickets';

const ticketSchema = new Schema({
    order_id: { type: Schema.Types.ObjectId, ref: 'orders', required: true },
    client_id: { type: Schema.Types.ObjectId, ref: 'clients', required: true },
    ticket_number: {type: String, required: true, unique: true},
    date: { type: Date, default: Date.now },
    payment_method: { type: String, enum: ['cash', 'card', 'transfer'], required: true },
    total: { type: Number, required: true },
    items: [
        {
            product_id: { type: Schema.Types.ObjectId, ref: 'products'},
            quantity: { type: Number}
        }
    ],
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
    created_at: { type: Date, default: Date.now }
});

export const ticketModel = model(ticketsCollection, ticketSchema);