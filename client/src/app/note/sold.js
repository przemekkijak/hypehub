import React from "react";

function Sold(props) {
  function convertCondition(cond) {
    if (cond === 10) {
      return "DS";
    } else {
      return cond + "/10";
    }
  }
  return (
    <div className="soldContainer">
      {props.items.map((item, index) => (
        <div className="itemSlot soldColumns" id="" key={index}>
          <p onClick={() => props.itemInfo(item.id)}>{item.name}</p>
          {item.type === 1 ? (
            <p onClick={() => props.itemInfo(item.id)}>
              {item.size} ({item.length} x {item.width})
            </p>
          ) : (
            <p onClick={() => props.itemInfo(item.id)}>{item.size}</p>
          )}
          <p onClick={() => props.itemInfo(item.id)}>
            {convertCondition(item.cond)}
          </p>
          <p onClick={() => props.itemInfo(item.id)}>{item.buyPrice} zł</p>
          <p id="earnings" onClick={() => props.itemInfo(item.id)}>
            {item.sellPrice - item.buyPrice} zł
          </p>
            <p><button
              className="noteButton deleteButton"
              id={item.id}
              onClick={id => {
                if(window.confirm("Napewno usunac przedmiot?"))
                props.deleteItem(id)
              }}>x</button></p>
        </div>
      ))}
    </div>
  );
}

export default Sold;
