// global variables
const express = require("express");
const path = require("path");
const fs = require("fs");

// check if port number is available, if not change port or kill port
const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => res.sendFile("/index.html"));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

// get request
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", function (err, response) {
    console.log("response= ", response);
    res.json(JSON.parse(response));
  });
});

// post request
app.post("/api/notes", (req, res) => {
  console.log("req.body = ", req.body);
  fs.readFile("./db/db.json", "utf8", function (err, response) {
    var oldNotes = JSON.parse(response);
    var id = oldNotes.length + 1;
    console.log("id= ", id);
    req.body.id = id;
    console.log(req.body);
    oldNotes.push(req.body);
    console.log(oldNotes);
    fs.writeFile(
      "./db/db.json",
      JSON.stringify(oldNotes),
      function (err, response) {
        console.log(err);
        console.log(response);
        res.json({ message: "note added " });
      }
    );
  });
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
