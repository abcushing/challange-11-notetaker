// global variables
const express = require('express');
const path = require('path');
const fs = require('fs');

// check if port number is available, if not change port or kill port
const app = express();
const PORT = 3001;

app.use(express.static('public'));

app.get('/', (req, res) =>
 res.sendFile('/index.html'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// get request
app.get('/api/notes', (req, res) =>{
fs.readFile('./db/db.json', 'utf8', 
function (err, response){
  res.json(JSON.parse(response))
})
});

// post request
app.post('/api/notes', (req, res) =>{
  fs.readFile('./db/db.json', 'utf8', 
  function (err, response){
   var oldNotes = JSON.parse(response)
req.body.id = oldNotes.length+ 1
   oldNotes.push(req.body)
   console.log(oldNotes)
    
  })
  });

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
