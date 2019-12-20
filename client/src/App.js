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
  Switch,
  Redirect,
} from 'react-router-dom';

class App extends Component {
    constructor(props) {
      super(props)
      this.state = {
        currentItems: [],
        soldItems: [],
        pendingItems: [],
        isLoged: false,
      }
      this.socket = socketIOClient('localhost:4001');
    }
    componentDidMount() {
      this.refreshItems();
      if(localStorage.getItem('id') > 0) {
        this.socket.emit('userData', localStorage.getItem('id'), localStorage.getItem('logged'));
        this.refreshItems();
      }
  }

    refreshItems = () => {
      this.socket.emit('getCurrentItems', data => {
        this.setState({currentItems: data})
      })
      this.socket.emit('getSoldItems', data => {
        this.setState({soldItems: data})
      })
    }
    handleLogin = () => {
      this.refreshItems();
      this.setState({isLoged: true});

    }

    deleteData() {
      localStorage.removeItem('logged');
      localStorage.removeItem('id');
      console.log('data deleted');
    }


  render() {
    return (
      <Router>
      <div className="App" id="root">
        <button onClick={this.deleteData} id="logout">LOGOUT</button>
          <link href="https://fonts.googleapis.com/css?family=Assistant:400,700&display=swap" rel="stylesheet"/>
                {(localStorage.getItem('logged')) === 'true' ?
               <>
               <div className="navigation">
                   <Link className="link naviElement" to="/">NOTE</Link>
                   <Link className="link naviElement" to="resell">RESELL</Link>
                   <Link className="link naviElement" to="bump">BUMP</Link>
                   <Link className="link naviElement" to="account">ACCOUNT</Link>
                </div>
            <Switch>
              <Route path="/resell"><Resell/></Route>
              <Route path="/bump"><Bump/></Route>
              <Route path="/"><Note.Render currentItems={this.state.currentItems} soldItems={this.state.soldItems} refreshItems={() => this.refreshItems()}/></Route>
              <Redirect to="/"/>
            </Switch>
             </>
             :
             <>
             <Route path="/login"><Login handleLogin={this.handleLogin}/></Route>
             <Redirect to="/login"/>
             </>
            }

      </div>
      </Router>
    );
  }
}
export default App;