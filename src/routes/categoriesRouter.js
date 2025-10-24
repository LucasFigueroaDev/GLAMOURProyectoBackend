import { Router } from "express";
import { categoriesController } from "../controller/categoriesController.js";

const router = Router();

router.get('/', categoriesController.getAllCategories);
router.get('/:id', categoriesController.getCategoryById);
router.post('/create', categoriesController.createCategory);
router.put('/update/:id', categoriesController.updateCategory);
router.delete('/delete/:id', categoriesController.deleteCategory);

export default router;