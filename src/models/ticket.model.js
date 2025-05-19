import { Schema, model } from "mongoose";

const ticketsCollection = 'tickets';

const ticketSchema = new Schema({
    code: { type: String, require: true, unique: true },
    purchase_datetime: { type: Date, require: true },
    amount: { type: Number, require: true },
    purchaser: { type: String, require: true }
});

export const ticketModel = model(ticketsCollection, ticketSchema);