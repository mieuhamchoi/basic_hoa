class Note {
    id: number;
    note: string

    constructor (note:string,id: number = Date.now() * Math.random()) {
        this.note=note;
        this.id=id;
    }
}
class NoteManager{
    listNote: Note[] = [];
    constructor(){
        let listNoteLocal = JSON.parse((localStorage.getItem("listNote")) ?? "[]");
        let listNoteTemp = []
        for(let i in listNoteLocal){
            listNoteTemp.push(new Note(listNoteLocal[i].note,listNoteLocal[i].id))
        }
        this.listNote = listNoteTemp
        this.renderNote();
    }
    createNote(newNote:Note){
        this.listNote.push(newNote);
        localStorage.setItem("listNote", JSON.stringify(this.listNote));
        this.renderNote();
    }
    renderNote():void{
        let renderEl = document.querySelector(".note-body") as HTMLElement;
        let noteEl = ``;
        this.listNote.map((note,index) => {
            noteEl += `
                <div class="item_note">
                    <div class="p">${note.note}</div>
                    <button class="delete" onclick="handleDeleteNote(${note.id})">x</button>
                </div>
            `
        });
        renderEl.innerHTML = noteEl
    }
    deleteNote(id:number){
        this.listNote = this.listNote.filter(note => note.id != id);
        localStorage.setItem("listNote", JSON.stringify(this.listNote));
        this.renderNote();
    }
}
const listNote = new NoteManager();
console.log("listNote", listNote)

function addNewNote(){
    let noteValue = (document.getElementById("note_value") as HTMLInputElement).value;
        if (noteValue.trim() === "") {
       
        return; 
    }
    let newNote =  new Note(noteValue);
    listNote.createNote(newNote);
    (document.getElementById("note_value") as HTMLInputElement).value =""
}

function handleDeleteNote(id:number) {
    if(confirm("Bạn có muốn xóa không")){
        listNote.deleteNote(id);
    }
}