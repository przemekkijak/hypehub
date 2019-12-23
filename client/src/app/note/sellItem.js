import React from 'react';

class SellItem extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        let item = {
            id: this.props.id,
            price: this.itemPrice.value,
            soldFor: this.soldFor.value
        }
        this.props.socket.emit('sellItem',item)
        this.props.refreshItems();
        this.formBox.reset();
        this.props.handleModal();

    }

    render() {
        const items = this.props.items;
        for(let i = 0; i<items.length;i++) {
            if(items[i].id === this.props.id) {
                var currentItem = items[i].name;
            }
        }
        return(
        <div className="itemMenuBox">
            <form onSubmit={this.handleSubmit} ref={(el) => this.formBox = el}>
                <label>Sprzedajesz {currentItem}</label>
                <p><input placeholder="Cena" ref={(el) => this.itemPrice = el} autoFocus={true} required/></p>
                <p><input placeholder="Kupujacy (opcjonalnie)" ref={(el) => this.soldFor = el}/></p>
                <p><button type="submit" className="menuButton" value="Submit">Sprzedaj</button></p>

            </form>
        </div>
        )
    }
}

export default SellItem;