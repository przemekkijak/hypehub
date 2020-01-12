import React, { useRef } from "react";

function SellItem(props) {
  const socket = props.socket;
  const formBox = useRef();
  const itemPrice = useRef();
  const soldFor = useRef();
  const sellData = [itemPrice, soldFor];

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
      if (/^[a-zA-Z0-9 ]+$/.test(element.current.value)) {
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

  const items = props.items;
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === props.id) {
      var currentItem = items[i].name;
    }
  }
  return (
    <div className="itemMenuBox">
      <form onSubmit={handleSubmit} ref={formBox}>
        <span>Sprzedajesz {currentItem}</span>
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
  );
}

export default SellItem;
