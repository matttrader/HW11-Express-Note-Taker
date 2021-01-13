const util = require("util");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


class Notes {
    read() {
        return readFile("db/db.json", "utf8")
    }
    write(note) {
        return writeFile("db/db.json", JSON.stringify(note))
    }
    getAllNotes() {
        return this.read().then(notes => {
            let readNotes;

            try {
                readNotes = [].concat(JSON.parse(notes))
            } catch (error) {
                readNotes = [];
            }

            return readNotes;
        })
    }
    addNote(note) {
        const { title, text } = note;
        const newNotes = {title, text, id: uuidv4()}


        return this.getAllNotes().then(notes => [...notes, newNotes]).then(newNotesARR => this.write (newNotesARR)).then(()=>newNotes)
    }
    deleteNote(id) {
        return this.getAllNotes().then(notes => notes.filter(note => note.id !== id)).then(filterNotes => this.write(filterNotes))
    }
}

module.exports = new Notes();