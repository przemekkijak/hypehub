import React, { Component } from 'react';
import Note from './app/note.js';
import Resell from './app/resell';
import Bump from './app/bump';
import Login from './app/login'
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
        isLoged: false

      }
    }
    componentDidMount() {
      this.refreshItems();
    }
    refreshItems = () => {
      const socket = socketIOClient('http://localhost:4001');
      socket.emit('getCurrentItems', data => {
        this.setState({currentItems: data})
      })
      socket.emit('getSoldItems', data => {
        this.setState({soldItems: data})
      })
    }
    handleLogin = () => {
      this.setState({isLoged: !this.state.isLoged});
    }

  render() {
    return (
      <Router>
      <div className="App" id="root">
          <link href="https://fonts.googleapis.com/css?family=Assistant:400,700&display=swap" rel="stylesheet"/>
                {this.state.isLoged && (<div className="navigation">
                   <Link className="link naviElement" to="/home">NOTE</Link>
                   <Link className="link naviElement" to="/resell">RESELL</Link>
                   <Link className="link naviElement" to="/bump">BUMP</Link>
                   <Link className="link naviElement" to="/account">ACCOUNT</Link>
                </div>)}
            <Switch>
              <Route path="/resell"><Resell/></Route>
              <Route path="/bump"><Bump/></Route>
              <Route path="/home"><Note.Render currentItems={this.state.currentItems} soldItems={this.state.soldItems} refreshItems={() => this.refreshItems()}/></Route>
              <Route path="/"><Login handleLogin={() => this.handleLogin()}/></Route>
            </Switch>
      </div>
      </Router>
    );
  }
}
export default App;