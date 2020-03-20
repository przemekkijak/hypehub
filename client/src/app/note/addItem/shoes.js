import React, { useRef } from "react";
import axios from 'axios';
import '../../styles/addshoes.css';

function AddShoes(props) {
  const formBox = useRef();
  const itemName = useRef();
  const itemSize = useRef();
  const itemInsert = useRef();
  const itemPrice = useRef();
  const itemCond = useRef();
  const itemData = [itemName, itemSize, itemInsert, itemPrice, itemCond];

  function handleSubmit(e) {
    e.preventDefault();
    let item = {
      name: itemName.current.value,
      price: itemPrice.current.value,
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
        axios.post('https://hypehub.pl/addItem', {
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
      <form ref={formBox} onSubmit={handleSubmit} id="addShoesForm" autoComplete="off">
          <input
          ref={itemName}
          autoFocus={true}
          required
          id="itemName"
          spellCheck="false"
          placeholder="Nazwa"/>

        <div id="dimensions">
          <input
          ref={itemSize}
          required
          id="itemSize"
          placeholder="Rozmiar"/>
          <input
          ref={itemInsert}
          id="itemInsert"
          placeholder="Dlugosc wkladki (cm)"/>
        </div>

          <input
          ref={itemPrice}
          required
          id="itemPrice"
          placeholder="Cena"/>

          <input
          ref={itemCond}
          required
          id="itemCond"
          placeholder="Stan"/>

          <button type="submit" value="Submit">Dodaj</button>
      </form>
    </>
  );
}

export default AddShoes;
