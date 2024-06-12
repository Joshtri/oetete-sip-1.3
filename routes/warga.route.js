import { addWargaPage, createWargaController, deleteWarga, wargaPage, getWargaById, getWargaByIdEdit } from "../controllers/warga.controller.js";
import express from "express";
import { getGenderStatistics, getPekerjaanStatistics, getPendidikanStatistics, getStatusPerkawinanStatistics } from "../repositories/warga.repository.js";
// import { getWargaById } from "../repositories/warga.repository.js";


const router = express.Router();

router.get('/warga', wargaPage);
router.post('/post_warga', createWargaController);
router.get('/add_warga', addWargaPage);


router.get('/add_to_warga/:id',addWargaPage);

router.delete('/warga/:id', deleteWarga);
router.get('/warga/:id', getWargaById);
router.get('/warga_edit/:id', getWargaByIdEdit);    

// Rute untuk mendapatkan statistik jenis kelamin
router.get('/gender-statistics', getGenderStatistics);
router.get('/pekerjaan-statistics', getPekerjaanStatistics);
router.get('/pendidikan-statistics', getPendidikanStatistics);
router.get('/perkawinan-statistics', getStatusPerkawinanStatistics);
export default router;