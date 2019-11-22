import React, {Component} from 'react';
import './styles/note.css';
import Current from './items/current';
import Sold from './items/sold';


class Render extends Component {
    constructor(props) {
        super(props);
        this.state = {current: [],
                    sold: []};

        }
        componentDidMount() {
      fetch('http://localhost:3000/getCurrentItems')
      .then(response => response.json())
      .then(current => (this.setState({current})))

      fetch('http://localhost:3000/getSoldItems')
      .then(response => response.json())
      .then(sold => (this.setState({sold})))
      }

    render() {
        return (
            <div class="noteContainer">
                 <div className="tableContainer">
                    <div className="tableNavi">
                        <span className="tableNaviElement" name="current">Aktualne</span>
                        <span className="tableNaviElement" name="sold">Sprzedane</span>
                        <span className="tableNaviElement" name="pending">Zamowione</span>
                    </div>
                    <div className="noteContent">
                        {/* <Current/> */}
                        <Sold/>
                    </div>

                 </div>
                 </div>

        )
    }
}

export default {
    Render,

}