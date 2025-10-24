import { orderModel } from "../models/ordersModel.js";
import BaseDao from "./baseDao.js";
class OrderDao extends BaseDao {
    constructor(model) {
        super(model);
    }
}

export const orderDao = new OrderDao(orderModel);