import React, { Component } from 'react';
import Loader from 'halogen/GridLoader';

import logo from './node-dc.jpeg';
import './App.css';

const Note = ({ id, note }) => (
  <div>
    <div>id: {id}</div>
    <div>note: {note}</div>
  </div>
);

class App extends Component {
  constructor() {
    super();
    this.state = {
      hasDataLoaded: false,
      notes: []
    }
  }
  componentDidMount() {
    fetch(`${process.env.REACT_APP_SERVICE_HOST}/notes`, { method: "GET", mode: "cors" })
    .then((res) => res.json())
    .then((json) => this.setState({ notes: json.data, hasDataLoaded: true }));
  }
  render() {
    const notes = this.state.notes.map(({ id, note }) => <Note key={id} id={id} note={note} />);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} alt="logo" />
          <h2>Welcome to Node DC</h2>
        </div>
        { this.state.hasDataLoaded ? notes : <Loader color="#26A65B" size="16px" margin="4px"/>}
      </div>
    );
  }
}

export default App;
