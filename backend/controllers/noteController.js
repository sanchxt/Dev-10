import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

import User from "../models/userModel.js";
import Note from "../models/notesModel.js";

// @desc create a new note
// @route POST /api/notes
// @access Private
const createNote = asyncHandler(async (req, res) => {
  const { title, content, color } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const note = new Note({
      user: req.user._id,
      title,
      content,
      color,
    });

    const createdNote = await note.save({ session });

    await User.findById(
      req.user._id,
      { $push: { notes: createdNote._id } },
      { new: true, session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(createdNote);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(400);
    throw new Error("Note creation failed");
  }
});

// @desc get user's notes
// @route GET /api/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  if (notes) {
    res.json(notes);
  } else {
    res.json({ message: "No notes found" });
  }
});

// @desc update a note
// @route PUT /api/notes/:id
// @access Private
const updateNote = asyncHandler(async (req, res) => {
  const { title, content, color } = req.body;

  const note = await Note.findById(req.params.id);

  if (note) {
    if (note.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized to update this note");
    }

    note.title = title || note.title;
    note.content = content || note.content;
    note.color = color || note.color;

    const updatedNote = await note.save();
    res.json(updateNote);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

// @desc delete a note
// @route DELETE /api/notes/:id
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note) {
    if (note.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized to delete this note");
    }

    await note.remove();
    res.json({ message: "Note has been removed" });
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

export { createNote, getNotes, updateNote, deleteNote };
