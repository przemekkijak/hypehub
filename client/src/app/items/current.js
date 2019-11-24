import React from 'react';


class Current extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentItems: []};
    }

    componentDidMount() {
        fetch('http://localhost:3000/getCurrentItems')
        .then(response => response.json())
        .then(currentItems => (this.setState({currentItems})))
    }


    render() {
        return (
            <div className="container">
                  <div className="itemsInfo">
                        <span>Nazwa</span>
                        <span>Rozmiar</span>
                        <span>Stan</span>
                        <span>Cena kupna</span>
                        <span>Sprzedaj</span>
                    </div>
           {
                this.state.currentItems.map((item) =>
                   <div className="itemSlot">
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


export default (
    Current
);