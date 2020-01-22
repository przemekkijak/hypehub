import React, {useRef} from 'react'
import '../../styles/modifyitem.css';

function Modify(props) {
    const item = props.item;
    const formBox = useRef();
    const itemName = useRef(0);
    const itemSize = useRef(0);
    const itemBuyPrice = useRef(0);
    const itemSellPrice = useRef(0);
    const itemCond = useRef(0);
    const itemLength = useRef(0);
    const itemWidth = useRef(0);
    const itemInsert = useRef(0);
    const data = [
      itemName,
      itemSize,
      itemBuyPrice,
      itemSellPrice,
      itemCond,
      itemLength,
      itemWidth,
      itemInsert
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
              !isNaN(itemData.buyPrice) &&
              !isNaN(itemData.sellPrice) &&
              !isNaN(itemData.cond) &&
              !isNaN(itemData.length) &&
              !isNaN(itemData.width) &&
              !isNaN(itemData.insert)
            ) {
              props.socket.emit("updateItem", itemData);
              props.refreshItems();
              props.handleModal();
              console.log(item.insert)
              console.log(itemInsert.current.value);
            } else {alert("Ktores z pol nie jest liczba")}
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
          defaultValue={item.name}
          spellCheck="false" />
          <span>Nazwa</span>
        </p>
        <p>
          <input
          ref={itemSize}
          required
          defaultValue={item.size}/>
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
        {item.type === 2 && (
          <>
          <p>
          <input
          ref={itemInsert}
          defaultValue={item.shoeInsert} />
          <span>Długość wkładki</span>
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
            Zapisz
          </button>
        </p>
      </form>
        </div>
    )
}
export default Modify;