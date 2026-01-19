import asyncHandler from "express-async-handler";
import Note from "../models/Note.js";

//GET ALL NOTES
export const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find().sort({createdAt: -1});
  res.status(200).json(notes);
});

//GET NOTE BY ID
export const getNotesById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(404);
    throw new Error("note not found");
  }

  res.status(200).json(note);
});

//CREATE NOTE
export const createNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const note = await Note.create({ title, content });
  res.status(201).json(note);
});


//UPDATE NOTES
export const updateNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  const note = await Note.findByIdAndUpdate(
    req.params.id,
    { title, content },
    { new: true }
  );

  if (!note) {
    res.status(404);
    throw new Error("note not found");
  }

  res.status(200).json(note);
});

//DELETE NOTES
export const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findByIdAndDelete(req.params.id);

  if (!note) {
    res.status(404);
    throw new Error("note not found");
  }

  res.status(200).json({ message: "successfully deleted" });
});
