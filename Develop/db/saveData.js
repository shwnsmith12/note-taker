// Dependencies
const util = require('util');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { json } = require('express');

const readNote = util.promisify(fs.readFile);
const writeNote = util.promisify(fs.writeFile);

class Save {
    write(note) {
        return writeNote('db/db.json', JSON.stringify(note));
    }
    read() {
        return readNote('db/db.json', 'utf8');
    }
    getNotes() {
        return this.read().then(notes => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }
            return parsedNotes;
        });
    }

    addNote(note) {
        const {title, text} = note;
        if (!title || !text) {
            throw new Error('Neither "Title" nor "Text" can be left blank. Please fill out properly');
        }

        const newNote = { title, text, id: uuidv4() };

        return this.getNotes()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => newNote);
    }}

    module.exports = new Save();