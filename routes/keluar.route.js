import express from "express";
import protect from "../config/auth/protect.js";

import {  createKeluar, deleteKeluar, getKeluarById, getKeluarByIdEdit, keluarPage, updateKeluar, updateStatusWargaToKeluarController } from "../controllers/keluar.controller.js";
const router = express.Router();

router.get('/keluar', protect,keluarPage);
router.delete('/keluar/:id', protect,deleteKeluar);

router.post('/post_keluar', protect,createKeluar);
// router.get('/check-warga/:id', checkWargaIdExists);
router.post('/update-status-warga-keluar', protect,updateStatusWargaToKeluarController);

router.get('/keluar/:id',protect,getKeluarById);    
router.get('/keluar_edit/:id',protect,getKeluarByIdEdit);

// Rute untuk memperbarui data kematian berdasarkan id
router.put('/edit_keluar/:id_keluar', protect,updateKeluar);



export default router;