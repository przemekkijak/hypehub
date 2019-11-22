import React from 'react';


class Sold extends React.Component {
    constructor(props) {
        super(props);
        this.state = {soldItems: [],
        showForm: false};
    }

    componentDidMount() {
        fetch('http://localhost:3000/getSoldItems')
        .then(response => response.json())
        .then(soldItems => (this.setState({soldItems})))
    }

    _showForm = (bool) => {
        this.setState({
            showForm: bool
        });
    }

    generateItems() {
        return(

             this.state.soldItems.map((item) =>
                   <div className="itemSlot">
                    <p>{item.item_name}</p>
                    <p>{item.item_buyPrice}</p>
                    <p>{item.item_sellPrice-item.item_buyPrice}</p>
                    <p>{item.item_size}</p>
                    <p>{item.item_condition}/10</p>
             </div> ))
    }

    render() {
        return (
            <div className="container">
                 <div className="itemsInfo">
                        <span>Nazwa</span>
                        <span>Cena</span>
                        <span>Zarobek</span>
                        <span>Rozmiar</span>
                        <span>Stan</span>
                </div>
                {this.state.showForm && this.generateItems()}
                <button onClick={this._showForm.bind(null,true)}>test</button>
                <button onClick={this._showForm.bind(null,false)}>wylacz</button>
            </div>

        )
    }
}


export default (
    Sold
)