import React, { useState } from "react";
import "./styles/note.css";
import Current from "./note/current";
import Sold from "./note/sold";
import Pending from "./note/pending";
import NoteMenu from "./note/noteMenu";
import ItemInfo from "./note/itemInfo";
import $ from "jquery";
import ReactModal from "react-modal";

import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from "react-router-dom";

function Render(props) {
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
      <div className="tableContainer">
        <div className="noteTableNavi">
          <NavLink
            className="link naviButton"
            activeClassName="active"
            to="/note/current">Aktualne</NavLink>
          <NavLink className="link naviButton" to="/note/sold">Sprzedane</NavLink>
          <NavLink className="link naviButton" to="/note/pending">Zamowione</NavLink>
        </div>
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
              <span>Sprzedaj</span>
            </div>
          </Route>
        </Switch>
        <div className="noteContent">
          <Switch>
            <Route path="/note/sold">
              <Sold
                items={props.soldItems}
                deleteItem={deleteItem}
                itemInfo={id => itemInfo(id)}
              />
            </Route>
            <Route path="/note/pending">
              <Pending />
            </Route>
            <Route path="/">
              <Current
                socket={socket}
                itemInfo={id => itemInfo(id)}
                items={props.currentItems}
                deleteItem={deleteItem}
                refreshItems={props.refreshItems}
              />
            </Route>
          </Switch>
        </div>
        <NoteMenu
          socket={socket}
          userID={props.userID}
          refreshItems={props.refreshItems}
        />
        <ReactModal
          isOpen={itemModal}
          className={"modalContent"}
          overlayClassName={"modalOverlay"}
          onRequestClose={() => setItemModal(false)}
        >
          <ItemInfo
            socket={socket}
            handleModal={handleModal}
            itemID={currentItem}
            refreshItems={props.refreshItems}
          />
        </ReactModal>
      </div>
    </Router>
  );
}

export default {
  Render
};
