import express from "express";
import { analyzeAndStore } from "../controllers/sentimentController.js";

const router = express.Router();

router.get("/analyze/:symbol", analyzeAndStore);

export default router;
