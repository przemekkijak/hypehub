import React, {useRef} from 'react'
import $ from 'jquery'

function Modify(props) {
  const item = props.item;
  const formBox = useRef();
  const itemName = useRef();
  const itemSize = useRef();
  const itemBuyPrice = useRef(0);
  const itemSellPrice = useRef(0)
  const itemCond = useRef(0);
  const itemLength = useRef(0);
  const itemWidth = useRef(0);
  const data = [
    itemName,
    itemSize,
    itemBuyPrice,
    itemSellPrice,
    itemCond,
    itemLength,
    itemWidth
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
        cond: itemCond.current.value,
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

      var validateData = 0;
      for (var element in itemData) {
        if (/^[a-zA-Z0-9 / ,.-]+$/.test(element.value)) {
          validateData++;
          if (validateData === data.length) {
            if (
              !isNaN(item.buyPrice) &&
              !isNaN(item.sellPrice) &&
              !isNaN(item.cond) &&
              !isNaN(item.length) &&
              !isNaN(item.width)
            ) {
              props.socket.emit("updateItem", itemData);
              props.refreshItems();
              props.handleModal();
            }
          }
        } else {
          alert('Cos poszlo nie tak');
        }
      }
    }
    return(
        <div className="modify">
        <form ref={formBox} onSubmit={handleSubmit} className="modifyForm">
        <p>
         <input
          ref={itemName}
          autoFocus={true}
          required
          defaultValue={item.name} />
          <span>Nazwa</span>
        </p>
        <p>
          <input
          ref={itemSize}
          required
          defaultValue={item.size} />
          <span>Rozmiar</span>
        </p>
        {item.type === 1 && (
        <>
        <p>
          <input
          ref={itemLength}
          required
          defaultValue={item.length} />
          <span>Dlugosc</span>
        </p>
        <p>
          <input
          ref={itemWidth}
          required
          defaultValue={item.width} />
          <span>Szerokosc</span>
        </p>
        </>
        )}
        <p>
          <input
          ref={itemBuyPrice}
          required
          defaultValue={item.buyPrice} />
          <span>Cena kupna</span>
        </p>
        {item.sold === 1 && (
        <p id={item.id}>
            <input
            ref={itemSellPrice}
            required
            defaultValue={item.sellPrice} />
            <span>Cena sprzedazy</span>
        </p>
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
            Zapisz zmiany
          </button>
        </p>
      </form>
        </div>
    )
}
export default Modify;