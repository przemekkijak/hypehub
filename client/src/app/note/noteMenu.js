import React from 'react'


class NoteMenu extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showAdd: false,
            showDelete: false,
            showModify: false,
        }
    }

    toggleOption(option) {
        const {showAdd, showDelete,showModify} = this.state;
        this.setState({
            showAdd: false,
            showDelete: false,
            showModify: false,
        });

        switch(option) {
            case "add":
                this.setState({showAdd: !showAdd})
                break;
            case "delete":
                this.setState({showDelete: !showDelete})
                break;
            case "modify":
                this.setState({showModify: !showModify})
                break;
        }
    }

    addItem() {
        return(
            <div className="itemMenuBox">
                    <p><input name="itemName" placeholder="Nazwa"/></p>
                    <p><input name="itemSize" placeholder="Rozmiar"/></p>
                    <p><input name="itemPrice" placeholder="Cena"/></p>
                    <p><input name="itemCond" placeholder="Stan"/></p>
            </div>
        )
    }

    render() {

        return(
            <div className="container">
                <div className="noteMenu">
                    <button className="noteMenuButton" onClick={() => this.toggleOption("add")}>Dodaj</button>
                    <button className="noteMenuButton" onClick={() => this.toggleOption("delete")}>Usun</button>
                    <button className="noteMenuButton" onClick={() => this.toggleOption("modify")}>Modyfikuj</button>
                </div>
                {this.state.showAdd && (this.addItem())}
            </div>

        )
    }
}

export default NoteMenu;