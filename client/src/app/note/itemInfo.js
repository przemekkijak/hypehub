 import React, { useState, useEffect } from "react";
 import Info from './itemInfo/info'
 import Tools from './itemInfo/tools'
 import Modify from './itemInfo/modify'




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
        return <p> test narzedzia </p>
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
        {/*
        <div className="itemOptions">
          <p>
            <button>Skopiuj opis</button>
          </p>
          <p>
            <button>Zdjecie z opisem</button>
          </p>
          <p>
            <button>Zdjecie bez opisu</button>
          </p>
        </div>
        <div className="itemPhotos">
          <img
            src="https://hypehub.s3.eu-central-1.amazonaws.com/items_img/252/1.jpg"
            alt="item"
            className="itemPhoto"
          />
          <img
            src="https://hypehub.s3.eu-central-1.amazonaws.com/items_img/252/2.jpg"
            alt="item"
            className="itemPhoto"
          />
          <img
            src="https://hypehub.s3.eu-central-1.amazonaws.com/items_img/252/3.jpg"
            alt="item"
            className="itemPhoto"
          />
          <img
            src="https://hypehub.s3.eu-central-1.amazonaws.com/items_img/252/4.jpg"
            alt="item"
            className="itemPhoto"
          />
        </div> */}
      </div>
    )
  );
}


export default ItemInfo;
