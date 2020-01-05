import React, {useRef} from 'react';

function SellItem(props) {
    const socket = props.socket;
    const formBox = useRef();
    const itemPrice = useRef();
    const soldFor = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        let item = {
            id: props.id,
            price: itemPrice.current.value,
            soldFor: soldFor.current.value,
        }
        if(!isNaN(item.price))
        {
            socket.emit('sellItem',item);
        }
        props.refreshItems();
        props.handleModal();
    }


        const items = props.items;
        for(let i = 0; i<items.length;i++) {
            if(items[i].id === props.id) {
                var currentItem = items[i].name;
            }
        }
        return(
        <div className="itemMenuBox">
            <form onSubmit={handleSubmit} ref={formBox}>
                <label>Sprzedajesz {currentItem}</label>
                <p><input placeholder="Cena" ref={itemPrice} autoFocus={true} required/></p>
                <p><input placeholder="Kupujacy (opcjonalnie)" ref={soldFor}/></p>
                <p><button type="submit" className="menuButton" value="Submit">Sprzedaj</button></p>

            </form>
        </div>
        )
    }

export default SellItem;