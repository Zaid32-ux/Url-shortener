import express from "express";
import { createShortUrl, getAllUrls } from "../controllers/urlController.js";

const router = express.Router();

router.post("/shorten", createShortUrl);
router.get("/urls", getAllUrls);

export default router;