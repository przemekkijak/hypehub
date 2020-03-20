 import React, { useState, useEffect } from "react";
 import axios from 'axios';
 import Info from './itemInfo/info'
 import Modify from './itemInfo/modify'
 import '../styles/itemInfo.css';


function ItemInfo(props) {
  const [loaded, setLoaded] = useState(false);
  const [item, setItem] = useState();

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


  return (
    loaded && (
      <div className="itemInfoContainer">


        <div className="itemContent">
          <Modify item={item} handleModal={props.handleModal} refreshItems={props.refreshItems}/>
        </div>

      </div>
    )
  );
}


export default ItemInfo;
