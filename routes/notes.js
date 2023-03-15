const notes = require('express').Router();
const express = require('express');
const uuidv4 = require('../helpers/uuid');
const path = require('path');
const db = path.join(__dirname, "..", "db", "db.json")
const fs = require('fs');

notes.use(express.json());
notes.use(express.urlencoded({ extended: true }));

notes.get("/", (req, res) => {
    const pageNotes = JSON.parse(fs.readFileSync(db))
    res.json(pageNotes)
  });

notes.post("/", (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();
  const pageNotes = JSON.parse(fs.readFileSync("./db/db.json"));fs.readfi
  pageNotes.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(pageNotes));
  res.json(newNote);
  console.info(`${req.method} request received`);
});

notes.delete("/:id", (req, res) => {
  const noteId = req.params.id;
  const pageNotes = JSON.parse(fs.readFileSync("./db/db.json"));
  const updatedNotes = pageNotes.filter((note) => note.id !== noteId);
  fs.writeFileSync("./db/db.json", JSON.stringify(updatedNotes));
  res.json('Note be gone');
  console.info("Note has left the chat");
});

module.exports = notes;