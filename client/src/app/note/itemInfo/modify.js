import React, {useRef} from 'react'
import '../../styles/modifyItem.css';
import axios from 'axios';

function Modify(props) {
    const item = props.item;
    const formBox = useRef();
    const itemName = useRef(0);
    const itemSize = useRef(0);
    const itemBuyPrice = useRef(0);
    const itemSellPrice = useRef(0);
    const itemEstimatedPrice = useRef(0);
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
      itemEstimatedPrice,
      itemCond,
      itemLength,
      itemWidth,
      itemInsert,
      itemTrackingNumber,
      shipCompany
    ];




  function handleSubmit(e) {
      e.preventDefault();
      let itemData = {
        id: item.id,
        name: itemName.current.value,
        buyPrice: itemBuyPrice.current.value,
        sellPrice: itemSellPrice.current.value,
        estimatedPrice: itemEstimatedPrice.current.value,
        size: itemSize.current.value,
        length: itemLength.current.value,
        width: itemWidth.current.value,
        insert: itemInsert.current.value,
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
      if(item.type === 1) {
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
          case "number":
            if(item.trackingNumber === "undefined" || item.trackingNumber == null) {
              return "Brak";
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
        {item.sold === 0 && (
          <>
            <input
            ref={itemEstimatedPrice}
            required
            defaultValue={item.estimatedPrice} />
            <span id="esPrice">Potencjalna sprzedaż</span>
          </>
        )}
        </div>
        {item.sold === 1 && (
          <div id="shipInfo">
            <input
            ref={itemTrackingNumber}
            defaultValue={getTracking("number")}/>
            <span id="tracking">Numer paczki</span>

            <input
            ref={shipCompany}
            defaultValue={getTracking("company")}/>
            <span id="shipcp">Przewoznik</span>
          </div>
        )}


        <p>
          <input
          ref={itemCond}
          required
          defaultValue={item.cond} />
          <span>Stan</span>
        </p>
        <p>
          <button type="submit" className="addButton" value="Submit">
            Zapisz
          </button>
        </p>
      </form>
        </div>
    )
}
export default Modify;