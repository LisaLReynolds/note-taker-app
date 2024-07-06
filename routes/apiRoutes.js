const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// http://localhost:3001/api/notes
router.get("/notes", (req, res) => {
  console.log(req.path);
  // Read the contents of the db.json file
  fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    // Parse the JSON data from the file
    const notes = JSON.parse(data);

    // Send the notes as JSON response
    res.json(notes);
  });
});

// Define the route to add a new note
// http://localhost:3001/api/notes
router.post("/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4(); // Generate a unique ID for the new note

  // Read the contents of the db.json file
  fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // Parse the JSON data from the file
    const notes = JSON.parse(data);

    // Add the new note to the existing notes
    notes.push(newNote);

    // Write the updated notes back to the db.json file
    fs.writeFile(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(notes, null, 2),
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        // Send the new note as JSON response
        res.json(newNote);
      }
    );
  });
});

module.exports = router;
