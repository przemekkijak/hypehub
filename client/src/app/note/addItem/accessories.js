import React, {useRef} from 'react'



function AddAccessories(props) {
    const formBox = useRef();
    const itemName = useRef();
    const itemPrice = useRef();
    const itemCond = useRef();
    const itemData = [itemName, itemPrice, itemCond];

    function handleSubmit(e) {
        e.preventDefault();
        let item = {
            name: itemName.current.value,
            price: itemPrice.current.value,
            cond: itemCond.current.value,
            type: props.itemType,
            ownerID: props.userID,
        }
        var validateData = 0;
        for(var element of itemData) {
            if(/^[a-zA-Z0-9 / ,.-]+$/.test(element.current.value)) {
                validateData++;
                if(validateData === itemData.length) {
                 if(!isNaN(item.price) && !isNaN(item.cond)) {
                    // socket.emit('addItem', item)
                    console.log(item.type);
                    }
                }
            }
        }
        props.refreshItems();
        props.handleModal('add');
    }

    return(
        <>
            <form ref={formBox} onSubmit={handleSubmit} className="addItemForm">
                <p><input placeholder="Nazwa" ref={itemName} autoFocus={true} required/></p>
                <p><input placeholder="Cena" ref={itemPrice} required/></p>
                <p><input placeholder="Stan" ref={itemCond} required/></p>
                <p><button type="submit" className="menuButton" value="Submit">Dodaj</button></p>
            </form>
        </>
    )
}

export default AddAccessories;