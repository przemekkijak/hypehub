import React from 'react'

class Sold extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDetails: false,
            currentId: 0
        }
    }


    render() {
        return(
            <div className="soldContainer">
            {this.props.items.map((item) =>
                <div className="item">
                    <div className="itemSlot" key={item.id}>
                      <p>{item.name}</p>
                      <p>{item.size}</p>
                      <p>{item.cond}/10</p>
                      <p>{item.buyPrice}</p>
                      <p id="earnings">{item.sellPrice-item.buyPrice}</p>
                      <button className="noteButton deleteButton" id={item.id} onClick={id => this.props.deleteItem(id)}>x</button>
                    </div>

                </div>
            )
            }

            </div>
        )
    }
}

export default Sold;