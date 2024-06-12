import express from "express";
const router = express.Router();
import { loginPage, loginUser } from "../controllers/login.controller.js";

router.get('/', loginPage);
router.post('/login', loginUser);


export default router;