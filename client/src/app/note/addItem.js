import React from 'react';


class AddItem extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        let item = {
            name: this.itemName.value,
            price: this.itemPrice.value,
            size: this.itemSize.value,
            cond: this.itemCond.value,
            ownerID: this.props.userID,
        }
        this.props.socket.emit('addItem', item)
        this.props.refreshItems();
        this.formBox.reset();
        this.props.handleModal('add');

    }


    render() {

        return(
        <div className="itemMenuBox">
            <label>Dodaj przedmiot</label>
            <form onSubmit={this.handleSubmit} ref={(el) => this.formBox = el}>

                <p><input placeholder="Nazwa" ref={(el) => this.itemName = el} autoFocus={true} required/></p>
                <p><input placeholder="Rozmiar" ref={(el) => this.itemSize = el} required/></p>
                <p><input placeholder="Cena" ref={(el) => this.itemPrice = el} required/></p>
                <p><input placeholder="Stan" ref={(el) => this.itemCond = el} required/></p>
                <p><button type="submit" className="menuButton" value="Submit">Dodaj</button></p>
            </form>
        </div>
        )
    }
}

export default AddItem;