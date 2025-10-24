import { orderModel } from "../models/ordersModel.js";
import { MongoDao } from "./mongo.dao.js";

class OrderDao extends MongoDao {
    constructor(model) {
        super(model);
    }
}

export const orderDao = new OrderDao(orderModel);