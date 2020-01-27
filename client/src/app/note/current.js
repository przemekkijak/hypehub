import React, { useState } from "react";
import ReactModal from "react-modal";
import SellItem from "./sellItem";

ReactModal.setAppElement("#root");

function Current(props) {
const socket = props.socket;
const [sellModal, setSellModal] = useState(false);
const [currentId, setCurrentId] = useState(0);



function sellItem(id) {
  setSellModal(true);
  setCurrentId(id);
}
function handleModal() {
  setSellModal(!sellModal);
}

function itemCondition(cond) {
  if (cond === 10) {
    return "DS";
  } else {
    return cond + "/10";
  }
}
function itemSize(item) {
  switch(item.type) {
    case 1:
      if(item.width === 0 || item.length === 0) {
      return item.size;
      } else {
      return `${item.size} (${item.length} x ${item.width})`;
      }
    case 2:
      if(item.shoeInsert === "0" || item.shoeInsert === "") {
      return item.size;
      } else {
      return `${item.size} (${item.shoeInsert}cm)`
      }
    case 3:
      return item.size;
  }
}
  return (
    <div className="currentContainer">
      {props.items.map((item, index) => (
        <div className="itemSlot currentColumns" id={item.id} key={index}>
          <p onClick={() => props.itemInfo(item.id)}>{item.name}</p>
          <p onClick={() => props.itemInfo(item.id)}>{itemSize(item)}</p>
          <p onClick={() => props.itemInfo(item.id)}>{itemCondition(item.cond)}</p>
          <p onClick={() => props.itemInfo(item.id)}>{item.buyPrice} zł</p>
          <p onClick={() => props.itemInfo(item.id)}>{item.estimatedPrice} zł</p>
          <p><button
              className="noteButton sellButton"
              onClick={() => sellItem(item.id)}>$
              </button>
          </p>
          <p>
            <button
              className="noteButton deleteButton"
              id={item.id}
              onClick={id => {
                if(window.confirm("Napewno usunac przedmiot?"))
                props.deleteItem(id)
              }}>x
            </button>
          </p>
        </div>
      ))}


      <ReactModal
        isOpen={sellModal}
        className={"modalContent"}
        overlayClassName={"modalOverlay"}
        onRequestClose={() => setSellModal(false)}
      >
        <SellItem
          socket={socket}
          id={currentId}
          handleModal={() => handleModal()}
          refreshItems={props.refreshItems}
        />
      </ReactModal>
    </div>
  );
}

export default Current;
