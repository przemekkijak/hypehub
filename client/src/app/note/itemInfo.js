import React, { useState, useEffect } from "react";
import axios from "axios";
import Modify from "./itemInfo/modify";
import "../styles/css/itemInfo.css";

function ItemInfo(props) {
  const [loaded, setLoaded] = useState(false);
  const [item, setItem] = useState();

  useEffect(() => {
    if (loaded) {
      if (item.sold === 0) {
        document.getElementById("itemInfo").style.height = "45vh";
      }
      if(item.sold === 1) {
        document.getElementById("itemInfo").style.width = "35vw";
        document.getElementById('itemInfo').style.height = "55vh";
      }
    }
    !loaded &&
      axios
        .post("https://hypehub.pl/getItem", {
          id: props.itemID,
        })
        .then((res) => {
          if (res.data.status === "success") {
            setItem(res.data.item);
            setLoaded(true);
          }
        });
  });

  return (
    loaded && (
      <div className={localStorage.getItem('hypehubTheme') > 0 ? 'dark' : ''}>
        <div className="itemInfoContainer" id="itemInfo">
          <Modify
            item={item}
            handleModal={props.handleModal}
            refreshItems={props.refreshItems}
          />
        </div>
      </div>
    )
  );
}

export default ItemInfo;
