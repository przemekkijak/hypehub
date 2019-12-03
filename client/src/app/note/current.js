import React from 'react';
import Axios from 'axios';


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
                        <p>{item.name}</p>
                        <p>{item.size}</p>
                        <p>{item.cond}/10</p>
                        <p>{item.buyPrice}</p>
                        <button className="noteButton"
                        onClick={() => this.sellItem(item.id)}>$</button>
                        {this.props.deleteMode && (
                            <button className="noteButton" id="deleteButton" onClick={() => this.deleteItem(item.id)}>Usun</button>
                        )}
                    </div>
                )}
            </div>
        )
    }
}

export default Current;