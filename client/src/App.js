import React, { useState} from "react";
import Note from "./app/note.js";
import Resell from "./app/resell";
import Login from "./app/login";
// import Home from './app/home'
import "./app/styles/App.css";
import socketIOClient from "socket.io-client";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  NavLink
} from "react-router-dom";

const socket = socketIOClient("//hypehub.pl");
var user = {};
const token = localStorage.getItem("token");
const id = localStorage.getItem("id");

var currentItems = [];
var soldItems = [];

function App() {
  const [, loadingItems] = useState(false);
  const [isLoged, setLoged] = useState(() => {
    socket.emit("checkLog", token, id);
    socket.on("success", userData => {
      user = userData;
      refreshItems();
      setLoged(true);
    });
    socket.on("failed", () => {
      setLoged(false);
    });
  });

function handleLogin(userData) {
  user = userData;
  refreshItems();
  setLoged(true);
}

function logout() {
  setLoged(false);
  localStorage.removeItem("id");
  localStorage.removeItem("token");
}

function refreshItems() {
  socket.emit("getCurrentItems", data => {
    currentItems = data;
    loadingItems(true);
  });
  socket.emit("getSoldItems", data => {
    soldItems = data;
    loadingItems(false);
  });
  setTimeout(function() {
    socket.emit("getCurrentItems", data => {
      currentItems = data;
      loadingItems(true);
    });
    socket.emit("getSoldItems", data => {
      soldItems = data;
      loadingItems(false);
    });
  },750);
}

return (
  <Router>
    <div className="App" id="root">
      {/* <link
      href="https://fonts.googleapis.com/css?family=Assistant:400,700&display=swap"
      rel="stylesheet"/> */}
      <link href="https://fonts.googleapis.com/css?family=Ubuntu:400,700&display=swap" rel="stylesheet"/>

        {isLoged ? (
        <>
          {/* <div className="userInfo">
            <p>Zalogowano jako {user.username}</p>
            <p>
            <span className="naviElement">Moje konto </span>
            <span className="naviElement" onClick={logout}>Wyloguj</span>
            </p>
          </div> */}
          <div className="navigationContainer">
            <p><NavLink className="link naviElement" activeClassName="navActive" to="note">
              <img src="img/shirt.png" className="navIcon"/><br/>
              Itemy</NavLink></p>
            <p><NavLink className="link naviElement" activeClassName="navActive" to="bulk">
              <img src="img/bulk.png" className="navIcon"/><br/>
              Bulk</NavLink></p>
            <p><NavLink className="link naviElement" activeClassName="navActive" to="stats">
              <img src="img/stats.png" className="navIcon"/><br/>
              Statystyki</NavLink></p>
            <p><NavLink className="link naviElement" activeClassName="navActive" to="account">
              <img src="img/user.png" className="navIcon"/><br/>
              Moje konto</NavLink></p>
            <p id="logoutNav"><NavLink className="link naviElement" activeClassName="navActive" to="/logout" onClick={logout}>
              <img src="img/logout.png" className="navIcon" id="logoutIcon"/><br/>
              Wyloguj</NavLink></p>
          </div>
          <Switch>
            <Route exact path="/stats"><Resell/></Route>
            <Route exact path="/account"><Resell/></Route>
            <Route exact path="/bulk"><Resell/></Route>
            <Route exact path="/note">
              <Note.Render
                socket={socket}
                currentItems={currentItems}
                soldItems={soldItems}
                refreshItems={refreshItems}
                userID={user.id}/>
            </Route><Redirect to="/note" />
          </Switch>
        </>
        ) : (
        <>
          <Route path="/">
            <Login
              handleLogin={userData => handleLogin(userData)}
              socket={socket}/>
          </Route><Redirect to="/"/>
        </>
        )}
    </div>
  </Router>
  );
}
export default App;
