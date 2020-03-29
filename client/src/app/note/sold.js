import React from "react";
import axios from "axios";
import store from "../redux/store/index";

function Sold(props) {
  function deleteItem(id) {
    axios.post(`https://hypehub.pl/deleteItem`, {
      id: id,
    })
    .then(() => {
      props.refreshItems();
    })
  }

  function convertCondition(cond) {
    if (cond === 10) {
      return "DS";
    } else {
      return cond + "/10";
    }
  }
  function itemSize(item) {
    switch (item.type) {
      default:
      case 1:
        if (item.width === 0 || item.length === 0) {
          return item.size;
        } else {
          return `${item.size} (${item.length} x ${item.width})`;
        }
      case 2:
        if (item.shoeInsert === "0" || item.shoeInsert === "") {
          return item.size;
        } else {
          return `${item.size} (${item.shoeInsert}cm)`;
        }
      case 3:
        return item.size;
    }
  }

  function getTracking(item) {
    if (item.trackingNumber !== "undefined") {
      if (item.shipCompany.toLowerCase() === "inpost") {
        return `InPost : ${item.trackingNumber}`;
      } else if(item.shipCompany === "" || item.trackingNumber === "") {
        return null;
      }
       else {
        return `${item.shipCompany.toUpperCase()} : ${item.trackingNumber}`;
      }
    } else {
      return null;
    }
  }

  return (
    <>
    {store.getState().soldItems.length === 0 ? <p id="noItems">Nie posiadasz jeszcze żadnych przedmiotów</p> :
      <div className="soldContainer">
        {store.getState().soldItems.map((item, index) => (
          <div className="itemSlot soldColumns" id="" key={index}>
            <p onClick={() => props.itemInfo(item.id)} id="itemName">{item.name}</p>
            <p onClick={() => props.itemInfo(item.id)} id="itemSize">{itemSize(item)}</p>
            <p onClick={() => props.itemInfo(item.id)} id="itemCond">
              {convertCondition(item.cond)}
            </p>
            <p onClick={() => props.itemInfo(item.id)} id="buyPrice">{item.buyPrice} zł</p>
            <p onClick={() => props.itemInfo(item.id)} id="earnings" >
              {item.sellPrice - item.buyPrice} zł
            </p>
            <p onClick={() => props.itemInfo(item.id)} id="itemTracking">{getTracking(item)}</p>
            <p onClick={() => props.itemInfo(item.id)} id="itemSoldFor">{item.soldFor}</p>
              <button
                className="actionButton"
                id="itemDelete"
                onClick={() => {
                  if (window.confirm(`Czy napewno usunąć ${item.name}?`))
                    deleteItem(item.id);
                }}
              >
                <img
                  src="/img/note/delete.png"
                  alt="delete"
                  className="noteIcon"
                />
              </button>
          </div>
        ))}
      </div>
    }
  </>
  );
}

export default Sold;
