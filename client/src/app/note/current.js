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

  function convertCondition(cond) {
    if (cond === 10) {
      return "DS";
    } else {
      return cond + "/10";
    }
  }

  return (
    <div className="currentContainer">
      {props.items.map((item, index) => (
        <div className="itemSlot currentColumns" id={item.id} key={index}>
          <p onClick={() => props.itemInfo(item.id)}>{item.name}</p>
          {item.type === 1 ? (
            <p onClick={() => props.itemInfo(item.id)}>
              {item.size} ({item.length}x{item.width})
            </p>
          ) : (
            <p onClick={() => props.itemInfo(item.id)}>{item.size}</p>
          )}
          <p onClick={() => props.itemInfo(item.id)}>
            {convertCondition(item.cond)}
          </p>
          <p onClick={() => props.itemInfo(item.id)}>{item.buyPrice} zł</p>
          <p>
            <button
              className="noteButton sellButton"
              onClick={() => sellItem(item.id)}
            >
              $
            </button>
          </p>
          {/* <p><button className="noteButton sellButton" onClick={() => props.itemInfo(item.id)}>i</button></p> */}
          <p>
            <button
              className="noteButton deleteButton"
              id={item.id}
              onClick={id => props.deleteItem(id)}
            >
              x
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
          items={props.items}
          handleModal={() => handleModal()}
          refreshItems={props.refreshItems}
        />
      </ReactModal>
    </div>
  );
}

export default Current;
