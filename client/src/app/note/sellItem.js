import React from 'react';
import socketIOClient from 'socket.io-client'


class SellItem extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        let item = {
            name: this.itemName.value,
            price: this.itemPrice.value,
            size: this.itemSize.value,
            cond: this.itemCond.value,
        }
        const socket = socketIOClient('http://localhost:4001');
        socket.emit('addItem', item)
        this.props.refreshItems();
        this.formBox.reset();
        this.props.handleModal('add');

    }
    render() {
        return(
        <div className="itemMenuBox">
            <form onSubmit={this.handleSubmit} ref={(el) => this.formBox = el}>
                <p><input placeholder="Nazwa" ref={(el) => this.itemName = el} required/></p>
                <p><input placeholder="Rozmiar" ref={(el) => this.itemSize = el} required/></p>
                <p><input placeholder="Cena" ref={(el) => this.itemPrice = el} required/></p>
                <p><input placeholder="Stan" ref={(el) => this.itemCond = el} required/></p>
                <p><button type="submit" className="menuButton" value="Submit">Dodaj</button></p>
            </form>
        </div>
        )
    }
}

export default SellItem;