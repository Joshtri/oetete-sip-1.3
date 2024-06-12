import express from "express";
const router = express.Router();
import { createKeluargaController, deleteKeluarga, getKeluargaById, getKeluargaByIdEdit, keluargaPage, updateKeluarga } from "../controllers/keluarga.controller.js";
import { getWargaByKeluargaIdController } from "../controllers/warga.controller.js";

router.get('/kartu_keluarga', keluargaPage);
router.post('/post_kartu_keluarga', createKeluargaController);

router.delete('/kartu_keluarga/:id', deleteKeluarga);
router.get('/kartu_keluarga/:id', getKeluargaById);
router.get('/kartu_keluarga_edit/:id', getKeluargaByIdEdit);

router.get('/anggota_keluarga/:keluargaId', getWargaByKeluargaIdController);

// Rute untuk memperbarui data keluarga berdasarkan id
router.put('/keluarga/:id_keluarga', updateKeluarga);
export default router;