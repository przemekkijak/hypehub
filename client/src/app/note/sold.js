import React from 'react'
import Axios from 'axios'

class Sold extends React.Component {


    deleteItem(id) {
        Axios.post('http://localhost:3000/deleteItem',{
            item: id
        })
    }

    render() {
        return(
            <div className="soldContainer">
                 <div className="itemsInfo">
                        <span>Nazwa</span>
                        <span>Rozmiar</span>
                        <span>Stan</span>
                        <span>Cena kupna</span>
                        <span>Zarobek</span>
                </div>
            {this.props.items.map((item) =>
                    <div className="itemSlot" key={item.id}>
                      <p>{item.name}</p>
                      <p>{item.size}</p>
                      <p>{item.cond}/10</p>
                      <p>{item.buyPrice}</p>
                      <p id="earnings">{item.sellPrice-item.buyPrice}</p>
                      <button className="noteButton deleteButton" onClick={() => this.deleteItem(item.id)}>x</button>
                    </div>
            )

            }

            </div>
        )
    }
}

export default Sold;