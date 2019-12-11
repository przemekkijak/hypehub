import React from 'react';
import socketIOClient from 'socket.io-client'

class Current extends React.Component{

    sellItem = (id) => {
        const itemPrice = prompt("Za ile sprzedales item?");
        const socket = socketIOClient('http://localhost:4001')
        let item = {
            id: id,
            price: itemPrice,
        }
        socket.emit('sellItem', item)
        this.props.refreshItems();

    }

    render() {
        return(
            <div className="currentContainer">
                <div className="itemsInfo">
                        <span>Nazwa</span>
                        <span>Rozmiar</span>
                        <span>Stan</span>
                        <span>Cena kupna</span>
                        <span>Sprzedaj</span>
                </div>
                {this.props.items.map((item) =>
                    <div className="itemSlot" key={item.id}>
                        <p>{item.name}</p>
                        <p>{item.size}</p>
                        <p>{item.cond}/10</p>
                        <p>{item.buyPrice}</p>
                        <p><button className="noteButton"
                        onClick={() => this.sellItem(item.id)}>$</button></p>
                        <p><button className="noteButton deleteButton" id={item.id} onClick={id => this.props.deleteItem(id)}>x</button></p>
                    </div>
                )}
            </div>
        )
    }
}

export default Current;