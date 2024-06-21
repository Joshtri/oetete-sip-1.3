import { addWargaPage, createWargaController, deleteWarga, wargaPage, getWargaById, getWargaByIdEdit, getWargaToMasuk, updateWarga } from "../controllers/warga.controller.js";
import express from "express";
import { getGenderStatistics, getPekerjaanStatistics, getPendidikanStatistics, getStatusPerkawinanStatistics } from "../repositories/warga.repository.js";
// import { getWargaById } from "../repositories/warga.repository.js";
import protect from "../config/auth/protect.js";


const router = express.Router();

router.get('/warga', protect,wargaPage);
router.post('/post_warga', protect,createWargaController);
router.get('/add_warga', protect,addWargaPage);


//alternatif ways to add warga from keluarga.
router.get('/add_to_warga/:id',protect,addWargaPage);

router.delete('/warga/:id', protect,deleteWarga);
router.get('/warga/:id', protect,getWargaById);
router.get('/warga_edit/:id', protect,getWargaByIdEdit);
router.get('/add_to_masuk/:id', protect,getWargaToMasuk);



// Rute untuk mendapatkan statistik jenis kelamin
router.get('/gender-statistics', protect,getGenderStatistics);
router.get('/pekerjaan-statistics', protect,getPekerjaanStatistics);
router.get('/pendidikan-statistics', protect,getPendidikanStatistics);
router.get('/perkawinan-statistics', protect,getStatusPerkawinanStatistics);


// Rute untuk memperbarui data keluarga berdasarkan id
router.put('/edit_warga/:id_warga', protect,updateWarga);

export default router;