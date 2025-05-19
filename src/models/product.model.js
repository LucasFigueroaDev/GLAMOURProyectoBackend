import { model, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productsCollection = 'products';

const productSchema = new Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    category: {type: String, require: true},
    status: {type: Boolean, default: true},
    thumbnail : {type: String},
    variants: [
        {
            color: {type: String},
            size: {type: String},
            stock: {type: Number}
        }
    ]
});

productSchema.plugin(mongoosePaginate);

export const productModel = model(productsCollection, productSchema);