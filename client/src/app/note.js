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
            currentItems: [],
            soldItems: [],
            pendingItems: [],

        };
    }
    componentDidMount() {
        fetch('http://localhost:3000/getCurrentItems')
        .then(response => response.json())
        .then(currentItems => this.setState({currentItems}))

        fetch('http://localhost:3000/getSoldItems')
        .then(response => response.json())
        .then(soldItems => this.setState({soldItems}))
    }

    toggleNote(type) {
        const {viewCurrent,viewSold,viewPending} = this.state;
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
                        <button className="naviButton" id="pending" onClick={() => this.toggleNote("pending")}>W trakcie</button>
                    </div>
                    <div className="noteContent">
                        { this.state.showCurrent && (<Current items={this.state.currentItems}/>)}
                        { this.state.showSold && (<Sold items={this.state.soldItems}/>)}
                        { this.state.showPending && <Pending/>}
                    </div>
                </div>
                <NoteMenu/>
            </div>
        )
    }
}

export default {
    Render
}