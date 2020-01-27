import React, { useRef } from "react";

function AddClothes(props) {
  const formBox = useRef();
  const itemName = useRef();
  const itemSize = useRef();
  const itemPrice = useRef();
  const estimatedPrice = useRef();
  const itemCond = useRef();
  const itemLength = useRef();
  const itemWidth = useRef();
  const itemData = [itemName,itemSize,itemPrice,itemCond,itemLength,itemWidth, estimatedPrice];

  function handleSubmit(e) {
    e.preventDefault();
    let item = {
      name: itemName.current.value,
      price: itemPrice.current.value,
      estimatedPrice: estimatedPrice.current.value,
      size: itemSize.current.value,
      length: itemLength.current.value,
      width: itemWidth.current.value,
      cond: itemCond.current.value,
      type: props.itemType,
      ownerID: props.userID
    };
    var validateData = 0;
    for (var element in item) {
      if (/^[a-zA-Z0-9 / ,.-]+$/.test(element.value)) {
        validateData++;
        if (validateData === itemData.length) {
          if (
            !isNaN(item.price) &&
            !isNaN(item.cond)
          ) {
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
          ref={itemName}
          autoFocus={true}
          required
          spellCheck="false"  />
          <span>Nazwa</span>
        </p>
        <p>
          <input
          ref={itemSize}
          required />
          <span>Rozmiar</span>
        </p>
        <p>
          <input
          ref={itemLength}
          />
          <span>Dlugosc (cm)</span>
        </p>
        <p>
          <input
          ref={itemWidth}
          />
          <span>Szerokosc (cm)</span>
        </p>
        <p>
          <input
          ref={itemPrice}
          required />
          <span>Cena</span>
        </p>
        <p>
          <input
          ref={estimatedPrice}/>
          <span>Potencjalna sprzedaz</span>
        </p>
        <p>
          <input
          ref={itemCond}
          required />
          <span>Stan</span>
        </p>
          <button type="submit" className="addButton">
            Dodaj
          </button>
      </form>
    </>
  );
}

export default AddClothes;
