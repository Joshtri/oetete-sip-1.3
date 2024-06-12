import express from "express";
const router = express.Router();
import { statisticPage } from "../controllers/statistic.controller.js";

router.get('/statistic', statisticPage);


export default router;