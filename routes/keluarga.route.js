import express from "express";
const router = express.Router();
import protect from "../config/auth/protect.js";

import { createKeluargaController, deleteKeluarga, getKeluargaById, getKeluargaByIdEdit, keluargaPage, updateKeluarga } from "../controllers/keluarga.controller.js";
import { getWargaByKeluargaIdController } from "../controllers/warga.controller.js";

router.get('/kartu_keluarga',protect, keluargaPage);
router.post('/post_kartu_keluarga',protect, createKeluargaController);

router.delete('/kartu_keluarga/:id',protect, deleteKeluarga);
router.get('/kartu_keluarga/:id',protect, getKeluargaById);
router.get('/kartu_keluarga_edit/:id',protect, getKeluargaByIdEdit);

router.get('/anggota_keluarga/:keluargaId',protect, getWargaByKeluargaIdController);

// Rute untuk memperbarui data keluarga berdasarkan id
router.put('/keluarga/:id_keluarga',protect, updateKeluarga);
export default router;