import React, {useState} from 'react';
import AddShoes from './addItem/shoes'
import AddClothes from './addItem/clothes'
import AddAccessories from './addItem/accessories'


function AddItem(props) {
    const [itemType, setType] = useState(1);


    function itemForm(itemType) {
        switch(itemType) {
            case 1:
                return(<AddClothes userID={props.userID} itemType={itemType} socket={props.socket} refreshItems={() => props.refreshItems} handleModal={() => props.handleModal('add')}/>)
            case 2:
                return(<AddShoes userID={props.userID} itemType={itemType} socket={props.socket} refreshItems={() => props.refreshItems} handleModal={() => props.handleModal('add')}/>)
            case 3:
                return(<AddAccessories userID={props.userID} itemType={itemType} socket={props.socket} refreshItems={() => props.refreshItems} handleModal={() => props.handleModal('add')}/>)
            default:
                return(<AddClothes userID={props.userID} itemType={itemType} socket={props.socket} refreshItems={() => props.refreshItems} handleModal={() => props.handleModal('add')}/>)
        }
    }

        return(
        <div className="addItemContainer">
                <div className="itemType">

                <input type="radio"  name="itemTypeRadio" id="clothes" value="clothes" onChange={() => setType(1)} defaultChecked/>
                <label htmlFor="clothes"><img src="https://hypehub.s3.eu-central-1.amazonaws.com/img/shirt.png" alt="Item clothes" className="itemIcon" id="clothesIcon"/></label>

                <input type="radio" name="itemTypeRadio" id="shoes" value="shoes" onChange={() => setType(2)}/>
                <label htmlFor="shoes"><img src="https://hypehub.s3.eu-central-1.amazonaws.com/img/shoe.png" alt="Item shoes" className="itemIcon" id="shoeIcon"/></label>

                <input type="radio" name="itemTypeRadio" id="accessories" value="3" onChange={() => setType(3)}/>
                <label htmlFor="accessories"><img src="https://hypehub.s3.eu-central-1.amazonaws.com/img/accessories.png" alt="Item Accessories" className="itemIcon" id="hatIcon"/></label>
                </div>

                {itemForm(itemType)}
        </div>
        )
    }

export default AddItem;