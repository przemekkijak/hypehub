import React from 'react';
import './styles/note.css';

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
    // fetching data
    componentDidMount() {

        // Get Current Items
        fetch('http://localhost:3000/getCurrentItems')
        .then(response => response.json())
        .then(currentItems => this.setState({currentItems}))

        // Get sold Items
        fetch('http://localhost:3000/getSoldItems')
        .then(response => response.json())
        .then(soldItems => this.setState({soldItems}))
    }
    // Switching between tabs
    toggleNote(type) {
        const {viewCurrent,viewSold,viewPending} = this.state;
        this.setState({
            viewCurrent: false,
            viewSold: false,
            viewPending: false,
        });
        // Reset color, to set one active tab
        const elements = ["current","sold","pending"];
        elements.forEach(element => {
            document.getElementById(element).style.color = "";
        });


        // Showing tab and setting color to see which one is active
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


    currentItems() {
        return (
            <div className="container">
            <div className="itemsInfo">
                  <span>Nazwa</span>
                  <span>Rozmiar</span>
                  <span>Stan</span>
                  <span>Cena kupna</span>
                  <span>Sprzedaj</span>
              </div>
     {
          this.state.currentItems.map((item) =>
             <div className="itemSlot">
              <p>{item.name}</p>
              <p>{item.size}</p>
              <p>{item.cond}/10</p>
              <p>{item.buyPrice}</p>
              <button className="sellButton">$</button>

           </div>
              )}
      </div>
        )
    }
    soldItems() {
        return (
            <div className="container">
                 <div className="itemsInfo">
                        <span>Nazwa</span>
                        <span>Rozmiar</span>
                        <span>Stan</span>
                        <span>Cena kupna</span>
                        <span>Zarobek</span>
                </div>
                {
                    this.state.soldItems.map((item) =>
                        <div className="itemSlot">
                            <p>{item.name}</p>
                            <p>{item.size}</p>
                            <p>{item.cond}/10</p>
                            <p>{item.buyPrice}</p>
                            <p>{item.sellPrice-item.buyPrice}</p>
                          </div>
                          )
                }
            </div>

        )
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
                 { this.state.viewCurrent && (this.currentItems())}
                 { this.state.viewSold && (this.soldItems())}
                 { this.state.viewPending && (this.pendingItems)}
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