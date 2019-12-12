import React, { Component } from 'react';
import Note from './app/note.js';
import Resell from './app/resell';
import Bump from './app/bump';
import './app/styles/App.css';
import socketIOClient from 'socket.io-client';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';



class App extends Component {
    constructor(props) {
      super(props)
      this.state = {
        currentItems: [],
        soldItems: [],
        pendingItems: [],
        endpoint: "http://localhost:4001",

      }
    }


    componentDidMount() {
      this.refreshItems();
    }
    refreshItems = () => {

      const socket = socketIOClient(this.state.endpoint);
      socket.emit('getCurrentItems', data => {
        this.setState({currentItems: data})
      })
      socket.emit('getSoldItems', data => {
        this.setState({soldItems: data})
      })
    }


  render() {
    return (
      <Router>
      <div className="App">
          <link href="https://fonts.googleapis.com/css?family=Assistant:400,700&display=swap" rel="stylesheet"/>
          <div className="naviContainer">
                <div className="navigation">
                   <Link className="link naviElement" to="/">NOTE</Link>
                    <span className="naviElement"><Link className="link" to="/resell">RESELL</Link></span>
                    <span className="naviElement"><Link className="link" to="/bump">BUMP</Link></span>
                    <span className="naviElement">ACCOUNT</span>
                </div>
            </div>
            <Switch>
              <Route path="/resell">
                <Resell/>
              </Route>
              <Route path="/bump">
                <Bump/>
              </Route>
              <Route path="/">
                <Note.Render currentItems={this.state.currentItems} soldItems={this.state.soldItems} refreshItems={() => this.refreshItems()}/>
              </Route>
            </Switch>
      </div>
      </Router>
    );
  }
}

export default App;