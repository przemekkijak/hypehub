 import React, { useState, useEffect } from "react";
 import axios from 'axios';
 import Info from './itemInfo/info'
 import Modify from './itemInfo/modify'
 import Photos from './itemInfo/photos'
 import '../styles/itemInfo.css';


function ItemInfo(props) {
  const [loaded, setLoaded] = useState(false);
  const [item, setItem] = useState();
  const [menu, setMenu] = useState(1);

  useEffect(() => {
    !loaded &&
      axios.post('https://hypehub.pl/getItem', {
        id: props.itemID
      })
      .then(res => {
        if(res.data.status === 'success') {
          setItem(res.data.item);
          setLoaded(true);
        }
      })
  });


  function itemMenu(menu) {
    switch(menu) {
      default:
      case 1:
        return <Info item={item} handleModal={props.handleModal} refreshItems={props.refreshItems}/>
      case 2:
        return <Modify item={item} handleModal={props.handleModal} refreshItems={props.refreshItems}/>
      case 3:
        return <Photos item={item} handleModal={props.handleModal} refreshItems={props.refreshItems}/>
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


      </div>
        <div className="itemContent">
          {itemMenu(menu)}
        </div>

      </div>
    )
  );
}


export default ItemInfo;
