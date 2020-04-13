import React, { useRef } from "react";
import axios from 'axios';
import '../../styles/css/addshoes.css';

function AddShoes(props) {
  const formBox = useRef();
  const itemName = useRef();
  const itemBrand = useRef();
  const itemSize = useRef();
  const itemInsert = useRef();
  const itemPrice = useRef();
  const itemEstimatedPrice = useRef(0);
  const itemCond = useRef();
  const itemCreatedAt = useRef();
  const itemData = [itemName, itemBrand, itemSize, itemInsert, itemPrice,itemEstimatedPrice, itemCond, itemCreatedAt];

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
      insert: itemInsert.current.value,
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

      switch(input.current.id) {
        // Check each item field, if not passed test -> add red border
        default:
        case "itemName":
        case "itemSize":
        case "itemBrand":
        case "itemCreatedAt":
          if(/^[a-zA-Z0-9 / ,.-]*$/.test(input.current.value)) {
            success();
            return 1;
          } else {
            failed();
            return 0;
          }
        case "itemInsert":
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
  function getDate() {
    let date = new Date().toISOString().replace('T', ' ').slice(0,10);
    return date;
  }

  return (
    <>
      <form ref={formBox} onSubmit={handleSubmit} id="addShoesForm" autoComplete="off">
          <input
          ref={itemName}
          autoFocus={true}
          required
          id="itemName"
          className="addInput"
          spellCheck="false"
          placeholder="Nazwa"/>

          <input
          ref={itemBrand}
          id="itemBrand"
          className="addInput"
          spellCheck="false"
          placeholder="Marka"/>

          <input
          ref={itemSize}
          required
          id="itemSize"
          className="addInput"
          placeholder="Rozmiar"/>
          <input
          ref={itemInsert}
          id="itemInsert"
          className="addInput"
          placeholder="Dlugosc wkladki (cm)"/>

          <input
          ref={itemPrice}
          required
          id="itemPrice"
          className="addInput"
          placeholder="Cena"/>

          <input
          ref={itemEstimatedPrice}
          id="itemEstimatedPrice"
          className="addInput"
          placeholder="Wartość"
          />

          <input
          ref={itemCond}
          required
          id="itemCond"
          className="addInput"
          placeholder="Stan"/>

          <input
          type="date"
          ref={itemCreatedAt}
          id="itemCreatedAt"
          className="addInput"
          name="createdAt"
          defaultValue={getDate()}
          max={getDate()}
          />

          <button type="submit" className="addButton" value="Submit">Dodaj</button>
      </form>
    </>
  );
}

export default AddShoes;
