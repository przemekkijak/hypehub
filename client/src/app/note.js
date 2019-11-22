import React, {Component} from 'react';
import './styles/note.css';


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
                        <span className="tableNaviElement isActive" name="current">Aktualne</span>
                        <span className="tableNaviElement" name="sold">Sprzedane</span>
                        <span className="tableNaviElement" name="pending">Zamowione</span>
                    </div>
                    <div className="itemsInfo">
                        <span>Nazwa</span>
                        <span>Cena</span>
                        <span>Rozmiar</span>
                        <span>Stan</span>
                    </div>
                    <div className="noteContent">
                        {
                            this.state.current.map((item) =>
                                <span>{item.item_name}</span>
                            )
                        }
                    </div>

                 </div>
                 </div>

        )
    }
}

export default {
    Render,

}