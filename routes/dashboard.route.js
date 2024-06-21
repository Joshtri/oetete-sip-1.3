import express from "express";
import protect from "../config/auth/protect.js";

const router = express.Router();
import { dashboardPage, logoutUser } from "../controllers/dashboard.controller.js";


router.get('/dashboard',protect, dashboardPage);
router.get('/logout', logoutUser);

export default router;