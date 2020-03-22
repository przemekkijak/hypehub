import React from "react";
import "./styles/stats.css";
import PlatformStats from "./stats/platformStats";
import MoneyStats from "./stats/moneyStats";

function Stats(props) {

  function moneyValue(items, priceType) {

    var money = 0;
      for(let i of items) {

        if(priceType === 1) {
          money += i.buyPrice;
        } else if(priceType === 2){
          money += i.sellPrice;
        }
      }
      return money;
  }

  return (
    <div id="statsContainer">
      <div id="platform">
        <PlatformStats soldItems={props.soldItems} />
      </div>

      <div id="week">
        <MoneyStats soldItems={props.soldItems} period="7" />
      </div>

      <div id="month">
        <MoneyStats soldItems={props.soldItems} period="30" />
      </div>

      <div id="year">
        <MoneyStats soldItems={props.soldItems} period="365" />
      </div>

      <div id="details">

          <div id="currentItems">
            <p>Posiadane przedmioty: {props.currentItems.length}</p>
            <p>Wartość: {moneyValue(props.currentItems, 1)} PLN</p>
          </div>

          <div id="soldItems">
            <p>Sprzedane przedmioty: {props.soldItems.length}</p>
            <p>Całkowity profit: {moneyValue(props.soldItems, 2)} PLN</p>
          </div>

      </div>

    </div>
  );
}

export default Stats;
