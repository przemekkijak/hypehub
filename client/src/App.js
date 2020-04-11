import React, { useState, useEffect } from "react";
import Note from "./app/note.js";
import Stats from "./app/stats.js";
import Resell from "./app/resell.js";
import Login from "./app/login.js";
import "./app/styles/css/App.css";
import axios from "axios";
import Cookies from "universal-cookie";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  NavLink,
} from "react-router-dom";
import store from "./app/redux/store/index";
import { setCurrent, setSold, setUser } from "./app/redux/actions/index";

const cookies = new Cookies();

var env = "https://hypehub.pl";


function App() {
  const [theme,setTheme] = useState(false);
  const [, loadingItems] = useState(false);
  const [isLoged, setLoged] = useState(() => {
    let token = cookies.get("hhtkn");
    if (token !== null) {
      axios
        .post(`${env}/checkToken`, {
          token: token,
        })
        .then((res) => {
          store.dispatch(setUser({uid: res.data.uid, theme: res.data.theme}));
          refreshItems();
          setLoged(true);
        });
    }
  });


  function handleLogin(userData) {
    store.dispatch(setUser({uid: userData.uid, theme: userData.theme}));
    cookies.set("hhtkn", userData.token);
    refreshItems();
    setLoged(true);
  }

  async function logout() {
    cookies.remove("hhtkn");
    setLoged(false);
  }

  function refreshItems() {
    axios
      .post(`${env}/getCurrentItems`, {
        id: store.getState().user.uid,
      })
      .then((res) => {
        store.dispatch(setCurrent(res.data));
        loadingItems(true);
      });

    axios
      .post(`${env}/getSoldItems`, {
        id: store.getState().user.uid,
      })
      .then((res) => {
        store.dispatch(setSold(res.data));
        loadingItems(false);
      });
  }

  function searchItem(itemName) {
    var results;
    if (itemName.length < 2) {
      refreshItems();
    }
    if (window.location.pathname === "/note/current") {
      results = store.getState().currentItems.filter((item) =>
        item.name.toLowerCase().includes(itemName)
      );
      if (results.length > 0) {
        store.dispatch(setCurrent(results));
      }
    } else if(window.location.pathname === "/note/sold") {
      results = store.getState().soldItems.filter((item) =>
        item.name.toLowerCase().includes(itemName)
      );
      if (results.length > 0) {
        store.dispatch(setSold(results));
      }
    }
    loadingItems(true);
  }

  function unfilter() {
    refreshItems();
    console.log("unfilter");
  }

  return (
    <Router>
      <div className={`App ${store.getState().user.theme ? 'dark' : ''}`} id="root">

        {isLoged ? (
          <>
            <div className="navigationContainer">
              <div id="navis">
                <NavLink
                  className="link naviElement"
                  activeClassName="navActive"
                  to="note"
                >
                  <div className="navElementContainer">
                    <img
                      src="../img/menu/shirt.svg"
                      alt="Items"
                      className="navIcon"
                    />
                    <span>Itemy</span>
                  </div>
                </NavLink>

                <NavLink
                  className="link naviElement"
                  activeClassName="navActive"
                  to="bulk"
                >
                  <div className="navElementContainer">
                    <img
                      src="../img/menu/bulk.svg"
                      id="bulkIcon"
                      alt="Bulk"
                      className="navIcon"
                    />
                    <span>Bulk</span>
                  </div>
                </NavLink>

                <NavLink
                  className="link naviElement"
                  activeClassName="navActive"
                  to="stats"
                >
                  <div className="navElementContainer">
                    <img
                      src="../img/menu/stats.svg"
                      alt="Stats"
                      className="navIcon"
                    />
                    <span>Statystyki</span>
                  </div>
                </NavLink>

                <NavLink
                  className="link naviElement"
                  activeClassName="navActive"
                  to="account"
                >
                  <div className="navElementContainer">
                    <img
                      src="../img/menu/user.svg"
                      id="userIcon"
                      alt="Account"
                      className="navIcon"
                    />
                    <span>Moje konto</span>
                  </div>
                </NavLink>

                <NavLink
                  className="link naviElement"
                  activeClassName="navActive"
                  to="/logout"
                  onClick={logout}
                >
                  <div className="navElementContainer">
                    <img
                      src="../img/menu/logout.svg"
                      alt="Logout"
                      className="navIcon"
                      id="logoutIcon"
                    />
                    <span>Wyloguj</span>
                  </div>
                </NavLink>
              </div>
            </div>

            <Switch>
              <Route exact path="/stats">
                <Stats />
              </Route>
              <Route exact path="/account">
                <Resell />
              </Route>
              <Route exact path="/bulk">
                <Resell />
              </Route>
              <Route exact path="/note">
                <Note
                  refreshItems={refreshItems}
                  userID={store.getState().user.id}
                  searchItem={searchItem}
                  unfilter={unfilter}
                />
              </Route>
              <Redirect to="/note" />
            </Switch>
          </>
        ) : (
          <>
            <Route path="/">
              <Login handleLogin={(userData) => handleLogin(userData)} />
            </Route>
            <Redirect to="/" />
          </>
        )}
      </div>
    </Router>
  );
}
export default App;
