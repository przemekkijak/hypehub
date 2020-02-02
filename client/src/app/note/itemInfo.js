 import React, { useState, useEffect } from "react";
 import Info from './itemInfo/info'
 import Tools from './itemInfo/tools'
 import Modify from './itemInfo/modify'
 import Photos from './itemInfo/photos'
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
        return <Info item={item}/>
      case 2:
        return <Modify item={item} handleModal={props.handleModal} socket={socket} refreshItems={props.refreshItems}/>
      case 3:
        return <Photos item={item} handleModal={props.handleModal} socket={socket} refreshItems={props.refreshItems}/>
      case 4:
        return <Tools item={item} handleModal={props.handleModal} socket={socket}  refreshItems={props.refreshItems}/>

    }
  }

  return (
    loaded && (
      <div className="itemInfoContainer">
      <div className="itemMenu">
        <input
          type="radio"
          name="itemoption"
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
          name="itemoption"
          id="edit"
          className="detailsRadio"
          onChange={() => setMenu(2)}
        />
        <label htmlFor="edit">
          Edytuj
        </label>

        <input
          type="radio"
          name="itemoption"
          id="photos"
          className="detailsRadio"
          onChange={() => setMenu(3)}
        />
        <label htmlFor="photos">
          Zdjecia
        </label>

        <input
          type="radio"
          name="itemoption"
          id="tools"
          className="detailsRadio"
          onChange={() => setMenu(4)}
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
