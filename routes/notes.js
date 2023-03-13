const notes = require('express').Router();
const express = require('express');
const uuid = require('../helpers/uuid');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils')

notes.use(express.json());
notes.use(express.urlencoded({ extended: true }));

notes.get("/", (req, res) => {
    readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
  });

notes.post("/", (req, res) => {
  const newNote = req.body;
  newNote.id = uuid.v4();
  readAndAppend(newNote, '../db/db.json');
  res.json(newNote);
  console.info(`${req.method} request received`);
});

notes.delete("/:id", (req, res) => {
  const noteId = req.params.id;
  readFromFile('..db/db.json').then((data) => res.json(JSON.parse(data)));
  const notesUpdated = filter((data) => data.id !== noteId);
  readAndAppend(notesUpdated, "./db/db.json");
  res.json('Note be gone');
  console.info('Note has left the chat');
});

module.exports = notes;