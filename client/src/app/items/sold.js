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
                            <p>{item.item_name}</p>
                            <p>{item.item_size}</p>
                            <p>{item.item_condition}/10</p>
                            <p>{item.item_buyPrice}</p>
                            <p>{item.item_sellPrice-item.item_buyPrice}</p>
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