import express from "express";
import { addKematianPage, createKematian, deleteKematian, getKematianById, getKematianByIdEdit, kematianPage, updateStatusWargaToMeninggalController } from "../controllers/kematian.controller.js";
const router = express.Router();


router.get('/kematian',kematianPage);
router.get('/add_kematian',addKematianPage);
router.post('/post_kematian', createKematian);



router.delete('/kematian/:id', deleteKematian);

router.get('/kematian/:id', getKematianById);
router.post('/update-status-warga-meninggal', updateStatusWargaToMeninggalController);

router.get('/kematian_edit/:id', getKematianByIdEdit);

export default router;