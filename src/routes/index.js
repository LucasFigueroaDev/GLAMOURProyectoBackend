import { Router } from "express";
import usersRouter from "./usersRouter.js";
import productsRouter from "./products.router.js";
import categoriesRouter from "./categories.router.js";
import suppliersRouter from "./suppliers.router.js";



const router = Router();

router.use("/users", usersRouter);
router.use("/products", productsRouter);
router.use("/categories", categoriesRouter);
router.use("/suppliers", suppliersRouter);



export default router;