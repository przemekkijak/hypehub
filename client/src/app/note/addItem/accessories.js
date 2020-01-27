import React, { useRef } from "react";

function AddAccessories(props) {
  const formBox = useRef();
  const itemName = useRef();
  const itemSize = useRef();
  const itemPrice = useRef();
  const estimatedPrice = useRef();
  const itemCond = useRef();
  const itemData = [itemName, itemSize, itemPrice, itemCond, estimatedPrice];

  function handleSubmit(e) {
    e.preventDefault();
    let item = {
      name: itemName.current.value,
      price: itemPrice.current.value,
      estimatedPrice: estimatedPrice.current.value,
      size: itemSize.current.value,
      cond: itemCond.current.value,
      type: props.itemType,
      ownerID: props.userID
    };
    var validateData = 0;
    for (var element in item) {
      if (/(^$)|^[a-zA-Z0-9 / ,.-]+$/.test(element.value)) {
        validateData++;
        if (validateData === itemData.length) {
          if (!isNaN(item.price) && !isNaN(item.cond)) {
            props.socket.emit("addItem", item);
            props.refreshItems();
            props.handleModal("add");
          }
        }
        } else {
          alert('Cos poszlo nie tak');
        }
      }
  }

  return (
    <>
      <form ref={formBox} onSubmit={handleSubmit} className="addItemForm">
        <p>
          <input
          ref={itemName}
          autoFocus={true}
          required
          spellCheck="false"/>
          <span>Nazwa</span>
        </p>
        <p>
          <input
          ref={itemSize}/>
          <span>Rozmiar</span>
        </p>
        <p>
          <input
          ref={itemPrice}
          required/>
          <span>Cena</span>
        </p>
        <p>
          <input
          ref={estimatedPrice}/>
          <span>Potencjalna sprzedaż</span>
        </p>
        <p>
          <input
          ref={itemCond}
          required/>
          <span>Stan</span>
        </p>
        <p>
          <button
          type="submit"
          className="addButton"
          value="Submit">
            Dodaj
          </button>
        </p>
      </form>
    </>
  );
}

export default AddAccessories;
