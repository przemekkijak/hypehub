import React, {Component} from 'react';
import './styles/note.css';
import Current from './items/current';
import Sold from './items/sold';
import ToggleBox from './items/ToggleBox';



class Render extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewCurrent: false,
            viewSold: false,
            viewPending: false,
        };
    }

    toggleNote(type) {
        const {opened} = this.state;
        this.setState({
            opened: !opened,
        });
    }

    render() {
        return (
            <div class="noteContainer">
                 <div className="tableContainer">
                    <div className="tableNavi">
                        <button className="naviButton" name="current" onClick={() => this.toggleNote("current")}>Aktualne</button>
                        <button className="naviButton" name="sold" onClick={() => this.toggleNote()}>Sprzedane</button>
                        <button className="naviButton" name="pending" onClick={() => this.toggleNote()}>W trakcie</button>
                    </div>
                 { this.state.opened && (
                    <Current/>
                 )}
                 { this.state.viewSold && (
                    <Sold/>
                 )}
                 { this.state.viewPending && (
                        <p>dopiero sie robia</p>
                     )}
                 </div>
                 </div>

        )
    }
}

export default {
    Render,

}