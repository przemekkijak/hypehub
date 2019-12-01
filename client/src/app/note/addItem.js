import React from 'react';

const data = {username: "test"};

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
        <div className="itemMenuBox">
            <form onSubmit={this.handleSubmit}>
                <p><input name="[item]name" placeholder="Nazwa" ref={this.itemName}/></p>
                <p><input name="[item]size" placeholder="Rozmiar" ref={this.itemSize}/></p>
                <p><input name="[item]price" placeholder="Cena" ref={this.itemPrice}/></p>
                <p><input name="[item]cond" placeholder="Stan" ref={this.itemCond}/></p>
                <p><button type="submit" className="menuButton" value="Submit">Dodaj</button></p>
            </form>
        </div>
        )
    }
}

export default AddItem;