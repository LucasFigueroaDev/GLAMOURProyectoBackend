import { Schema, model } from "mongoose";

const usersCollection = 'users';

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    reset_password_token: { type: String },
    reset_password_expires: { type: Date },
    role: { type: String, default: 'client' }, // admin, client
    created_at: { type: Date, default: Date.now }
}, { timestamps: true });

export const userModel = model(usersCollection, userSchema);
