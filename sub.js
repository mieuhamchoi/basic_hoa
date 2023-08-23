"use strict";
class Note {
    constructor(note, id = Date.now() * Math.random()) {
        this.note = note;
        this.id = id;
    }
}
class NoteManager {
    constructor() {
        var _a;
        this.listNote = [];
        let listNoteLocal = JSON.parse((_a = (localStorage.getItem("listNote"))) !== null && _a !== void 0 ? _a : "[]");
        let listNoteTemp = [];
        for (let i in listNoteLocal) {
            listNoteTemp.push(new Note(listNoteLocal[i].note, listNoteLocal[i].id));
        }
        this.listNote = listNoteTemp;
        this.renderNote();
    }
    createNote(newNote) {
        this.listNote.push(newNote);
        localStorage.setItem("listNote", JSON.stringify(this.listNote));
        this.renderNote();
    }
    renderNote() {
        let renderEl = document.querySelector(".note-body");
        let noteEl = ``;
        this.listNote.map((note, index) => {
            noteEl += `
                <div class="item_note">
                    <div class="p">${note.note}</div>
                    <button class="delete" onclick="handleDeleteNote(${note.id})">x</button>
                </div>
            `;
        });
        renderEl.innerHTML = noteEl;
    }
    deleteNote(id) {
        this.listNote = this.listNote.filter(note => note.id != id);
        localStorage.setItem("listNote", JSON.stringify(this.listNote));
        this.renderNote();
    }
}
const listNote = new NoteManager();
console.log("listNote", listNote);
function addNewNote() {
    let noteValue = document.getElementById("note_value").value;
    if (noteValue.trim() === "") {
        return;
    }
    let newNote = new Note(noteValue);
    listNote.createNote(newNote);
    document.getElementById("note_value").value = "";
}
function handleDeleteNote(id) {
    if (confirm("Bạn có muốn xóa không")) {
        listNote.deleteNote(id);
    }
}
