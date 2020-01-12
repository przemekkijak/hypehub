import React, { useRef, useState, useEffect } from "react";

function SellItem(props) {
  const socket = props.socket;
  const formBox = useRef();
  const itemPrice = useRef();
  const soldFor = useRef();
  const sellData = [itemPrice, soldFor];
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
    // validate data
    var validateData = 0;
    for (var element of sellData) {
      if (/^[a-zA-Z0-9 / ,.-]+$/.test(element.current.value)) {
        validateData++;
        if (validateData === sellData.length) {
          if (!isNaN(item.price)) {
            socket.emit("sellItem", item);
            props.refreshItems();
          }
        }
      }
    }
    props.handleModal();
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
