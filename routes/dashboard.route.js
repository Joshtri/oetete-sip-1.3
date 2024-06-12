import express from "express";
import protect from "../config/auth/protect.js";

const router = express.Router();
import { dashboardPage } from "../controllers/dashboard.controller.js";


router.get('/dashboard',protect, dashboardPage);


export default router;