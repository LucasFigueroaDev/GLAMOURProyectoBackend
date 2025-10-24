import { Schema, model } from "mongoose";

const reviewsCollection = 'reviews';

const reviewSchema = new Schema ({
    client_id: { type: Schema.Types.ObjectId, ref: 'clients', required: true },
    product_id: { type: Schema.Types.ObjectId, ref: 'products', required: true },
    rating: { type: Number },
    comment: { type: String },
    created_at: { type: Date, default: Date.now }
});

export const reviewModel = model(reviewsCollection, reviewSchema);