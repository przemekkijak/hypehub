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

                    </div>
           {
                this.state.currentItems.map((item) =>
                   <div className="itemSlot">
                    <p>{item.item_name}</p>
                    <p>{item.item_size}</p>
                    <p>{item.item_condition}/10</p>
                    <p>{item.item_buyPrice}</p>

                 </div>
                    )}
            </div>

        )
    }
}


export default (
    Current
);