// Dependencies/ Directory
// =============================================================
const express = require("express");
const fs = require("fs");
const path = require("path");
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
  const readJSON = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(readJSON);
}

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
  let newNote = req.body;
  let read = readFile();
  read.push(newNote);
  fs.writeFileSync(dbPath, JSON.stringify(read), (err) => {
    if (err) throw err;
  });
  res.send(newNote);
});
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});
