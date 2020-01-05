import React, {useRef} from 'react';


function AddItem(props) {
    const socket = props.socket;
    const formBox = useRef();
    const itemName = useRef();
    const itemSize = useRef();
    const itemPrice = useRef();
    const itemCond = useRef();


    function handleSubmit(e) {
        e.preventDefault();
        let item = {
            name: itemName.current.value,
            price: itemPrice.current.value,
            size: itemSize.current.value,
            cond: itemCond.current.value,
            ownerID: props.userID,
        }
        socket.emit('addItem', item)
        props.refreshItems();
        props.handleModal('add');

    }

        return(
        <div className="itemMenuBox">
            <label>Dodaj przedmiot</label>
            <form onSubmit={handleSubmit} ref={formBox}>

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