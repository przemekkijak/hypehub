import React, { Component } from 'react';
import Note from './app/note.js';
import Resell from './app/resell';
import Bump from './app/bump';
import Axios from 'axios';


class App extends Component {
    constructor(props) {
      super(props)
      this.state = {
        showNote: true,
        showResell: false,
        showBump: false,
        showAccount: false,
        currentItems: [],
        soldItems: [],
        pendingItems: [],
      }
    }
    componentDidMount() {
      this.fetchItems();
    }

    fetchItems() {
      Axios.get('http://localhost:3000/getCurrentItems')
      .then(response => this.setState({currentItems: response.data}));

      Axios.get('http://localhost:3000/getSoldItems')
      .then(response => this.setState({soldItems: response.data}));
    }

    toggle(option) {
      this.setState({
        showNote: false,
        showResell: false,
        showBump: false,
      })

      switch(option) {
        default:
          this.setState({showNote: true,})
          break;
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
          {/* <img src="img/indexbaks.jpg" alt="Baks index" id="index-photo"/> */}
          <div className="naviContainer">
                <div className="navigation">
                    <span className="naviElement" onClick={() => this.toggle("note")}>NOTE</span>
                    <span className="naviElement" onClick={() => this.toggle("resell")}>RESELL</span>
                    <span className="naviElement" onClick={() => this.toggle("bump")}>BUMP</span>
                    <span className="naviElement">ACCOUNT</span>
                </div>
            </div>
          {this.state.showNote && (<Note.Render currentItems={this.state.currentItems} soldItems={this.state.soldItems}/>)}
          {this.state.showResell && (<Resell/>)}
          {this.state.showBump && (<Bump/>)}
      </div>
    );
  }
}

export default App;