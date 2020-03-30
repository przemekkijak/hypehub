import React, {useRef} from 'react'
import '../../styles/css/modifyItem.css';
import axios from 'axios';

function Modify(props) {
    const item = props.item;
    const formBox = useRef();
    const itemName = useRef(0);
    const itemSize = useRef(0);
    const itemBuyPrice = useRef(0);
    const itemSellPrice = useRef(0);
    const soldOn = useRef("");
    const itemCond = useRef(0);
    const itemLength = useRef(0);
    const itemWidth = useRef(0);
    const itemInsert = useRef(0);
    const itemTrackingNumber = useRef(0);
    const shipCompany = useRef(0);
    const data = [
      itemName,
      itemSize,
      itemBuyPrice,
      itemSellPrice,
      itemCond,
      itemLength,
      itemWidth,
      itemInsert,
      itemTrackingNumber,
      shipCompany,
      soldOn
    ];


  function handleSubmit(e) {
      e.preventDefault();
      let itemData = {
        id: item.id,
        name: itemName.current.value,
        buyPrice: itemBuyPrice.current.value,
        sellPrice: itemSellPrice.current.value,
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
      for (var element in itemData) {
        if (/^[a-zA-Z0-9 / ,.-]+$/.test(element.value)) {
          validateData++;
          if (validateData === data.length) {
            if (
              !isNaN(itemData.buyPrice) &&
              !isNaN(itemData.sellPrice) &&
              !isNaN(itemData.cond) &&
              !isNaN(itemData.length) &&
              !isNaN(itemData.width) &&
              !isNaN(itemData.insert)
              ) {
                axios.post('https://hypehub.pl/updateItem', {
                  item: itemData
                })
                .then(res => {
                  if(res.status === 200) {
                    props.refreshItems();
                    props.handleModal();
                  }
                });
              };
            };
          };
        };
      };

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
        }
        else {
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
        <div className="modify">
        <form ref={formBox} onSubmit={handleSubmit} className="modifyForm">
        <p>
         <input
          ref={itemName}
          required
          defaultValue={item.name}
          spellCheck="false"
          id="itemName"/>
        </p>
        <div id="dimensions">

            <input
            autoFocus={true}
            ref={itemSize}
            required
            defaultValue={item.size}/>

          {item.type === 1 && (
            <>
            <input
            ref={itemLength}
            required
            defaultValue={item.length} />
            <span id="length">Dł:</span>

            <input
            ref={itemWidth}
            required
            defaultValue={item.width} />
            <span id="width">Sz:</span>
          </>
          )}
          {item.type === 2 && (
            <>
            <input
            ref={itemInsert}
            defaultValue={item.shoeInsert} />
            <span id="shoeInsert">cm</span>
            </>
          )}
        </div>

        <div id="prices">
          <input
          ref={itemBuyPrice}
          required
          defaultValue={item.buyPrice} />
          <span id="bPrice">Cena kupna</span>
        {item.sold === 1 && (
          <>
            <input
            ref={itemSellPrice}
            required
            defaultValue={item.sellPrice} />
            <span id="sPrice">Cena sprzedaży</span>
        </>
        )}
        </div>
        {item.sold === 1 && (
          <div id="shipInfo">
            <input
            ref={itemTrackingNumber}
            defaultValue={getTracking("number")}/>
            <span id="tracking">Numer paczki</span>

            <select ref={shipCompany} id="shipCompany" defaultValue={getTracking("company")}>
              <option value=""></option>
              <option value="dpd">DPD</option>
              <option value="dhl">DHL</option>
              <option value="pp">Poczta Polska</option>
              <option value="ups">UPS</option>
              <option value="inpost">InPost</option>
          </select>
          <span id="shipcp">Przewoźnik</span>
          </div>
        )}

        {item.sold === 1 && (
          <div id="soldOn">
            <select ref={soldOn} defaultValue={getPlatform()}>
              <option value=""></option>
              <option value="facebook">Facebook</option>
              <option value="vinted">Vinted</option>
              <option value="grailed">Grailed</option>
              <option value="depop">Depop</option>
              <option value="other">Inna</option>
            </select>
            <span>Platforma </span>
          </div>
        )}

        <div id="cond">
          <select ref={itemCond} id="itemCond" defaultValue={item.cond}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          <span id="condSpan">Stan</span>
        </div>

        <button id="unSold" className="addButton" onClick={() => unSold()}>Wycofaj ze sprzedanych</button>
        <button type="submit" className="addButton" value="Submit">Zapisz</button>
      </form>
      <div id="dates">
          <span>Dodano: {item.createdAt.slice(0,10)}</span>
          {item.sold === 1 && (
            <p><span>Sprzedano: {item.soldAt.slice(0,10)}</span></p>

          )}
      </div>
        </div>
    )
}
export default Modify;