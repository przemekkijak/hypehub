import React from "react";
import "./styles/stats.css";
import PlatformStats from "./stats/platformStats";
import MoneyStats from "./stats/moneyStats";

function Stats(props) {
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
    </div>
  );
}

export default Stats;
