import { model, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productsCollection = 'products';

const productSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    code: {type: String},
    stock: {type: Number, required: true},
    category_id: {type: Schema.Types.ObjectId, ref: 'categories', required: true},
    supplier_id: {type: Schema.Types.ObjectId, ref: 'suppliers', required: true},
    status: {type: Boolean, default: true},
    thumbnail: {type: String},
    created_at: {type: Date, default: Date.now}
});

productSchema.plugin(mongoosePaginate);

export const productModel = model(productsCollection, productSchema);