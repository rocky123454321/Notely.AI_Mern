import express from "express";
import { createNote, deleteNote, getAllNotes, updateNote, getNotesById } from "../controllers/notesController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect); // Protect all routes below

router.get("/", getAllNotes);
router.get("/:id", getNotesById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
