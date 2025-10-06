class BaseDao {
    constructor(model) {
        this.model = model;
    }
    
    getAll = async () => {
        return await this.model.find();
    }

    create = async (body) =>{
        return await this.model.create(body);
    }

    getById = async (id) => {
        return await this.model.findById(id);
    }

    update = async (id, body) => {
        return await this.model.findByIdAndUpdate(id, body, { new: true });
    }

    delete = async (id) => {
        return await this.model.findByIdAndDelete(id);
    }
}   

export default BaseDao;