import React, { useRef, useState, useEffect } from "react";

function AddClothes(props) {
  const [loaded, setLoading] = useState(false);
  const formBox = useRef();
  const itemName = useRef();
  const itemSize = useRef();
  const itemPrice = useRef();
  const estimatedPrice = useRef();
  const itemCond = useRef();
  const itemLength = useRef();
  const itemWidth = useRef();
  const itemData = [itemName,itemSize,itemPrice,itemCond,itemLength,itemWidth, estimatedPrice];

  useEffect(() => {
    let unmounted = false;
    setLoading(true);

    return() => {unmounted = true;}
  });


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
        console.log(`Something wrong with ${element.value}`);
      }
    }
  }

  function validateInput(input) {
    var element = document.getElementById(input.current.id)
    
        if(/^[0-9cm]*$/.test(input.current.value)) {
          element.style.border = "none";
        } else {
          element.style.border = "1px solid darkred";
        }
  }

  return (
    loaded &&
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
          required/>
          <span>Rozmiar</span>
        </p>
        <p>
          <input
          ref={itemLength}
          id="itemLength"
          spellCheck="false"
          onChange={() => validateInput(itemLength)}
          />
          <span>Dlugosc (cm)</span>
        </p>
        <p>
          <input
          ref={itemWidth}
          spellCheck="false"
          onChange={() => validateInput(itemWidth)}
          />
          <span>Szerokosc (cm)</span>
        </p>
        <p>
          <input
          ref={itemPrice}
          spellCheck="false"
          onChange={() => validateInput(itemPrice)}
          required />
          <span>Cena</span>
        </p>
        <p>
          <input
          ref={estimatedPrice}
          spellCheck="false"
          onChange={() => validateInput(estimatedPrice)}
          />
          <span>Potencjalna sprzedaz</span>
        </p>
        <p>
          <input
          ref={itemCond}
          spellCheck="false"
          onChange={() => validateInput(itemCond)}
          required />
          <span>Stan</span>
        </p>
          <button type="submit" className="addButton">
            Dodaj
          </button>
      </form>
  );
}

export default AddClothes;
