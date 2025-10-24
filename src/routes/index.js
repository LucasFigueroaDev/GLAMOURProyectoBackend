import { Router } from "express";
import usersRouter from "./usersRouter.js";
import productsRouter from "./productsRouter.js";
import categoriesRouter from "./categoriesRouter.js";
import suppliersRouter from "./suppliersRouter.js";



const router = Router();

router.use("/users", usersRouter);
router.use("/products", productsRouter);
router.use("/categories", categoriesRouter);
router.use("/suppliers", suppliersRouter);



export default router;