import React, { Component } from 'react';
import Note from './app/note.js';
import Resell from './app/resell';
import Bump from './app/bump';


class App extends Component {
    constructor(props) {
      super(props)
      this.state = {
        showNote: true,
        showResell: false,
        showBump: false,
        showAccount: false,
      }
    }

    toggle(option) {
      const {showNote, showResell, showBump, showAccount} = this.state;
      this.setState({
        showNote: false,
        showResell: false,
        showBump: false,
      })

      switch(option) {
        case "note":
          this.setState({showNote: true,})
          break;
        case "resell":
          this.setState({showResell: true,})
          break;
        case "bump":
          this.setState({showBump: true,})
      }
    }

  render() {
    return (
      <div className="App">

          <link href="https://fonts.googleapis.com/css?family=Assistant:400,700&display=swap" rel="stylesheet"/>
          <img src="img/indexbaks.jpg" alt="Baks index" id="index-photo"/>
          <div className="naviContainer">
                <div className="navigation">
                    <span class="naviElement" onClick={() => this.toggle("note")}>NOTE</span>
                    <span class="naviElement" onClick={() => this.toggle("resell")}>RESELL</span>
                    <span class="naviElement" onClick={() => this.toggle("bump")}>BUMP</span>
                    <span class="naviElement">ACCOUNT</span>
                </div>
            </div>
          {this.state.showNote && (<Note.Render/>)}
          {this.state.showResell && (<Resell/>)}
          {this.state.showBump && (<Bump/>)}
      </div>
    );
  }
}

export default App;