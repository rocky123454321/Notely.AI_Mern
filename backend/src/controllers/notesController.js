import asyncHandler from "express-async-handler";
import Note from "../models/Note.js";

// GET all notes for logged-in user
export const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json(notes);
});

// GET note by ID for logged-in user
export const getNotesById = asyncHandler(async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id, userId: req.user._id });
  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }
  res.status(200).json(note);
});

// CREATE note for logged-in user
export const createNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const note = await Note.create({ title, content, userId: req.user._id });
  res.status(201).json(note);
});

// UPDATE note for logged-in user
export const updateNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    { title, content },
    { new: true }
  );
  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }
  res.status(200).json(note);
});

// DELETE note for logged-in user
export const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }
  res.status(200).json({ message: "Successfully deleted" });
});
