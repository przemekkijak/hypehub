import React, { Component } from 'react'
import Note from './app/note.js'
import Resell from './app/resell'
import Login from './app/login'
import Home from './app/home'
import './app/styles/App.css'
import socketIOClient from 'socket.io-client'

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
      const user = {};
      }


    componentDidMount() {

      const token = localStorage.getItem('token');
      const id = localStorage.getItem('id')
      this.socket.emit('checkLog', token,id);
      this.socket.on('success', (userData) => {
        this.user = userData;
        this.refreshItems();
        this.setState({isLoged: true});
      })
    }

    refreshItems = () => {
      this.socket.emit('getCurrentItems', data => {
        this.setState({currentItems: data})
      })
      this.socket.emit('getSoldItems', data => {
        this.setState({soldItems: data})
      })
    }

    handleLogin = (user) => {
      this.user = user;
      this.setState({isLoged: true});
      this.refreshItems();
    }

    logout = () => {
      this.setState({isLoged: false});
      localStorage.removeItem('id');
      localStorage.removeItem('token');
    }



  render() {
    return (
      <Router>
      <div className="App" id="root">
          <link href="https://fonts.googleapis.com/css?family=Assistant:400,700&display=swap" rel="stylesheet"/>
                {this.state.isLoged ?
               <>
                <div className="userInfo">
                  <p>Zalogowano jako {this.user.username}</p>
                  <p>ID: {this.user.id}</p>
                  <p onClick={this.logout}>Wyloguj</p>
                </div>

               <div className="navigation">
                   <Link className="link naviElement" to="/">NOTE</Link>
                   <Link className="link naviElement" to="resell">RESELL</Link>
                </div>
            <Switch>
              <Route path="/resell"><Resell/></Route>
              <Route path="/"><Note.Render socket={this.socket} currentItems={this.state.currentItems} soldItems={this.state.soldItems} refreshItems={() => this.refreshItems()} userID={this.user.id}/></Route>
              <Redirect to="/"/>
            </Switch>
             </>
             :
             <>
             <Route path="/home"><Home/></Route>
             <Route path="/home"><Login handleLogin={(user) => this.handleLogin(user)} socket={this.socket}/></Route>
             <Redirect to="/home"/>
             </>
            }

      </div>
      </Router>
    );
  }
}
export default App;