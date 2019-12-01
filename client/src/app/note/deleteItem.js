import React from 'react'

class DeleteItem extends React.Component{

    render() {
        return(
            <div className="itemMenuBox" id="deleteBox">
            <form onSubmit={this.handleSubmit}>
                <p><input placeholder="delete" ref={this.itemName} required/></p>
                <p><input placeholder="delete" ref={this.itemSize} required/></p>
                <p><input placeholder="delete" ref={this.itemPrice} required/></p>
                <p><input placeholder="delete" ref={this.itemCond} required/></p>
                <p><button type="submit" className="menuButton" value="Submit">Dodaj</button></p>
            </form>
        </div>
        )
    }

}

export default DeleteItem;