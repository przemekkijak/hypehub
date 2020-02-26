import React, { useRef, useState, useEffect } from "react";
import "../styles/sellItem.css";

function SellItem(props) {
  const socket = props.socket;
  const formBox = useRef();
  const itemPrice = useRef();
  const soldFor = useRef();
  const shipCompany = useRef();
  const trackingNumber = useRef();
  const itemData = [itemPrice, soldFor, shipCompany, trackingNumber]
  const [trackingInput, enableTracking] = useState(false);
  const [item, setItem] = useState();
  const [loading, setLoaded] = useState(false);

  useEffect(() => {
    let unmounted = false;
    socket.emit('getItem', props.id, item => {
      setItem(item[0]);
      setLoaded(true);
    })

    return () => {
       unmounted = true;
    };
  }, [props.id]);

  function handleSubmit(e) {
    e.preventDefault();
    let item = {
      id: props.id,
      price: itemPrice.current.value,
      soldFor: soldFor.current.value,
      shipCompany: shipCompany.current.value,
      trackingNumber: trackingNumber.current.value
    };
    var validateData = 0;
    for(let element of itemData) {
      let count = validateInput(element);
      validateData += count;
      console.log(validateData);
      if(validateData === itemData.length) {
        props.socket.emit('sellItem', item);
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
        case "soldFor":
        case "shipCompany":
        case "trackingNumber":
          if(/^[a-zA-Z0-9 / ,.-]*$/.test(input.current.value)) {
            success();
            return 1;
          } else {
            failed();
            return 0;
          }
        case "itemPrice":
          if(/^[0-9]*$/.test(input.current.value)) {
            success();
            return 1;
          } else {
            failed();
            return 0;
          }
}
}

  function checkTracking() {
    if(shipCompany.current.value !== "") {
      enableTracking(true);
    } else {
      enableTracking(false);
    }
  }

  return (
    loading && (
    <div className="sellContainer">
      <form onSubmit={handleSubmit} ref={formBox} autoComplete="off">
        <div>{item.name}</div>

        <p><input placeholder="Cena" id="itemPrice" ref={itemPrice} autoFocus={true} required/></p>
        <p><input placeholder="Kupujacy (opcjonalnie)" id="soldFor" ref={soldFor} /></p>
        <p><select ref={shipCompany} id="shipCompany" onChange={() => checkTracking()}>
              <option value="">Wybierz przewoźnika</option>
              <option value="dpd">DPD</option>
              <option value="dhl">DHL</option>
              <option value="pp">Poczta Polska</option>
              <option value="ups">UPS</option>
              <option value="inpost">InPost</option>
          </select></p>
          {trackingInput && (
            <p><input placeholder="Numer paczki" id="trackingNumber" ref={trackingNumber}/></p>
          )}


          <p><button type="submit" className="menuButton" value="Submit">
            Sprzedaj
          </button></p>
      </form>
    </div>
    ))
}

export default SellItem;
