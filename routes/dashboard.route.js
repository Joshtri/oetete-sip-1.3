import express from "express";
import protect from "../config/auth/protect.js";

const router = express.Router();
import { dashboardPage, informasiAkunPage, logoutUser } from "../controllers/dashboard.controller.js";


router.get('/dashboard',protect, dashboardPage);
router.get('/logout', protect, logoutUser);


router.get('/main/informasi_akun', informasiAkunPage);
export default router;