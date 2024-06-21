import express from "express";
const router = express.Router();
import protect from "../config/auth/protect.js";
import {  createKelahiran, deleteKelahiran, getKelahiranById, getKelahiranByIdEdit, kelahiranPage, updateKelahiran } from "../controllers/kelahiran.controller.js";

router.get('/kelahiran',protect, kelahiranPage);
router.post('/post_kelahiran',protect, createKelahiran);
router.delete('/kelahiran/:id', protect,deleteKelahiran);

router.get('/kelahiran/:id',protect, getKelahiranById);

router.get('/kelahiran_edit/:id',protect, getKelahiranByIdEdit);


// Rute untuk memperbarui data kematian berdasarkan id
router.put('/edit_kelahiran/:id_kelahiran',protect, updateKelahiran);
export default router;