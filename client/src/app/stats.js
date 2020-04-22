import React from "react";
import "./styles/css/stats.css";
import PlatformStats from "./stats/platformStats";
import MoneyStats from "./stats/moneyStats";
import store from "../app/redux/store/index";
import {StatsProfitSVG, StatsCurrentSVG, StatsSoldSVG} from '../app/svg/icons.js';


function Stats(props) {

  function moneyValue(items, priceType) {

    var money = 0;
      for(let item of items) {
        if(priceType === 1) {
          if(item.estimatedPrice > 0) {
            money += item.estimatedPrice;
          } else {
            money+= item.buyPrice;
          }
        } else if(priceType === 2){
          money += (item.sellPrice-item.buyPrice);
        }
      }
      return money;
  }

  function topProfit(position) {
    var items = store.getState().soldItems;
    var items2 = [];
    for(let i = 0; i<items.length; i++) {
      let item = {
        name: items[i].name,
        profit: (items[i].sellPrice-items[i].buyPrice),
      }
      items2.push(item);
    }
    items2.sort((a,b) => (a.profit > b.profit) ? -1 : 1);
    return `${items2[position].name} - ${items2[position].profit} zł`;
  }

  return (
    <div id="statsContainer" className={localStorage.getItem('hypehubTheme') > 0 ? 'dark' : ''}>

      <div id="details">

        <div id="totalProfit" className="statsBox">
          <StatsProfitSVG/>
          <p>{moneyValue(store.getState().soldItems, 2)} PLN</p>
          <p>Całkowity zysk</p>
        </div>


          <div id="currentItems" className="statsBox">
            <StatsCurrentSVG/>
            <p>Posiadane przedmioty</p>
            <p>{store.getState().currentItems.length}</p>
            <p>Wartość: {moneyValue(store.getState().currentItems, 1)} PLN</p>
          </div>

          <div id="soldItems" className="statsBox">
            <StatsSoldSVG/>
            <p>Sprzedane przedmioty</p>
            <p>{store.getState().soldItems.length}</p>
          </div>

      </div>

      <div id="moneyStats">
        <div id="week" className="statsChart">
          <MoneyStats period="7" />
        </div>

        <div id="platform" className="statsChart">
        <PlatformStats />
      </div>

      <div id="top3">
        <div id="topProfit">
          <p>Najbardziej dochodowe transakcje</p>
          <p className="profitElement">{topProfit(0)}</p>
          <p className="profitElement">{topProfit(1)}</p>
          <p className="profitElement">{topProfit(2)}</p>
        </div>

      </div>

      </div>



    </div>
  );
}

export default Stats;
