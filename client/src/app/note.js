import React, { useState } from "react";
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
  const [itemModal, setItemModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(0);

  function itemInfo(id) {
    setCurrentItem(id);
    setItemModal(true);
  }
  function handleModal() {
    setItemModal(!itemModal);
  }

  function profitStats(time) {
      let date = new Date();
      let day = date.getDate();
      let month = date.getMonth()+1;
      let year = date.getFullYear();

      if(month < 10) {
        month = `0${month}`;
      }
      if(day < 10) {
        day = `0${day}`;
      }

      let today = year+"-"+month+"-"+day;

    let profit = 0;
      switch(time) {
        default:
        case "all":
          for(let i in props.soldItems) {
            profit += (props.soldItems[i].sellPrice-props.soldItems[i].buyPrice);
          }
          return profit;

        case "today":
          for(let i in props.soldItems) {
            let itemDate = props.soldItems[i].soldAt;
            let splited = itemDate.split("T");
            if(today === splited[0]) {
              profit += (props.soldItems[i].sellPrice-props.soldItems[i].buyPrice);
            }
          }
          return profit;
      }
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
      <span>Filtruj<img src="/img/note/filtr.png" alt="filtr" onClick={() => props.filterItems()}/></span>
      <input type="text" placeholder="Szukaj..." onChange={(e) => props.searchItem(e.target.value)}/>
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
            <span>Tracking</span>
            <span>Kupujacy</span>
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
              itemInfo={id => itemInfo(id)}
              refreshItems={props.refreshItems}/>
          </Route>

          <Route exact path="/note/pending">
            <Pending/>
          </Route>

          <Route exact path="/note/current">
            <Current
              itemInfo={id => itemInfo(id)}
              items={props.currentItems}
              refreshItems={props.refreshItems}/>
          </Route>

          <Redirect to="/note/current" />
        </Switch>
      </div>
      <div className="statBox">
        <br/>
        <p>Łączny zysk:</p>
        <p>{profitStats("all")} zł</p>
        <br/>
        <p>Dzisiejszy zysk:</p>
        <p>{profitStats("today")} zł</p>

      </div>
      <NoteMenu
        userID={props.userID}
        refreshItems={props.refreshItems}/>
      <ReactModal
        isOpen={itemModal}
        className={"modalContent"}
        overlayClassName={"modalOverlay"}
        onRequestClose={() => setItemModal(false)}>
        <ItemInfo
          handleModal={handleModal}
          itemID={currentItem}
          refreshItems={props.refreshItems}/>
      </ReactModal>
      </div>
  </Router>
);
}
export default {Render};
