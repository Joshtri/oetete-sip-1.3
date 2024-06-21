import express from "express";
import { addKematianPage, createKematian, deleteKematian, getKematianById, getKematianByIdEdit, kematianPage, updateKematian, updateStatusWargaToMeninggalController } from "../controllers/kematian.controller.js";
const router = express.Router();

import protect from "../config/auth/protect.js";


router.get('/kematian',protect,kematianPage);
router.get('/add_kematian',protect,addKematianPage);
router.post('/post_kematian',protect, createKematian);



router.delete('/kematian/:id', protect,deleteKematian);

router.get('/kematian/:id', protect,getKematianById);
router.post('/update-status-warga-meninggal', protect,updateStatusWargaToMeninggalController);

router.get('/kematian_edit/:id', protect,getKematianByIdEdit);


// Rute untuk memperbarui data kematian berdasarkan id
router.put('/edit_kematian/:id_kematian', protect,updateKematian);
export default router;