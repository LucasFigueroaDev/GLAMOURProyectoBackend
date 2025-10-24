import {Schema, model} from "mongoose";

const promotionsCollection = 'promotions';

const promotionSchema = new Schema ({
    code: {type: String, unique: true},
    description: {type: String},
    discount_percentage: {type: Number},
    start_date: {type: Date},
    end_date: {type: Date},
    active: {type: Boolean}
});

export const promotionModel = model(promotionsCollection, promotionSchema);