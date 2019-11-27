import React from 'react';
import './styles/note.css';
import NoteMenu from './noteMenu'
import Current from './note/current'
import Sold from './note/sold'
import Pending from './note/pending'
import Modal from './noteMenu';

class Render extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewCurrent: true,
            viewSold: false,
            viewPending: false,
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
            viewCurrent: false,
            viewSold: false,
            viewPending: false,
        });
        const elements = ["current","sold","pending"];
        elements.forEach(element => {
            document.getElementById(element).style.color = "";
        });
        switch(type) {
            case "current":
                this.setState({viewCurrent: true,})
                document.getElementById("current").style.color="white";
                break;
            case "sold":
                this.setState({viewSold: true,})
                document.getElementById("sold").style.color="white";
                break;
            case "pending":
                this.setState({viewPending: true,})
                document.getElementById("pending").style.color="white";
                break;
        }
    }


    render() {
        return (
            <div class="noteContainer">
                 <div className="tableContainer">
                    <div className="noteTableNavi">
                        <button className="naviButton" id="current"onClick={() => this.toggleNote("current")}>Aktualne</button>
                        <button className="naviButton" id="sold" onClick={() => this.toggleNote("sold")}>Sprzedane</button>
                        <button className="naviButton" id="pending" onClick={() => this.toggleNote("pending")}>W trakcie</button>
                    </div>
                 {this.state.viewCurrent && (<Current items={this.state.currentItems}/>)}
                 { this.state.viewSold && (<Sold items={this.state.soldItems}/>)}
                 { this.state.viewPending && <Pending/>}
                 </div>
                {/* MUSZE SIE TU POBAWIĆ Z MODALEM */}
                 </div>
        )
    }
}

export default {
    Render
}