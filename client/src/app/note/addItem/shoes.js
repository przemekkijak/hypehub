import React, { useRef } from "react";

function AddShoes(props) {
  const formBox = useRef();
  const itemName = useRef();
  const itemSize = useRef();
  const itemInsert = useRef();
  const itemPrice = useRef();
  const estimatedPrice = useRef();
  const itemCond = useRef();
  const itemData = [itemName, itemSize, itemInsert, itemPrice, itemCond, estimatedPrice];

  function handleSubmit(e) {
    e.preventDefault();
    let item = {
      name: itemName.current.value,
      price: itemPrice.current.value,
      estimatedPrice: estimatedPrice.current.value,
      size: itemSize.current.value,
      insert: itemInsert.current.value,
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
            props.handleModal();
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
          placeholder="Nazwa"
          ref={itemName}
          autoFocus={true}
          required
          spellCheck="false"/>
        </p>
        <p>
          <input
          placeholder="Rozmiar"
          ref={itemSize}
          required/>
        </p>
        <p>
          <input
          placeholder="Dlugosc wkladki"
          ref={itemInsert}/>
        </p>
        <p>
          <input placeholder="Cena"
          ref={itemPrice}
          required/>
        </p>
        <p>
          <input
          placeholder="Potencjalna sprzedaż"
          ref={estimatedPrice}/>
        </p>
        <p>
          <input placeholder="Stan"
          ref={itemCond}
          required/>
        </p>
        <p>
          <button type="submit" className="addButton" value="Submit">
            Dodaj
          </button>
        </p>
      </form>
    </>
  );
}

export default AddShoes;
