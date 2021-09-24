const express = require('express');
const path = require ('path');
const {v4: uuidv4} = require ('uuid');

const fs = require ('fs');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get("/api/notes", function (req, res) {
    fs.readFile("db/db.json", 'utf8', function (err, data) {
        res.json(JSON.parse(data));
    });
});

app.post('/api/notes', (req, res) => {
    const title = req.body.title;
    const text = req.body.text;
    const newNote = {
        title, 
        text, 
        v4: uuidv4()
    };
    fs.readFile('./db/db.json', function(err, data){
        const currNote = JSON.parse(data);
        currNote.push(newNote);
        fs.writeFile('./db/db.json', [JSON.stringify(currNote)], function (err){
            console.log(newNote);
        })
        res.sendFile(path.join(__dirname, '/public/notes.html'));
    })
})

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen (PORT, () =>
  console.log(`listening at http://localhost:${PORT}`)
);


