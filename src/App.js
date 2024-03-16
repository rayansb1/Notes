import React, {useState, useEffect} from 'react';
import './App.css';
import Preview from './component/Preview';
import NotesContainer from './component/Notes/NotesContainer'
import NotesList from './component/Notes/NotesList';
import Note from './component/Notes/Note';
import SuccessLogin from './component/SuccessLogin'
import Go from './Go.png';
function App() {
// Add sates
const [notes, setNotes] = useState([]);
const [title, setTitle] = useState('');
const [content, setContent] = useState('');
const [selectedNote, setSelectedNote] = useState(null);
const [creating, setCreating] = useState(false);
const [editing, setEditing] = useState(false);
const [login, setLogin] = useState(false);
const [password, setPassword] = useState();

// Save to localStorage
useEffect( () => {
  if(localStorage.getItem('notes')){
  setNotes(JSON.parse(localStorage.getItem('notes')));}
  else{
    localStorage.setItem('notes', JSON.stringify([]));
  }
}, []);
const save = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

// Show the add note page
const addNote = () =>{
  setCreating(true);
}

// Save title
const saveTitle = (event) =>{
  setTitle(event.target.value)
}

// Save content
const saveContent = (event) =>{
  setContent(event.target.value)
}

// Save password
const savePassword = (event) =>{
  setPassword(event.target.value)
}
// Save note to the notes array
const addNoteToNotesArray = () => {
const note = {
  id: new Date(),
  title: title,
  content: content
}

const updateArrayNotes = [...notes, note];

save('notes' ,updateArrayNotes);
setNotes(updateArrayNotes);
setCreating(false);
setSelectedNote(note.id);
setTitle('');
setContent('');
}

// Preview the selected note
const previewSelectedNote = noteId => {
  setSelectedNote(noteId);
}

// Delete note from the notes array
const deleteNote = () => {
  const updateArrayNotes =[...notes];
  const noteIndex = updateArrayNotes.findIndex(note => note.id === selectedNote);
  notes.splice(noteIndex,1);
  save('notes' ,notes);
  setNotes(notes);
  setSelectedNote(null);
}


  const getAddNote = () => {
    return (
      <div>
        <h2>إضافة ملاحظة جديدة</h2>
        <div>
          <input
            type="text"
            name="title"
            className="form-input mb-30"
            placeholder="العنوان"
            value={title}
            onChange={saveTitle}
          />

          <textarea
            rows="10"
            name="content"
            className="form-input"
            placeholder="النص"
            value={content}
            onChange={saveContent}
          />

          <a href="#" className="button green" onClick={addNoteToNotesArray}>
            حفظ
          </a>
        </div>
      </div>
    );
  };




  const getPreview = () => {

    if(notes.length === 0){
      return <h2 className="center">لايوجد ملاحظات</h2>
    }

    if(!selectedNote){
      return <h2 className="center"> لايوجد ملاحظة مختارة</h2>
    }

    // Show selected note
    const note = notes.find(note => {return note.id === selectedNote});

    return (
      <div>
        <div className="note-operations">
          <a href="#" onClick={deleteNote}>
            <i className="fa fa-trash" />
          </a>
        </div>
        <div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </div>
      </div>
    );
  };


const pass = 1234;
  const ChangeStateLogin = () => {
    if(password==pass)
     setLogin(true);
    }

  const Login = () => {
return(
  <div className="Login" >
<input className='Start' type='password' value={password} onChange={savePassword}></input>
<button onClick={ChangeStateLogin}><img className='Go' src={Go}/></button>
</div>
);
  }

  
  return (
    <SuccessLogin>
<NotesContainer>
        <NotesList>
          {notes.map(note =>
          <Note
           key={note.id}
           title={note.title}
           noteClicked={() => previewSelectedNote(note.id)}
           />)}
          </NotesList>
        <button className="add-btn" onClick={addNote}>+</button>
        </NotesContainer>
        {login ? <Preview>
        {creating ? getAddNote() : getPreview()}
        </Preview> : <Login/>}
    </SuccessLogin>
  );
}

export default App;