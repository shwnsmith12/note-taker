// Dependencies
const router = require('express').Router();
const saveData = require('../db/saveData');

// This is the Get Request, with a catch error throw in case of unexpected issues
router.get('/notes', function (req, res) {
    saveData
        .retrieveNotes()
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err));
});

// This is the Post Request, with a catch error throw in case of unexpected issues
router.post('/notes', (req, res) => {
    saveData
        .addNote(req.body)
        .then((note) => res.json(note))
        .catch(err => res.status(500).json(err));
});

module.exports = router;