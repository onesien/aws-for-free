import React, { Component } from 'react';

import logo from './node-dc.jpeg';
import './App.css';

const NOTES_ENDPOINT = `${process.env.REACT_APP_SERVICE_HOST}/notes`;
const Note = ({ id, note }) => (<div>{note}</div>);

class App extends Component {
  constructor() {
    super();
    this.state = {
      notes: []
    }
    this.fetchNotes = this.fetchNotes.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.saveNote= this.saveNote.bind(this);
  }

  fetchNotes() {
    fetch(NOTES_ENDPOINT, { method: "GET", mode: "cors" })
    .then((res) => res.json())
    .then((json) => this.setState({ notes: json.data }));
  }

  saveNote(note) {
    return fetch(NOTES_ENDPOINT, { method: "POST", mode: "cors", body: JSON.stringify({ note }) })
    .then((res) => res.json())
  }
  
  clickHandler(e) {
    const note = document.getElementById("newNote").value;
    this.saveNote(note)
    .then(() => {
      document.getElementById("newNote").value = "";
      this.fetchNotes();
    });
  }

  componentDidMount() {
    this.fetchNotes();
  }

  render() {
    const notes = this.state.notes.map(({ id, note }) => <Note key={id} id={id} note={note} />);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} alt="logo" />
          <h2>Welcome to Node DC</h2>
        </div>
        <input type="text" name="newNote" id="newNote" /> 
        <button onClick={this.clickHandler}>save</button>
        { notes }
      </div>
    );
  }
}

export default App;
