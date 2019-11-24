import React from 'react';
import './styles/note.css';
import Current from './items/current';
import Sold from './items/sold';
import ToggleBox from './items/ToggleBox';



class Render extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewCurrent: true,
            viewSold: false,
            viewPending: false,
        };
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
                this.setState({
                    viewCurrent: true,
                })
                document.getElementById("current").style.color="white";
                break;
            case "sold":
                this.setState({
                    viewSold: true,
                })
                document.getElementById("sold").style.color="white";
                break;
            case "pending":
                this.setState({
                    viewPending: true,
                })
                document.getElementById("pending").style.color="white";
                break;
        }
    }

    render() {
        return (
            <div class="noteContainer">
                 <div className="tableContainer">
                    <div className="tableNavi">
                        <button className="naviButton" id="current"onClick={() => this.toggleNote("current")}>Aktualne</button>
                        <button className="naviButton" id="sold" onClick={() => this.toggleNote("sold")}>Sprzedane</button>
                        <button className="naviButton" id="pending" onClick={() => this.toggleNote("pending")}>W trakcie</button>
                    </div>
                 { this.state.viewCurrent && (<Current/>)}
                 { this.state.viewSold && (<Sold/>)}
                 { this.state.viewPending && (<p>dopiero sie robia</p>)}
                 </div>
                 <div className="noteMenu">
                    <button className="buttonMenu">Dodaj</button>
                    <button className="buttonMenu">Usun</button>
                    <button className="buttonMenu">Modyfikuj</button>
                 </div>


                 </div>
        )
    }
}

export default {
    Render
}