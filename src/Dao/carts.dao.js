import { Base } from "./base.dao.js";

export class CartsDao extends Base {
    async getByIdPopulate(id) {
        try {
            const result = await this.model.findById(id).populate('products.product').lean();
            return result;
        } catch (error) {
            throw new Error('Error interno en el servidor');
        }
    }

    async updatewithPopulate(id, object) {
        try {
            const result = await this.model.findByIdAndUpdate(id, object, { new: true, runValidators: true }).populate('products.product')
            return result
        } catch (error) {
            throw new Error('Error')
        }
    }

}