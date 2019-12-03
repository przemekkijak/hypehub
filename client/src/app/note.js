import React from 'react';
import './styles/note.css';
import Current from './note/current'
import Sold from './note/sold'
import Pending from './note/pending'
import NoteMenu from './note/noteMenu'

class Render extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCurrent: true,
            showSold: false,
            showPending: false,
            deleteMode: false,
        };
        this.toggleDelete = this.toggleDelete.bind(this)
    }

    toggleDelete() {
        this.setState({
            deleteMode: !this.state.deleteMode
        });
    }

    deleteItem(id) {

    }

    toggleNote(type) {
        this.setState({
            showCurrent: false,
            showSold: false,
            showPending: false,
        });
        const elements = ["current","sold","pending"];
        elements.forEach(element => {
            document.getElementById(element).style.color = "";
        });
        switch(type) {
            default:
                this.setState({showCurrent: true,})
                break;
            case "current":
                this.setState({showCurrent: true,})
                document.getElementById("current").style.color="white";
                break;
            case "sold":
                this.setState({showSold: true,})
                document.getElementById("sold").style.color="white";
                break;
            case "pending":
                this.setState({showPending: true,})
                document.getElementById("pending").style.color="white";
                break;
        }
    }

    render() {
        return (
            <div className="container">
                 <div className="tableContainer">
                    <div className="noteTableNavi">
                        <button className="naviButton" id="current"onClick={() => this.toggleNote("current")}>Aktualne</button>
                        <button className="naviButton" id="sold" onClick={() => this.toggleNote("sold")}>Sprzedane</button>
                        <button className="naviButton" id="pending" onClick={() => this.toggleNote("pending")}>Zamowione</button>
                    </div>
                    <div className="noteContent">
                        { this.state.showCurrent && (<Current items={this.props.currentItems} deleteMode={this.state.deleteMode}/>)}
                        { this.state.showSold && (<Sold items={this.props.soldItems} deleteMode={this.state.deleteMode}/>)}
                        { this.state.showPending && <Pending/>}
                    </div>
                </div>
                <NoteMenu deleteMode={this.toggleDelete}/>
            </div>
        )
    }
}

export default {
    Render
}