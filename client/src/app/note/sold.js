import React, {useRef} from "react";
import axios from "axios";
import store from "../redux/store/index";

function Sold(props) {
  const profitR = useRef();
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
    if(item.trackingNumber !== "" && item.shipCompany !== "") {
      return `${item.shipCompany.toUpperCase()} - ${item.trackingNumber}`;
    } else if(item.shipCompany !== "" && item.trackingNumber === "") {
      return `${item.shipCompany.toUpperCase()}`;
    }
  }
  function getProfit(item) {
    let calculateProfit = item.sellPrice - item.buyPrice;
    var profitColor;
    if(calculateProfit < 0 ) {
      profitColor = {color: '#BD3030'};
    }
    const profit = <span style={profitColor}>{calculateProfit} zł</span>

    return profit;
  }

  return (
    <>
    {store.getState().soldItems.length === 0 ? <p id="noItems">Nie posiadasz jeszcze żadnych przedmiotów</p> :
      <div className="soldContainer">
        {store.getState().soldItems.map((item, index) => (
          <div className="itemSlot soldColumns" id="" key={index}>
            <p onClick={() => props.itemInfo(item.id)} id="itemNameSold">{item.name}</p>
            <p onClick={() => props.itemInfo(item.id)} id="itemBrandSold">{item.brand}</p>
            <p onClick={() => props.itemInfo(item.id)} id="itemSizeSold">{itemSize(item)}</p>
            <p onClick={() => props.itemInfo(item.id)} id="itemCondSold">
              {convertCondition(item.cond)}
            </p>
            <p onClick={() => props.itemInfo(item.id)} id="buyPriceSold">{item.buyPrice} zł</p>
            <p onClick={() => props.itemInfo(item.id)} id="earningsSold" ref={profitR}>{getProfit(item)}</p>
            <p onClick={() => props.itemInfo(item.id)} id="itemTrackingSold">{getTracking(item)}</p>
            <p onClick={() => props.itemInfo(item.id)} id="itemSoldForSold">{item.soldFor}</p>
              <img
                className="actionButton "
                id="itemDelete"
                src="/img/note/delete.svg"
                alt="Delete"
                onClick={() => {
                  if (window.confirm(`Czy napewno usunąć ${item.name}?`))
                    deleteItem(item.id);
                }}
              />

          </div>
        ))}
      </div>
    }
  </>
  );
}

export default Sold;
