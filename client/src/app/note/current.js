import React, { useState } from "react";
import ReactModal from "react-modal";
import axios from "axios";
import SellItem from "./sellItem";
import store from "../redux/store/index";

ReactModal.setAppElement("#root");

function Current(props) {


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
    axios.post(`https://hypehub.pl/deleteItem`, {
      id: id,
    })
    .then(() => {
      props.refreshItems();
    })
  }

  function itemCondition(cond) {
    if (cond === 10) {
      return "DS";
    } else {
      return cond + "/10";
    }
  }
  function itemSize(item) {
    switch (item.type) {
      default:
      case 1:
        if (item.width === 0 || item.length === 0) {
          return item.size;
        } else {
          return `${item.size} (${item.length} x ${item.width})`;
        }
      case 2:
        if (item.shoeInsert === "0" || item.shoeInsert === "") {
          return item.size;
        } else {
          return `${item.size} (${item.shoeInsert}cm)`;
        }
      case 3:
        return item.size;
    }
  }
  return (
    <>
    {store.getState().currentItems.length === 0 ? <p id="noItems">Nie posiadasz jeszcze żadnych przedmiotów</p> :
      <div className="currentContainer">
        {store.getState().currentItems.map((item, index) => (
          <div className="itemSlot currentColumns" id={item.id} key={index}>
            <p onClick={() => props.itemInfo(item.id)} id="itemName">{item.name}</p>
            <p onClick={() => props.itemInfo(item.id)} id="itemSize">{itemSize(item)}</p>
            <p onClick={() => props.itemInfo(item.id)} id="itemCond">
              {itemCondition(item.cond)}
            </p>
            <p onClick={() => props.itemInfo(item.id)} id="itemBuyPrice">{item.buyPrice} zł</p>
              <img
                className="actionButton itemSell noteIcon"
                src="/img/note/coin.svg"
                alt="Sell "
                onClick={() => sellItem(item.id)}/>
              <img
                className="actionButton itemInfo noteIcon"
                src="/img/note/info.svg"
                alt="Info"
                onClick={() => props.itemInfo(item.id)}
              />
              <img
                className="actionButton itemDelete noteIcon"
                src="/img/note/delete.svg"
                alt="Delete"
                onClick={() => {
                  if (window.confirm(`Czy napewno usunąć ${item.name}?`))
                    deleteItem(item.id);
                }}
              />

          </div>
        ))}

        <ReactModal
          isOpen={sellModal}
          className={"modalContent"}
          overlayClassName={"modalOverlay"}
          onRequestClose={() => setSellModal(false)}
        >
          <SellItem
            id={currentId}
            handleModal={() => handleModal()}
            refreshItems={props.refreshItems}
          />
        </ReactModal>
      </div>
    }
    </>
  );
}

export default Current;
