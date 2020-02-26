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

function deleteItem(id) {
  socket.emit('deleteItem', id);
  props.refreshItems();
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
    default:
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
              className="actionButton"
              onClick={() => sellItem(item.id)}>
                <img src="/img/note/coin.png" alt="coin" className="noteIcon"/>
              </button>
          </p>
          <p>
            <button
              className="actionButton"
              onClick={() => props.itemInfo(item.id)}>
                <img src="/img/note/info.png" alt="info" className="noteIcon"/>
              </button>
          </p>
          <p>
            <button
              className="actionButton"
              onClick={() => {
                if(window.confirm(`Czy napewno usunąć ${item.name}?`))
                deleteItem(item.id);
              }}>
                <img src="/img/note/delete.png" alt="delete" className="noteIcon"/>
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
