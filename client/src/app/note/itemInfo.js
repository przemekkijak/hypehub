import React, { useState, useEffect } from "react";

function ItemInfo(props) {
  const socket = props.socket;
  const [loaded, setLoaded] = useState(false);
  const [item, setItem] = useState();

  useEffect(() => {
    !loaded &&
      socket.emit("getItem", props.itemID, data => {
        setItem(data[0]);
        setLoaded(true);
      });
  });
  return (
    loaded && (
      <div className="itemInfoContainer">
        <div className="itemHeader">
          <p id="itemName">{item.name}</p>
        </div>
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
        </div>
      </div>
    )
  );
}

export default ItemInfo;
