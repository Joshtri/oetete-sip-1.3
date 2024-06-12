import express from "express";
import {  createKeluar, deleteKeluar, keluarPage, updateStatusWargaToKeluarController } from "../controllers/keluar.controller.js";
const router = express.Router();

router.get('/keluar', keluarPage);
router.delete('/keluar/:id', deleteKeluar);

router.post('/post_keluar', createKeluar);
// router.get('/check-warga/:id', checkWargaIdExists);
router.post('/update-status-warga-keluar', updateStatusWargaToKeluarController);


export default router;