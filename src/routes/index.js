import { Router } from "express";
import usersRouter from "./users.router.js";
import productsRouter from "./products.router.js";



const router = Router();

router.use("/users", usersRouter);
router.use("/products", productsRouter);



export default router;