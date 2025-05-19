export default class MongoDao {
    constructor(model) {
        this.model = model;
    }

    create = async (body) =>{
        try {
            return await this.model.create(body);
        } catch (error) {
            throw new Error("Error al crear el objeto");
        }
    }

    getAll = async () => {
        try {
            return await this.model.find();
        } catch (error) {
            throw new Error("Error interno en el servidor al obtener todos los objetos");
        }
    }

    getById = async (id) => {
        try {
            return await this.model.findById(id);
        } catch (error) {
            throw new Error("Error interno en el servidor al obtener el objeto por ID");
        }
    }

    update = async (id, body) => {
        try {
            return await this.model.findByIdAndUpdate(id, body, { new: true });
        } catch (error) {
            throw new Error("Error interno en el servidor al actualizar el objeto");
        }
    }

    delete = async (id) => {
        try {
            return await this.model.deleteOne(id);
        } catch (error) {
            throw new Error("Error interno en el servidor al eliminar el objeto");
        }
    }
}   