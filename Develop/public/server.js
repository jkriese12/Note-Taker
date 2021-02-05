// Dependencies/ Directory
// =============================================================
const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("./db.json");
const dbPath = path.join(__dirname, "db.json");
// Sets up the Express App
// =============================================================
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Read and write function
// =============================================================
const readJSON = fs.readFileSync("db.json");
const JSONdata = JSON.parse(readJSON);

// Routes
// =============================================================
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("/api/notes", function (req, res) {
  res.json(JSONdata);
});

// Posts
// =============================================================
app.post("/api/notes", function (req, res) {
  var newNote = req.body;
  // db.push(newNote);
  fs.appendFile("db.json", JSON.stringify(newNote), (err) => {
    if (err) throw err;
    console.log("sent!");
  });
  res.send(newNote);
});
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});
