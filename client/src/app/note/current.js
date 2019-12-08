import React from 'react';
import Axios from 'axios';
import $ from 'jquery';



class Current extends React.Component{

    deleteItem(id) {
        Axios.post('http://localhost:3000/deleteItem',{
            item: id
        })
    }

    sellItem(id) {
        const itemPrice = prompt("Za ile sprzedales item?");
        Axios.post('http://localhost:3000/sellItem', {
            item: id,
            price: itemPrice,
        })

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
                        <p id="itemName">{item.name}</p>
                        <p>{item.size}</p>
                        <p>{item.cond}/10</p>
                        <p>{item.buyPrice}</p>
                        <button className="noteButton"
                        onClick={() => this.sellItem(item.id)}>$</button>
                        <button className="noteButton deleteButton" onClick={() => this.deleteItem(item.id)}>x</button>
                    </div>
                )}
            </div>
        )
    }
}

export default Current;