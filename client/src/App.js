import React, { Component } from 'react';
import './app/styles/App.css';
import Header from './app/header.js';
import Note from './app/note.js';


class App extends Component {

  render() {
    return (
      <div className="App">
          <link href="https://fonts.googleapis.com/css?family=Assistant:400,700&display=swap" rel="stylesheet"/>
          <img src="img/indexbaks.jpg" alt="Baks index" id="index-photo"/>
          <Header/>
          <Note.Render/>
      </div>
    );
  }
}

export default App;