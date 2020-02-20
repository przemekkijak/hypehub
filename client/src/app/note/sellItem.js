import React, { useRef, useState, useEffect } from "react";
import "../styles/sellItem.css";

function SellItem(props) {
  const socket = props.socket;
  const formBox = useRef();
  const itemPrice = useRef();
  const soldFor = useRef();
  const shipCompany = useRef();
  const trackingNumber = useRef();
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
    if (/^&|^[a-zA-Z0-9 / ,.-]+$/.test(soldFor.value) && /^&|^[a-zA-Z0-9 / ,.-]+$/.test(trackingNumber.value)) {
      if (!isNaN(item.price)) {
        socket.emit("sellItem", item);
        props.refreshItems();
        props.handleModal();
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
      <form onSubmit={handleSubmit} ref={formBox}>
        <div>{item.name}</div>

        <p><input placeholder="Cena" ref={itemPrice} autoFocus={true} required/></p>
        <p><input placeholder="Kupujacy (opcjonalnie)" ref={soldFor} /></p>
        <p><select ref={shipCompany} onChange={() => checkTracking()}>
              <option value="">Wybierz przewoźnika</option>
              <option value="dpd">DPD</option>
              <option value="dhl">DHL</option>
              <option value="pp">Poczta Polska</option>
              <option value="ups">UPS</option>
              <option value="inpost">InPost</option>
          </select></p>
          {trackingInput && (
            <p><input placeholder="Numer paczki" ref={trackingNumber}/></p>
          )}


          <p><button type="submit" className="menuButton" value="Submit">
            Sprzedaj
          </button></p>
      </form>
    </div>
    ))
}

export default SellItem;
