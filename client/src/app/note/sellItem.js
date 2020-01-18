import React, { useRef, useState, useEffect } from "react";

function SellItem(props) {
  const socket = props.socket;
  const formBox = useRef();
  const itemPrice = useRef();
  const soldFor = useRef();
  const [itemName, setItemName] = useState();

  useEffect(() => {
    socket.emit('getItem', props.id, item => {
      setItemName(item[0].name);
    })
  });

  function handleSubmit(e) {
    e.preventDefault();
    let item = {
      id: props.id,
      price: itemPrice.current.value,
      soldFor: soldFor.current.value
    };
    if (/^&|^[a-zA-Z0-9 / ,.-]+$/.test(soldFor.value)) {
      if (!isNaN(item.price)) {
        socket.emit("sellItem", item);
        props.refreshItems();
        props.handleModal();
      }
    }
  }
  return (
    <div className="itemMenuBox">
      <form onSubmit={handleSubmit} ref={formBox}>
        <span>Sprzedajesz {itemName}</span>
        <p>
          <input placeholder="Cena" ref={itemPrice} autoFocus={true} required />
        </p>
        <p>
          <input placeholder="Kupujacy (opcjonalnie)" ref={soldFor} />
        </p>
        <p>
          <button type="submit" className="menuButton" value="Submit">
            Sprzedaj
          </button>
        </p>
      </form>
    </div>
    )
}

export default SellItem;
