import React, { useState, useRef } from "react";
import "./styles/note.css";
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
  Redirect
} from "react-router-dom";

function Render(props) {
  const searchBar = useRef();
  const [itemModal, setItemModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(0);
  const socket = props.socket;

  function deleteItem(id) {
    socket.emit("deleteItem", id.target.id);
    props.refreshItems();
  }
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
        to="/note/current">Aktualne</NavLink>
      <NavLink className="link naviButton" to="/note/sold">Sprzedane</NavLink>
      <NavLink className="link naviButton" to="/note/pending">Zamowione</NavLink>
      <span>Filtruj<img src="/img/filtr.png" alt="filtr" onClick={() => props.filterItems()}/></span>
      <input type="text" placeholder="Szukaj..." ref={searchBar} onChange={() => props.searchItem(searchBar.current.value)}/>
    </div>

    <div className="tableContainer">
      <Switch>
        <Route path="/note/sold">
          <div className="itemsInfo soldColumns">
            <span>Nazwa</span>
            <span>Rozmiar</span>
            <span>Stan</span>
            <span>Cena kupna</span>
            <span>Profit</span>
          </div>
        </Route>
        <Route path="/">
          <div className="itemsInfo currentColumns">
            <span>Nazwa</span>
            <span>Rozmiar</span>
            <span>Stan</span>
            <span>Cena kupna</span>
            <span>Potencjalna sprzedaz</span>
          </div>
        </Route>
      </Switch>
      <div className="noteContent">
        <Switch>
          <Route exact path="/note/sold">
            <Sold
              items={props.soldItems}
              deleteItem={deleteItem}
              itemInfo={id => itemInfo(id)}/>
          </Route>
          <Route exact path="/note/pending"><Pending/></Route>
          <Route exact path="/note/current">
            <Current
              socket={socket}
              itemInfo={id => itemInfo(id)}
              items={props.currentItems}
              deleteItem={deleteItem}
              refreshItems={props.refreshItems}/>
          </Route>
          <Redirect to="/note/current" />
        </Switch>
      </div>
      <NoteMenu
        socket={socket}
        userID={props.userID}
        refreshItems={props.refreshItems}/>
      <ReactModal
        isOpen={itemModal}
        className={"modalContent"}
        overlayClassName={"modalOverlay"}
        onRequestClose={() => setItemModal(false)}>
        <ItemInfo
          socket={socket}
          handleModal={handleModal}
          itemID={currentItem}
          refreshItems={props.refreshItems}/>
      </ReactModal>
      </div>
  </Router>
);
}
export default {Render};
