import React from 'react';


class AddItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        var data = {
            name: this.refs.itemName,
            size: this.refs.itemSize,
            price: this.refs.itemBuyPrice,
            cond: this.refs.itemCond,
        }
        console.log(data)
        fetch('http://localhost:3000/addItem', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(data)
        }).then(function(response) {
            if(response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            console.log(data)
            if(data == "success"){
                this.setState({msg: "Item dodany!"});
            }
        }).catch(function(err) {
            console.log(err)
        });
    }


    render() {

        return(
            <div className="itemMenuBox">
            <form>
                <p><input name="itemName" placeholder="Nazwa" refs="itemName"/></p>
                <p><input name="itemSize" placeholder="Rozmiar" refs="itemSize"/></p>
                <p><input name="itemPrice" placeholder="Cena" refs="itemBuyPrice"/></p>
                <p><input name="itemCond" placeholder="Stan" refs="itemCond"/></p>
                <p><input type="submit" className="menuButton" value="Dodaj"/> </p>
            </form>
        </div>
        )
    }
}

export default AddItem;