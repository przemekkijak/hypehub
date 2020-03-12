import React, { useRef } from "react";
import axios from 'axios';
import '../../styles/addclothes.css';

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
          case "itemLength":
          case "itemWidth":
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
      <form ref={formBox} onSubmit={handleSubmit} id="addClothes" autoComplete="off">
          <input
          ref={itemName}
          id="itemName"
          autoFocus={true}
          required
          spellCheck="false"
          placeholder="Nazwa" />

          <input
          id="itemSize"
          ref={itemSize}
          required
          spellCheck="false"
          placeholder="Rozmiar"/>


        <div id="dimensions">
          <input
          ref={itemLength}
          id="itemLength"
          spellCheck="false"
          placeholder="Długość"
          />

          <input
          ref={itemWidth}
          spellCheck="false"
          id="itemWidth"
          placeholder="Szerokość"
          />
        </div>

          <input
          ref={itemPrice}
          spellCheck="false"
          id="itemPrice"
          placeholder="Cena"
          required />

          <input
          ref={estimatedPrice}
          spellCheck="false"
          id="estimatedPrice"
          placeholder="Potencjalna sprzedaż"
          />

          <input
          ref={itemCond}
          spellCheck="false"
          id="itemCond"
          placeholder="Stan"
          required />

          <button type="submit" className="addButton">
            Dodaj
          </button>
      </form>
  );
}

export default AddClothes;
