import express from "express";
const router = express.Router();
import {  createKelahiran, deleteKelahiran, getKelahiranById, getKelahiranByIdEdit, kelahiranPage } from "../controllers/kelahiran.controller.js";

router.get('/kelahiran', kelahiranPage);
router.post('/post_kelahiran', createKelahiran);
router.delete('/kelahiran/:id', deleteKelahiran);

router.get('/kelahiran/:id', getKelahiranById);

router.get('/kelahiran_edit/:id', getKelahiranByIdEdit);

export default router;