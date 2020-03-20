import React, { useState, useEffect} from "react";
import Note from "./app/note.js";
import Stats from "./app/stats.js";
import Resell from "./app/resell.js";
import Login from "./app/login.js";
import "./app/styles/App.css";
import axios from 'axios';
import Cookies from 'universal-cookie';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  NavLink
} from "react-router-dom";

const cookies = new Cookies();
const socket = {};
const user = {
  id: 0
};

var env = 'https://hypehub.pl'

var currentItems = [];
var soldItems = [];

function App() {
  const [, loadingItems] = useState(false);
  const [isLoged, setLoged] = useState(() => {
    let token = cookies.get('hhtkn');
    if(token !== null) {
      axios.post(`${env}/checkToken`, {
        token: token
      })
      .then(res => {
        user.id = res.data.uid;
        refreshItems();
        setLoged(true);
      });
    }
  });

  useEffect(() => {
    if(user.id !== 0) {
      refreshItems();
    }
  }, []);

function handleLogin(userData) {
  user.id = userData.uid;
  cookies.set('hhtkn', userData.token);
  refreshItems();
  setLoged(true);
}


async function logout() {
    cookies.remove('hhtkn');
    setLoged(false);
}

function refreshItems() {
  axios.post(`${env}/getCurrentItems`, {
    id: user.id
  })
  .then(res => {
    currentItems = res.data;
    loadingItems(true);
  });

  axios.post(`${env}/getSoldItems`, {
    id: user.id
  })
  .then( res => {
    soldItems = res.data;
    loadingItems(false);
  })
}

function searchItem(itemName) {
  if(itemName.length <2) {
    refreshItems();
  }
  if(window.location.pathname === "/note/current") {
    var item = currentItems.filter(item => item.name.toLowerCase().includes(itemName));
    if(item.length > 0) {
      currentItems = item;
    }
  } else {
    item = soldItems.filter(item => item.name.toLowerCase().includes(itemName));
    if(item.length > 0) {
      soldItems = item;
    }
  }
  loadingItems(true);
}

function unfilter() {
  refreshItems();
  console.log('unfilter');
}

return (
  <Router>
    <div className="App" id="root">
      <link href="https://fonts.googleapis.com/css?family=Ubuntu:400,700&display=swap" rel="stylesheet"/>

        {isLoged ? (
        <>
          <div className="navigationContainer">

            <div id="navis">

              <NavLink className="link naviElement" activeClassName="navActive" to="note">
                <div className="navElementContainer">
                  <img src="../img/menu/shirt.png" alt="Items" className="navIcon"/>
                  <p>Itemy</p>
                </div>
              </NavLink>

              <NavLink className="link naviElement" activeClassName="navActive" to="bulk">
                <div className="navElementContainer">
                  <img src="../img/menu/bulk.png" alt="Bulk" className="navIcon"/>
                  <p>Bulk</p>
                </div>
              </NavLink>

              <NavLink className="link naviElement" activeClassName="navActive" to="stats">
                <div className="navElementContainer">
                  <img src="../img/menu/stats.png" alt="Stats" className="navIcon"/>
                  <p>Statystyki</p>
                </div>
              </NavLink>

              <NavLink className="link naviElement" activeClassName="navActive" to="account">
                <div className="navElementContainer">
                  <img src="../img/menu/user.png" alt="Account" className="navIcon"/>
                  <p>Moje konto</p>
                </div>
              </NavLink>

              <NavLink className="link naviElement" activeClassName="navActive" to="/logout" onClick={logout}>
                <div className="navElementContainer">
                  <img src="../img/menu/logout.png" alt="Logout" className="navIcon" id="logoutIcon"/>
                  <p>Wyloguj</p>
                </div>
              </NavLink>

            </div>
          </div>

          <Switch>
            <Route exact path="/stats">
              <Stats
                currentItems={currentItems}
                soldItems={soldItems}/>
            </Route>
            <Route exact path="/account"><Resell/></Route>
            <Route exact path="/bulk"><Resell/></Route>
            <Route exact path="/note">
              <Note.Render
                socket={socket}
                currentItems={currentItems}
                soldItems={soldItems}
                refreshItems={refreshItems}
                userID={user.id}
                searchItem={searchItem}
                unfilter={unfilter}/>
            </Route><Redirect to="/note" />
          </Switch>
        </>
        ) : (
        <>
          <Route path="/">
            <Login
              handleLogin={(userData) => handleLogin(userData)}/>
          </Route><Redirect to="/"/>
        </>
        )}
    </div>
  </Router>
  );
}
export default App;