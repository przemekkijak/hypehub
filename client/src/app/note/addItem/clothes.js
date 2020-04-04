import React, { useRef } from "react";
import axios from 'axios';
import '../../styles/css/addclothes.css';

function AddClothes(props) {
  const formBox = useRef();
  const itemName = useRef();
  const itemBrand = useRef();
  const itemSize = useRef();
  const itemPrice = useRef();
  const itemEstimatedPrice = useRef(0);
  const itemCond = useRef();
  const itemLength = useRef();
  const itemWidth = useRef();
  const itemCreatedAt = useRef();
  const itemData = [itemName,itemBrand,itemSize,itemPrice,itemEstimatedPrice,itemCond,itemLength,itemWidth, itemCreatedAt];


  function handleSubmit(e) {
    e.preventDefault();

    let time = new Date().toLocaleTimeString();
    var itemCreatedAtFull = `${itemCreatedAt.current.value} ${time}`;


    let item = {
      name: itemName.current.value,
      brand: itemBrand.current.value,
      price: itemPrice.current.value,
      estimatedPrice: itemEstimatedPrice.current.value,
      size: itemSize.current.value,
      length: itemLength.current.value,
      width: itemWidth.current.value,
      cond: itemCond.current.value,
      createdAt: itemCreatedAtFull,
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
        })
        .then((res) => {
          props.refreshItems();
        })
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

      if(element) {
        switch(input.current.id) {
          // Check each item field, if not passed test -> add red border
          default:
          case "itemName":
          case "itemBrand":
          case "itemSize":
          case "itemCreatedAt":
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
          case "itemEstimatedPrice":
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
}

  function getDate() {
    let date = new Date().toISOString().replace('T', ' ').slice(0,10);
    return date;
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
          ref={itemBrand}
          id="itemBrand"
          spellCheck="false"
          placeholder="Marka"/>

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
          ref={itemEstimatedPrice}
          id="itemEstimatedPrice"
          placeholder="Przybliżona wartość"
          />

          <input
          ref={itemCond}
          spellCheck="false"
          id="itemCond"
          placeholder="Stan"
          required />

          <input
          type="date"
          ref={itemCreatedAt}
          id="itemCreatedAt"
          name="createdAt"
          defaultValue={getDate()}
          max={getDate()}
          />

          <button type="submit" className="addButton">
            Dodaj
          </button>

      </form>
  );
}

export default AddClothes;
