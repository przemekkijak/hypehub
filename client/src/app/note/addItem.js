import React, { useState} from "react";
import AddShoes from "./addItem/shoes";
import AddClothes from "./addItem/clothes";
import AddAccessories from "./addItem/accessories";
import "../styles/css/addItem.css";
import store from "../redux/store/index";

function AddItem(props) {
  const [itemType, setType] = useState(1);

  function itemForm(itemType) {
    switch (itemType) {
      case 1:
        return (
          <AddClothes
            userID={store.getState().user.uid}
            itemType={itemType}
            refreshItems={props.refreshItems}
            handleModal={() => props.handleModal()}
          />
        );
      case 2:
        return (
          <AddShoes
          userID={store.getState().user.uid}
            itemType={itemType}
            refreshItems={props.refreshItems}
            handleModal={() => props.handleModal()}
          />
        );
      case 3:
        return (
          <AddAccessories
          userID={store.getState().user.uid}
            itemType={itemType}
            refreshItems={props.refreshItems}
            handleModal={() => props.handleModal()}
          />
        );
      default:
        return (
          <AddClothes
            userID={props.userID}
            itemType={itemType}
            refreshItems={props.refreshItems}
            handleModal={() => props.handleModal()}
          />
        );
    }
  }

  return (
    <div className="addItemContainer" id="addItem">
      <div className="itemType">
        <input
          type="radio"
          name="itemTypeRadio"
          id="clothes"
          value="clothes"
          className="addRadio"
          onChange={() => setType(1)}
          defaultChecked
        />
        <label htmlFor="clothes">
          <img
            src="../img/additem/shirt.png"
            alt="Item clothes"
            className="itemIcon"
            id="clothesIcon"
          />
        </label>

        <input
          type="radio"
          name="itemTypeRadio"
          id="shoes"
          value="shoes"
          className="addRadio"
          onChange={() => setType(2)}
        />
        <label htmlFor="shoes">
          <img
            src="../img/additem/shoe.png"
            alt="Item shoes"
            className="itemIcon"
            id="shoeIcon"
          />
        </label>

        <input
          type="radio"
          name="itemTypeRadio"
          id="accessories"
          value="3"
          className="addRadio"
          onChange={() => setType(3)}
        />
        <label htmlFor="accessories">
          <img
            src="../img/additem/accessories.png"
            alt="Item Accessories"
            className="itemIcon"
            id="hatIcon"
          />
        </label>
      </div>
      {itemForm(itemType)}
    </div>
  );
}

export default AddItem;
