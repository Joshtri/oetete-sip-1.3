import express from "express";
import { createMasuk, deleteMasuk, MasukPage } from "../controllers/masuk.controller.js";
import protect from "../config/auth/protect.js";


const router = express.Router();

router.get('/masuk', protect,MasukPage);
router.delete('/masuk/:id',protect, deleteMasuk);
router.post('/post_masuk',protect,createMasuk);

export default router;