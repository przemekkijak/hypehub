import React, {useRef} from 'react'


function Modify(props) {
    const item = props.item;
    const formBox = useRef();
    const itemName = useRef();
    const itemSize = useRef();
    const itemPrice = useRef();
    const itemCond = useRef();
    const itemLength = useRef();
    const itemWidth = useRef();
    const itemData = [
      itemName,
      itemSize,
      itemPrice,
      itemCond,
      itemLength,
      itemWidth
    ];

    function handleSubmit(e) {
      e.preventDefault();
      let item = {
        name: itemName.current.value,
        price: itemPrice.current.value,
        size: itemSize.current.value,
        length: itemLength.current.value,
        width: itemWidth.current.value,
        cond: itemCond.current.value,
        type: props.itemType,
        ownerID: props.userID
      };
      var validateData = 0;
      for (var element of itemData) {
        if (/^[a-zA-Z0-9 / ,.-]+$/.test(element.current.value)) {
          validateData++;
          if (validateData === itemData.length) {
            if (
              !isNaN(item.price) &&
              !isNaN(item.cond) &&
              !isNaN(item.length) &&
              !isNaN(item.width)
            ) {
            //   props.socket.emit("addItem", item);
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
          placeholder="Nazwa"
          ref={itemName}
          autoFocus={true}
          required
          defaultValue={item.name} />
        </p>
        <p>
          <input
          placeholder="Rozmiar"
          ref={itemSize}
          required
          defaultValue={item.size} />
        </p>
        <p>
          <input
          placeholder="Dlugosc"
          ref={itemLength}
          required
          defaultValue={item.length} />
        </p>
        <p>
          <input
          placeholder="Szerokosc"
          ref={itemWidth}
          required
          defaultValue={item.width} />
        </p>
        <p>
          <input
          placeholder="Cena"
          ref={itemPrice}
          required
          defaultValue={item.buyPrice} />
        </p>
        <p>
          <input
          placeholder="Stan"
          ref={itemCond}
          required
          defaultValue={item.cond} />
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