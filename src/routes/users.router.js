import { Router } from "express";
import { usersController } from "../controller/users.controller.js";

const router = Router();

router.get('/allusers', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.get('/email/:email', usersController.getUserByEmail);
router.post('/register', usersController.createUser);
router.put('/update/:id', usersController.updateUser);
router.delete('/delete/:id', usersController.deleteUser);

export default router;