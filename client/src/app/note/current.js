import React from 'react';


class Current extends React.Component{

    deleteItem(itemID) {
        fetch('http://localhost:3000/deleteItem', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                item: itemID
            }),
        });
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
                        <button className="noteButton">$</button>
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