import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "../styles/css/sellItem.css";

function SellItem(props) {
  const itemPrice = useRef();
  const soldFor = useRef();
  const soldOn = useRef();
  const shipCompany = useRef();
  const trackingNumber = useRef(0);
  const itemData = [itemPrice, soldFor, soldOn, shipCompany, trackingNumber];
  const [trackingInput, enableTracking] = useState(false);
  const [item, setItem] = useState();
  const [loading, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .post("https://hypehub.pl/getItem", {
        id: props.id,
      })
      .then((res) => {
        if (res.data.status === "success") {
          setItem(res.data.item);
          setLoaded(true);
        }
      });
  }, [props.id]);

  function handleSubmit(e) {
    e.preventDefault();
    let item = {
      id: props.id,
      price: itemPrice.current.value,
      soldFor: soldFor.current.value,
      soldOn: soldOn.current.value,
      shipCompany: shipCompany.current.value,
      trackingNumber: trackingNumber.current.value,
    };
    var validateData = 0;
    for (let element of itemData) {
      let count = validateInput(element);
      validateData += count;
      if (validateData === itemData.length) {
        axios
          .post("https://hypehub.pl/sellItem", {
            item: item,
          })
          .then((res) => {
            if (res.status === 200) {
              props.refreshItems();
              props.handleModal();
            }
          });
      }
    }
  }

  function validateInput(input) {
    var element = document.getElementById(input.current.id);
    function success() {
      if (element) {
        element.style.border = "none";
      }
    }
    function failed() {
      if (element) {
        element.style.border = "1px solid darkred";
      }
    }

    switch (input.current.id) {
      // Check each item field, if not passed test -> add red border
      default:
      case "soldFor":
      case "soldOn":
      case "shipCompany":
      case "trackingNumber":
        if (/^[a-zA-Z0-9 / ,.-]*$/.test(input.current.value)) {
          success();
          return 1;
        } else {
          failed();
          return 0;
        }
      case "itemPrice":
        if (/^[0-9]*$/.test(input.current.value)) {
          success();
          return 1;
        } else {
          failed();
          return 0;
        }
    }
  }

  function checkTracking() {
    if (shipCompany.current.value !== "") {
      enableTracking(true);
    } else {
      enableTracking(false);
    }
  }

  return (
    loading && (
      <div className="sellContainer">
        <form onSubmit={handleSubmit} autoComplete="off" id="sellForm">
          <div id="itemName">{item.name}</div>

          <input
            placeholder="Cena"
            id="itemPrice"
            ref={itemPrice}
            autoFocus={true}
            required
          />
          <input placeholder="Kupujacy" id="soldFor" ref={soldFor} />
          <select ref={soldOn} id="soldOn" placeholder="Platforma sprzedaży">
            <option value="null" disabled selected hidden>
              Platforma sprzedaży
            </option>
            <option value="facebook">Facebook</option>
            <option value="vinted">Vinted</option>
            <option value="grailed">Grailed</option>
            <option value="depop">Depop</option>
            <option value="other">Inna</option>
          </select>
          <select
            ref={shipCompany}
            id="shipCompany"
            onChange={() => checkTracking()}
          >
            <option value="" disabled selected hidden>
              Wybierz przewoźnika
            </option>
            <option value="dpd">DPD</option>
            <option value="dhl">DHL</option>
            <option value="pp">Poczta Polska</option>
            <option value="ups">UPS</option>
            <option value="inpost">InPost</option>
          </select>
          {trackingInput && (
            <input
              placeholder="Numer paczki"
              id="trackingNumber"
              ref={trackingNumber}
            />
          )}
          <br />
          <button type="submit" className="menuButton" value="Submit">
            Sprzedaj
          </button>
        </form>
      </div>
    )
  );
}

export default SellItem;
