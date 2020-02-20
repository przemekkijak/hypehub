import React, { useRef, useState, useEffect } from "react";
import "../styles/sellItem.css";

function SellItem(props) {
  const socket = props.socket;
  const formBox = useRef();
  const itemPrice = useRef();
  const soldFor = useRef();
  const tracking = useRef();
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
      soldFor: soldFor.current.value
    };
    if (/^&|^[a-zA-Z0-9 / ,.-]+$/.test(soldFor.value)) {
      if (!isNaN(item.price)) {
        socket.emit("sellItem", item);
        props.refreshItems();
        props.handleModal();
      }
    }
  }

  function checkTracking() {
    if(tracking.current.value.length > 0 ) {
      enableTracking(true);
    } else {
      enableTracking(false);
    }
  }
  return (
    loading && (
    <div className="sellContainer">
      <form onSubmit={handleSubmit} ref={formBox}>
        <span>Sprzedajesz {item.name}</span>

        <p><input placeholder="Cena" ref={itemPrice} autoFocus={true} required/></p>
        <p><input placeholder="Kupujacy (opcjonalnie)" ref={soldFor} /></p>
        <p><input placeholder="Tracking" ref={tracking} onChange={() => checkTracking()} /></p>


        {trackingInput && (
          <p>tracking input</p>
        )}

          <button type="submit" className="menuButton" value="Submit">
            Sprzedaj
          </button>
      </form>
    </div>
    ))
}

export default SellItem;
