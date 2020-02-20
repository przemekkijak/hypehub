import React, {useEffect, useState } from "react";

function Sold(props) {


  function convertCondition(cond) {
    if (cond === 10) {
      return "DS";
    } else {
      return cond + "/10";
    }
  }
  function itemSize(item) {
    switch(item.type) {
      case 1:
        if(item.width === 0 || item.length === 0) {
        return item.size;
        } else {
        return `${item.size} (${item.length} x ${item.width})`;
        }
      case 2:
        if(item.shoeInsert === "0" || item.shoeInsert === "") {
        return item.size;
        } else {
        return `${item.size} (${item.shoeInsert}cm)`
        }
      case 3:
        return item.size;
    }
  }

  function getTracking(item) {
    if(item.trackingNumber) {
    return `${item.shipCompany.toUpperCase()}: ${item.trackingNumber}`;
    }
  }

  return (
    <div className="soldContainer">
      {props.items.map((item, index) => (

        <div className="itemSlot soldColumns" id="" key={index}>
          <p onClick={() => props.itemInfo(item.id)}>{item.name}</p>
          <p onClick={() => props.itemInfo(item.id)}>{itemSize(item)}</p>
          <p onClick={() => props.itemInfo(item.id)}>{convertCondition(item.cond)}</p>
          <p onClick={() => props.itemInfo(item.id)}>{item.buyPrice} zł</p>
          <p onClick={() => props.itemInfo(item.id)} id="earnings">{item.sellPrice - item.buyPrice} zł</p>
          <p onClick={() => props.itemInfo(item.id)}><a>{getTracking(item)}</a></p>
          <p><button
            className="actionButton"
            id={item.id}
            onClick={id => {if(window.confirm("Napewno usunac przedmiot?"))
              props.deleteItem(id)}}>
              <img src="/img/note/delete.png" alt="delete" className="noteIcon"/>
            </button></p>
        </div>
      ))}
    </div>

);
}

export default Sold;
