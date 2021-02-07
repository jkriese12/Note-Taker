// Dependencies/ Directory
// =============================================================
const { notStrictEqual } = require("assert");
const express = require("express");
const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid");
const db = require("./db/db.json");
const dbPath = path.join(__dirname, "./db/db.json");
// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.static("public"));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Read function to get JSON data from db file
// =============================================================
function readFile() {
  const readJSON = fs.readFileSync(dbPath);
  return JSON.parse(readJSON);
}
const getJSON = fs.readFileSync(dbPath);
var parseJSON = JSON.parse(getJSON);

// Routes
// =============================================================
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  let read = readFile();
  res.json(read);
});

// Posts
// =============================================================
app.post("/api/notes", function (req, res) {
  let newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uniqid(),
  };
  let read = readFile();
  read.push(newNote);

  fs.writeFileSync(dbPath, JSON.stringify(read), (err) => {
    if (err) throw err;
  });
  res.send(newNote);
});
// Deleting a note
// =============================================================
app.delete("/api/notes:id"), function (req, res) {};

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});
