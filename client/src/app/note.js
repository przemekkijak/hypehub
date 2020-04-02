import React, { useState } from "react";
import "./styles/css/note.css";
import Current from "./note/current";
import Sold from "./note/sold";
import Pending from "./note/pending";
import NoteMenu from "./note/noteMenu";
import ItemInfo from "./note/itemInfo";
import ReactModal from "react-modal";

import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
  Redirect,
} from "react-router-dom";

function Note(props) {
  const [itemModal, setItemModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(0);

  function itemInfo(id) {
    setCurrentItem(id);
    setItemModal(true);
  }
  function handleModal() {
    setItemModal(!itemModal);
  }

  return (
    <Router>
      <div className="noteTableNavi">
        <NavLink
          className="link naviButton"
          activeClassName="active"
          to="/note/current"
          >Posiadane</NavLink>
        <NavLink className="link naviButton" to="/note/sold">Sprzedane</NavLink>
        <NavLink className="link naviButton" to="/note/pending">Zamówione</NavLink>

        <input
          id="searchInput"
          type="text"
          placeholder="Szukaj..."
          onChange={(e) => props.searchItem(e.target.value)}
        />
      </div>

      <div className="tableContainer">
        <Switch>
          <Route path="/note/sold">
            <div className="itemsInfo soldColumns">
              <span>Nazwa</span>
              <span>Rozmiar</span>
              <span>Stan</span>
              <span>Cena</span>
              <span>Profit</span>
              <span>Tracking</span>
              <span>Kupujacy</span>
            </div>
          </Route>
          <Route path="/">
            <div className="itemsInfo currentColumns">
              <span>Nazwa</span>
              <span>Rozmiar</span>
              <span>Stan</span>
              <span>Cena</span>
            </div>
          </Route>
        </Switch>
        <div className="noteContent">
          <Switch>
            <Route exact path="/note/sold">
              <Sold
                itemInfo={(id) => itemInfo(id)}
                refreshItems={props.refreshItems}
              />
            </Route>

            <Route exact path="/note/pending">
              <Pending />
            </Route>

            <Route exact path="/note/current">
              <Current
                itemInfo={(id) => itemInfo(id)}
                refreshItems={props.refreshItems}
              />
            </Route>

            <Redirect to="/note/current" />
          </Switch>
        </div>
        <ReactModal
          isOpen={itemModal}
          className={"modalContent"}
          overlayClassName={"modalOverlay"}
          onRequestClose={() => setItemModal(false)}
        >
          <ItemInfo
            handleModal={handleModal}
            itemID={currentItem}
            refreshItems={props.refreshItems}
          />
        </ReactModal>
      </div>
      <NoteMenu refreshItems={props.refreshItems} />
    </Router>
  );
}
export default Note;
