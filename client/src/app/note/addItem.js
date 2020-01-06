import React, {useRef} from 'react';


function AddItem(props) {
    const socket = props.socket;
    const formBox = useRef();
    const itemName = useRef();
    const itemSize = useRef();
    const itemPrice = useRef();
    const itemCond = useRef();
    const itemData = [itemName, itemSize, itemPrice, itemCond];


    function handleSubmit(e) {
        e.preventDefault();
        let item = {
            name: itemName.current.value,
            price: itemPrice.current.value,
            size: itemSize.current.value,
            cond: itemCond.current.value,
            ownerID: props.userID,
        }
        var validateData = 0;
        for(var element of itemData) {
            if(/^[a-zA-Z0-9 / ,.-]+$/.test(element.current.value)) {
                validateData++;
                if(validateData === itemData.length) {
                 if(!isNaN(item.price) && !isNaN(item.cond)) {
                    socket.emit('addItem', item)
                    }
                }
            }
        }
        props.refreshItems();
        props.handleModal('add');

    }

        return(
        <div className="itemMenuBox">
            <form onSubmit={handleSubmit} ref={formBox}>
                <div className="itemType">

                <input type="radio"  name="itemTypeRadio" id="shoes"/>
                <label for="shoes">ciuchy</label>

                <input type="radio" name="itemTypeRadio" id="clothes"/>
                <label for="clothes">buty</label>

                <input type="radio" name="itemTypeRadio" id="accessories"/>
                <label for="accessories">akcesoria</label>

                </div>
                <p><input placeholder="Nazwa" ref={itemName} autoFocus={true} required/></p>
                <p><input placeholder="Rozmiar" ref={itemSize} required/></p>
                <p><input placeholder="Cena" ref={itemPrice} required/></p>
                <p><input placeholder="Stan" ref={itemCond} required/></p>
                <p><button type="submit" className="menuButton" value="Submit">Dodaj</button></p>
            </form>
        </div>
        )
    }

export default AddItem;