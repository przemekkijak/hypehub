import React from 'react';


class AddItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.itemName = React.createRef();
        this.itemPrice = React.createRef();
        this.itemSize = React.createRef();
        this.itemCond = React.createRef();

    }

    handleSubmit(e) {
        e.preventDefault();
        fetch('http://localhost:3000/addItem', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                    name: this.itemName.current.value,
                    price: this.itemPrice.current.value,
                    size: this.itemSize.current.value,
                    cond: this.itemCond.current.value,
            }),
        });
    }


    render() {

        return(
        <div className="itemMenuBox" id="addBox">
            <form onSubmit={this.handleSubmit}>
                <p><input placeholder="Nazwa" ref={this.itemName} required/></p>
                <p><input placeholder="Rozmiar" ref={this.itemSize} required/></p>
                <p><input placeholder="Cena" ref={this.itemPrice} required/></p>
                <p><input placeholder="Stan" ref={this.itemCond} required/></p>
                <p><button type="submit" className="menuButton" value="Submit">Dodaj</button></p>
            </form>
        </div>
        )
    }
}

export default AddItem;