import express from "express";
const router = express.Router();
import * as userController from "../controllers/user.controller.js";

router.get('/user', userController.userPage);
// router.post('/login', loginUser);

router.post('/user', userController.createUser);

router.delete('/user/:userId', userController.deleteUser);

// Route for updating password
router.post('/update_password', userController.updateUserPassword);

// Route to update user details
router.post('/update_user', userController.updateUser);

export default router;