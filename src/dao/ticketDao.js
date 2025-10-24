import { ticketModel } from "../models/ticketModel.js";
import { MongoDao } from "./mongo.dao.js";

class TicketDao extends MongoDao {
    constructor(model) {
        super(model);
    }
}

export const ticketDao = new TicketDao(ticketModel);