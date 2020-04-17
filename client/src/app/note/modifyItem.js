import React, {useRef, useEffect, useState} from 'react'
import '../styles/css/modifyItem.css';
import axios from 'axios';

function Modify(props) {
  const [loaded,setLoading] = useState(false);
  const [item, setItem] = useState();
  const formBox = useRef();
  const itemName = useRef(0);
  const itemBrand = useRef();
  const itemSize = useRef(0);
  const itemBuyPrice = useRef(0);
  const itemSellPrice = useRef(0);
  const itemEstimatedPrice = useRef(0);
  const soldOn = useRef("");
  const itemCond = useRef(0);
  const itemLength = useRef(0);
  const itemWidth = useRef(0);
  const itemInsert = useRef(0);
  const itemTrackingNumber = useRef(0);
  const shipCompany = useRef(0);
  const data = [itemName,itemBrand, itemSize, itemBuyPrice, itemSellPrice, itemEstimatedPrice, itemCond, itemLength, itemWidth, itemInsert, itemTrackingNumber, shipCompany, soldOn];

  useEffect(() => {
    if(loaded) {
      let container = document.getElementById("modifyContainer");
      if(item.sold === 1) {
        container.style.height = "55vh";
        container.style.width = "35vw";
      }
    } else {
      axios.post("https://hypehub.pl/getItem", {
        id: props.itemID,
      })
      .then((res) => {
        if(res.data.status === "success") {
          setItem(res.data.item);
          setLoading(true);
        }
      });
    }
  });

  function handleSubmit(e) {
    e.preventDefault();
    let itemData = {
      id: item.id,
      name: itemName.current.value,
      brand: itemBrand.current.value,
      buyPrice: itemBuyPrice.current.value,
      sellPrice: itemSellPrice.current.value,
      estimatedPrice: itemEstimatedPrice.current.value,
      size: itemSize.current.value,
      length: itemLength.current.value,
      width: itemWidth.current.value,
      insert: itemInsert.current.value,
      soldOn: soldOn.current.value,
      cond: itemCond.current.value,
      trackingNumber: itemTrackingNumber.current.value,
      shipCompany: shipCompany.current.value,
      type: props.itemType,
      ownerID: props.userID,
    };
    if(item.sold===0) {
      itemData.sellPrice = 0;
    }
    if(item.type !== 1) {
      itemData.length = 0;
      itemData.width = 0;
    }
    if(item.type === 1 || item.type === 3) {
      itemData.insert = 0;
    }
    var validateData = 0;
    for (var element of data) {
      let count = validateInput(element);
      validateData += count;
      if(validateData === data.length) {
        axios.post('https://hypehub.pl/updateItem', {
          item: itemData,
        })
          .then(() => {
            props.refreshItems();
          })
        props.handleModal();
      }
    }
  }

  function validateInput(input) {
    var element = document.getElementById(input.current.id);
    if(!element) {
      return 1;
    } else {
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
        case "itemTrackingNumber":
        case "shipCompany":
        case "soldOn":
        case "itemInsert":
        case "itemBrand":
          if(/^[a-zA-Z0-9 / ,.-]*$/.test(input.current.value)) {
            success();
            return 1;
            } else {
              failed();
              return 0;
            }
        case "itemBuyPrice2":
        case "itemSellPrice":
        case "itemEstimatedPrice":
        case "itemCond":
        case "itemLength":
        case "itemWidth":
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

  function getTracking(type) {
    switch(type) {
      default:
      case "number":
        if(item.trackingNumber === "undefined" || item.trackingNumber === null || item.trackingNumber === "") {
          return "";
        } else {
          return item.trackingNumber;
        }
        case "company":
          if(item.shipCompany === "") {
            return "Brak";
          } else {
            return item.shipCompany;
          }
    }
  }

  function getPlatform() {
    if(item.soldOn == null) {
      return "";
    } else {
      return item.soldOn;
    }
  }

  function unSold() {
    axios.post("https://hypehub.pl/unSold", {
      id: item.id,
    })
      .then((res) => {
        if(res.status === 200) {
          props.refreshItems();
          props.handleModal();
        }
      })
  }

  return(
  loaded && (
    <div className={localStorage.getItem('hypehubTheme') > 0 ? 'dark' : ''}>
    <div id="modifyContainer">
    <form ref={formBox} onSubmit={handleSubmit} className="modifyForm">

      <input ref={itemName} defaultValue={item.name} spellCheck="false" id="itemName" required/>
      <input ref={itemBrand} defaultValue={item.brand} spellCheck="false" id="itemBrand"/>
      <input ref={itemSize} defaultValue={item.size} id="itemSize" required/>

      {item.type === 1 && ( //check if item is Cloth
      <>
      <input ref={itemLength} defaultValue={item.length} id="itemLength" required/>
      <input ref={itemWidth} defaultValue={item.width} id="itemWidth" required/>
      </>
      )}
      {item.type === 2 && ( //check if item is Shoe
      <input ref={itemInsert} defaultValue={item.shoeInsert} id="itemInsert"/>
      )}

      <input ref={itemBuyPrice} defaultValue={item.buyPrice} id="itemBuyPrice" required/>

      {item.sold === 0 && (
      <input ref={itemEstimatedPrice} defaultValue={item.estimatedPrice} id="itemEstimatedPrice"/>
      )}

      {item.sold === 1 && (
      <>
      <input ref={itemSellPrice} defaultValue={item.sellPrice} id="itemSellPrice" required/>
      <input ref={itemTrackingNumber} defaultValue={getTracking("number")} id="itemTrackingNumber"/>
      <select ref={shipCompany} defaultValue={getTracking("company")}  id="shipCompany">
        <option value=""></option>
        <option value="dpd">DPD</option>
        <option value="dhl">DHL</option>
        <option value="pp">Poczta Polska</option>
        <option value="ups">UPS</option>
        <option value="inpost">InPost</option>
      </select>
      <select ref={soldOn} id="soldOn" defaultValue={getPlatform()}>
        <option value=""></option>
        <option value="facebook">Facebook</option>
        <option value="vinted">Vinted</option>
        <option value="grailed">Grailed</option>
        <option value="depop">Depop</option>
        <option value="other">Inna</option>
      </select>
      </>
      )}
      <input type="number" ref={itemCond} defaultValue={item.cond} id="itemCond" min="1" max="10"/>
      <button type="submit" className="addButton">Zapisz</button>
    </form>

      {item.sold === 1 &&
        <button id="unSold" className="addButton" onClick={() => unSold()}>Wycofaj ze sprzedanych</button>
      }
      <div id="dates">
        <span>Dodano: {item.createdAt.slice(0,10)}</span>
          {item.sold === 1 && (
            <p><span>Sprzedano: {item.soldAt.slice(0,10)}</span></p>
          )}
      </div>
      <button id="closeModal" onClick={() => props.handleModal()}>x</button>
  </div>
  </div>
    )
  )
}
export default Modify;