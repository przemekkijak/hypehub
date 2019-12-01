import React from 'react';


class Current extends React.Component{
    constructor(props) {
        super(props);

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
                        <button className="sellButton">$</button>
                    </div>
                )}
            </div>
        )
    }
}

export default Current;