import React, { Component } from 'react';
import Note from './app/note.js';
import Resell from './app/resell';
import Bump from './app/bump';
import Axios from 'axios';
import './app/styles/App.css';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

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
      <Router>
      <div className="App">
          <link href="https://fonts.googleapis.com/css?family=Assistant:400,700&display=swap" rel="stylesheet"/>
          <div className="naviContainer">
                <div className="navigation">
                    <span className="naviElement"><Link to="/">NOTE</Link></span>
                    <span className="naviElement"><Link to="/Resell">RESELL</Link></span>
                    <span className="naviElement" onClick={() => this.toggle("bump")}>BUMP</span>
                    <span className="naviElement">ACCOUNT</span>
                </div>
            </div>
            <Router exact path="/" component={Note}/>
            <Router path="/resell" component={Resell}/>
          {/* {this.state.showNote && (<Note.Render currentItems={this.state.currentItems} soldItems={this.state.soldItems}/>)}
          {this.state.showResell && (<Resell/>)}
          {this.state.showBump && (<Bump/>)} */}
      </div>
      </Router>
    );
  }
}

export default App;