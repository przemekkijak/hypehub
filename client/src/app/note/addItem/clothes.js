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
        element.style.border = "2px solid darkred";
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
      <span className="sectionSpan" id="requiredInfo">Wymagane informacje</span>
      <input
        ref={itemName}
        className="addInput"
        id="itemName"
        autoFocus
        required
        spellCheck="false"/>
        <span id="nameSpan" className="fieldSpan">Nazwa</span>

        <input
        ref={itemSize}
        id="itemSize"
        className="addInput"
        spellCheck="false"/>
        <span id="sizeSpan" className="fieldSpan">Rozmiar</span>

        <input
        type="number"
        ref={itemPrice}
        id="itemPrice"
        className="addInput"
        spellCheck="false"
        required/>
        <span id="priceSpan" className="fieldSpan">Cena</span>

        <span id="detailsInfo" className="sectionSpan">Szczegóły</span>

      <input
        type="number"
        ref={itemLength}
        id="itemLength"
        className="addInput"
        spellCheck="false"/>
        <span id="lengthSpan" className="fieldSpan">Długość</span>

      <input
        type="number"
        ref={itemWidth}
        id="itemWidth"
        className="addInput"
        spellCheck="false"/>
        <span id="widthSpan" className="fieldSpan">Szerokość</span>

      <input
        ref={itemBrand}
        id="itemBrand"
        className="addInput"
        spellCheck="false"/>
      <span id="brandSpan" className="fieldSpan">Marka</span>

      <input
        type="number"
        ref={itemEstimatedPrice}
        id="itemEstimatedPrice"
        className="addInput"/>
        <span id="estimatedSpan" className="fieldSpan">Wartość</span>

      <input
        type="number"
        ref={itemCond}
        id="itemCond"
        className="addInput"
        spellCheck="false"
        required/>
        <span id="condSpan" className="fieldSpan">Stan</span>

      <input
        type="date"
        ref={itemCreatedAt}
        name="createdAt"
        id="itemCreatedAt"
        className="addInput"
        defaultValue={getDate()}
        max={getDate()}/>
        <span id="createdAtSpan" className="fieldSpan">Data zakupu</span>

      <button type="submit" className="addButton">Dodaj</button>

    </form>
  );
}

export default AddClothes;
