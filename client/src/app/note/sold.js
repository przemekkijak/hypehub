import React from "react";
import axios from "axios";

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
        return `-`;
      }
       else {
        return `${item.shipCompany.toUpperCase()} : ${item.trackingNumber}`;
      }
    } else {
      return `-`;
    }
  }

  return (
    <>
    {props.items.length === 0 ? <p id="noItems">Nie posiadasz jeszcze żadnych przedmiotów</p> :
      <div className="soldContainer">
        {props.items.map((item, index) => (
          <div className="itemSlot soldColumns" id="" key={index}>
            <p onClick={() => props.itemInfo(item.id)}>{item.name}</p>
            <p onClick={() => props.itemInfo(item.id)}>{itemSize(item)}</p>
            <p onClick={() => props.itemInfo(item.id)}>
              {convertCondition(item.cond)}
            </p>
            <p onClick={() => props.itemInfo(item.id)}>{item.buyPrice} zł</p>
            <p onClick={() => props.itemInfo(item.id)} id="earnings">
              {item.sellPrice - item.buyPrice} zł
            </p>
            <p onClick={() => props.itemInfo(item.id)}>{getTracking(item)}</p>
            <p onClick={() => props.itemInfo(item.id)}>{item.soldFor}</p>
            <p>
              <button
                className="actionButton"
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
            </p>
          </div>
        ))}
      </div>
    }
  </>
  );
}

export default Sold;
