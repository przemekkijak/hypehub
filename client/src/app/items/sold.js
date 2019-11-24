import React from 'react';


class Sold extends React.Component {
    constructor(props) {
        super(props);
        this.state = {soldItems: [],
        showForm: true};
    }

    componentDidMount() {
        fetch('http://localhost:3000/getSoldItems')
        .then(response => response.json())
        .then(soldItems => (this.setState({soldItems})))
    }

    render() {
        return (
            <div className="container">
                 <div className="itemsInfo">
                        <span>Nazwa</span>
                        <span>Rozmiar</span>
                        <span>Stan</span>
                        <span>Cena kupna</span>
                        <span>Zarobek</span>
                </div>
                {
                    this.state.soldItems.map((item) =>
                        <div className="itemSlot">
                            <p>{item.name}</p>
                            <p>{item.size}</p>
                            <p>{item.cond}/10</p>
                            <p>{item.buyPrice}</p>
                            <p>{item.sellPrice-item.buyPrice}</p>
                          </div>
                          )
                }
            </div>

        )
    }
}


export default (
    Sold
)