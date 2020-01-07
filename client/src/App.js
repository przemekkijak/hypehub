import React, { useState } from 'react'
import Note from './app/note.js'
import Resell from './app/resell'
import Login from './app/login'
// import Home from './app/home'
import './app/styles/App.css'
import socketIOClient from 'socket.io-client'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom';

// const socket = socketIOClient('localhost:8080');
const socket = socketIOClient('https://hypehub-js.herokuapp.com');
var user = {};
const token = localStorage.getItem('token');
const id = localStorage.getItem('id');

  function App() {
        const [currentItems, setCurrent] = useState([]);
        const [soldItems, setSold] = useState([]);
        const [isLoged, setLoged] = useState(() => {
          socket.emit('checkLog', token,id);
          socket.on('success', (userData) => {
            user = userData;
            refreshItems();
            setLoged(true);
          })
          socket.on('failed', () => {
            setLoged(false);
          })
        });
      function handleLogin(userData) {
        user = userData;
        refreshItems();
        setLoged(true);
      }

      function logout() {
        setLoged(false);
        localStorage.removeItem('id');
        localStorage.removeItem('token');
      }

      function refreshItems() {
        socket.emit('getCurrentItems', data => {
          setCurrent(data);
        })
        socket.emit('getSoldItems', data => {
          setSold(data);
        })
      }


    return (
      <Router>
      <div className="App" id="root">
          <link href="https://fonts.googleapis.com/css?family=Assistant:400,700&display=swap" rel="stylesheet"/>
                {isLoged ?
               <>
                <div className="userInfo">
                  <p>Zalogowano jako {user.username}</p>
                  <p className="naviElement">Moje konto</p>
                  <p className="naviElement" onClick={logout}>Wyloguj</p>
                </div>
               <div className="navigation">
                   <Link className="topMenu link naviElement" to="/">NOTE</Link>
                   <Link className="topMenu link naviElement" to="bulk">BULK</Link>
                </div>
            <Switch>
              <Route path="/bulk"><Resell/></Route>
              <Route path="/"><Note.Render socket={socket} currentItems={currentItems} soldItems={soldItems} refreshItems={refreshItems} userID={user.id}/></Route>
              <Redirect to="/"/>
            </Switch>
             </>
             :
             <>
             {/* <Route path="/home"><Home/></Route> */}
             <Route path="/home"><Login handleLogin={(userData) => handleLogin(userData)} socket={socket}/></Route>
             <Redirect to="/home"/>
             </>
            }

      </div>
      </Router>
    );
  }
export default App;