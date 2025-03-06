export class Base {
    constructor(model) {
        this.model = model
    }

    async getAll() {
        try {
            const result = await this.model.find()
            return result
        } catch (error) {
            throw new Error('Error interno en el servidor');
        }
    }

    async getById(id) {
        try {
            const result = await this.model.findById(id)
            return result
        } catch (error) {
            throw new Error('Error interno en el servidor');
        }
    }

    async create(object) {
        try {
            const result = await this.model.create(object)
            return result
        } catch (error) {
            throw new Error('Error al crear el objeto');
        }
    }

    async update(id, objectUpdate) {
        try {
            const result = await this.model.findByIdAndUpdate(id, objectUpdate, { new: true, runValidators: true });
            return result
        } catch (error) {
            throw new Error('Error interno del servidor');
        }
    }

    async delete(id) {
        try {
            const result = await this.model.deleteOne({ _id: id })
            return result
        } catch (error) {
            throw new Error('Error interno del servidor');
        }
    }
}