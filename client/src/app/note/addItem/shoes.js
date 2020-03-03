import React, { useRef } from "react";
import axios from 'axios';

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
    for(let element of itemData) {
      let count = validateInput(element);
      validateData += count;
      if(validateData === itemData.length) {
        axios.post('http://localhost:3000/addItem', {
          item: item
        });
        props.refreshItems();
        props.handleModal();
      }
    }
  }

  function validateInput(input) {
    var element = document.getElementById(input.current.id);
    function success() {
      element.style.border = "none";
    }
    function failed() {
      element.style.border = "1px solid darkred";
    }

      switch(input.current.id) {
        // Check each item field, if not passed test -> add red border
        default:
        case "itemName":
        case "itemSize":
          if(/^[a-zA-Z0-9 / ,.-]*$/.test(input.current.value)) {
            success();
            return 1;
          } else {
            failed();
            return 0;
          }
        case "itemInsert":
        case "itemPrice":
        case "estimatedPrice":
        case "itemCond":
          if(/^[0-9]*$/.test(input.current.value)) {
            success();
            return 1;
          } else {
            failed();
            return 0;
          }
}
}

  return (
    <>
      <form ref={formBox} onSubmit={handleSubmit} className="addItemForm" autoComplete="off">
        <p>
          <input
          ref={itemName}
          autoFocus={true}
          required
          id="itemName"
          spellCheck="false"/>
          <span>Nazwa</span>
        </p>
        <p>
          <input
          ref={itemSize}
          required
          id="itemSize"/>
          <span>Rozmiar</span>
        </p>
        <p>
          <input
          ref={itemInsert}
          id="itemInsert"/>
          <span>Dlugosc wkladki (cm)</span>
        </p>
        <p>
          <input
          ref={itemPrice}
          required
          id="itemPrice"/>
          <span>Cena</span>
        </p>
        <p>
          <input
          ref={estimatedPrice}
          id="estimatedPrice"/>
          <span>Potencjalna sprzedaz</span>
        </p>
        <p>
          <input
          ref={itemCond}
          required
          id="itemCond"/>
          <span>Stan</span>
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
