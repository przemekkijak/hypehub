 import React, { useState, useEffect } from "react";
 import Info from './itemInfo/info'
 import Tools from './itemInfo/tools'
 import Modify from './itemInfo/modify'
 import '../styles/itemInfo.css';




function ItemInfo(props) {
  const socket = props.socket;
  const [loaded, setLoaded] = useState(false);
  const [item, setItem] = useState();
  const [menu, setMenu] = useState(1);

  useEffect(() => {
    !loaded &&
      socket.emit("getItem", props.itemID, data => {
        setItem(data[0]);
        setLoaded(true);
      });
  });


  function itemMenu(menu) {
    switch(menu) {
      case 1:
        break;
      case 2:
        return <Modify item={item} refreshItems={props.refreshItems} handleModal={props.handleModal} socket={socket}/>
      case 3:
        return <Tools item={item} handleModal={props.handleModal} socket={socket}  refreshItems={props.refreshItems}/>
        break;
      default:
       break;
    }
  }

  return (
    loaded && (
      <div className="itemInfoContainer">
        <div className="itemMenu">
        <input
          type="radio"
          name="itemMenu"
          id="info"
          className="detailsRadio"
          onChange={() => setMenu(1)}
          defaultChecked
        />
        <label htmlFor="info">
          Informacje
        </label>

        <input
          type="radio"
          name="itemMenu"
          id="edit"
          className="detailsRadio"
          onChange={() => setMenu(2)}
        />
        <label htmlFor="edit">
          Edytuj
        </label>

        <input
          type="radio"
          name="itemMenu"
          id="tools"
          className="detailsRadio"
          onChange={() => setMenu(3)}
        />
        <label htmlFor="tools">
          Narzedzia
        </label>


        </div>
        <div className="itemContent">
          {itemMenu(menu)}
        </div>

      </div>
    )
  );
}


export default ItemInfo;
