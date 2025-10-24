import { ticketModel } from "../models/ticketModel.js";
import BaseDao from "./baseDao.js";

class TicketDao extends BaseDao {
    constructor(model) {
        super(model);
    }
}

export const ticketDao = new TicketDao(ticketModel);