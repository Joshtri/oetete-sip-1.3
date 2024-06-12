import express from "express";
import { deleteMasuk, MasukPage } from "../controllers/masuk.controller.js";

const router = express.Router();

router.get('/masuk', MasukPage);
router.delete('/masuk/:id', deleteMasuk);

export default router;