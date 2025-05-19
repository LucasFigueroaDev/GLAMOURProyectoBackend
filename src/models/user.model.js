import { Schema, model } from "mongoose";

const usersCollection = 'users';

const userSchema = new Schema({
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    age: { type: Number, require: true },
    email: { type: String, require: true, unique: true },
    phone: { type: String, require: true },
    password: { type: String, require: true },
    reset_password_token: { type: String },
    reset_password_expires: { type: Date },
    address: { 
        street: { type: String }, // calle
        city: { type: String }, // ciudad
        country: { type: String }, // país
        zip: { type: String } // código postal
    },
    role: { type: String, default: 'user' }
}, { timestamps: true });

export const userModel = model(usersCollection, userSchema);
