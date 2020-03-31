import React from "react";
import "./styles/css/stats.css";
import PlatformStats from "./stats/platformStats";
import MoneyStats from "./stats/moneyStats";
import store from "../app/redux/store/index";


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

      <div id="details">

        <div id="totalProfit">
          <img src="../img/stats/profit.svg"
          alt="Profit"
          className="detailsIcon"
          />
          <p>Całkowity zysk</p>
          <p>{moneyValue(store.getState().soldItems, 2)} PLN</p>
        </div>


          <div id="currentItems">
            <img src="../img/stats/current.svg"
            alt="Current"
            className="detailsIcon"
            />
            <p>Posiadane przedmioty</p>
            <p>{store.getState().currentItems.length}</p>
            <p>Wartość: {moneyValue(store.getState().currentItems, 1)} PLN</p>
          </div>

          <div id="soldItems">
            <img src="../img/stats/sold.svg"
            alt="Sold"
            className="detailsIcon"
            />
            <p>Sprzedane przedmioty</p>
            <p>{store.getState().soldItems.length}</p>
          </div>

      </div>

      <div id="platform">
        <PlatformStats />
      </div>

      <div id="moneyStats">
        <div id="week">
          <MoneyStats period="7" />
        </div>

        <div id="month">
          <MoneyStats period="30" />
        </div>

        <div id="year">
          <MoneyStats period="365" />
        </div>
      </div>



    </div>
  );
}

export default Stats;
