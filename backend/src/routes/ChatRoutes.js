import express from "express";
import { getChats, sendMessage } from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect); // Protect all routes

router.get("/", getChats);
router.post("/", sendMessage);

export default router;
