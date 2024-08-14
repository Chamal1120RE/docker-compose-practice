const express = require("express");
const mongoose = require("mongoose");
// const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, BK_PORT, DB_NAME } = process.env;

const PORT = BK_PORT || 5000;

const MONGO_URI = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;


// app.use(cors({
//     origin: 'http://localhost', // or whatever your frontend URL is
//     methods: ['GET', 'POST'],
// }));

app.use(express.json());

mongoose
  .connect(MONGO_URI, {})
  .then(() => console.log("MongoDB connected!!😎 (with mongoose)"))
  .catch((err) => console.log(err));

const NoteSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Note = mongoose.model("Note", NoteSchema);

app.get("/api/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.post("/api/notes", async (req, res) => {
  try {
    const newNote = new Note({
      title: req.body.title,
      content: req.body.content,
    });
    const savedNote = await newNote.save();
    res.json(savedNote);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
