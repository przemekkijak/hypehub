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
                <p>test</p>
            </form>
        </div>
        )
    }
}

export default SellItem;