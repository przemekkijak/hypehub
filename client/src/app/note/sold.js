import React from 'react'

class Sold extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDetails: false,
            currentId: 0
        }
    }

    convertCondition = (cond) => {
        if(cond === 10) {
            return 'DS';
        } else {
            return cond+'/10';
        }

    }

    render() {
        return(
            <div className="soldContainer">
            {this.props.items.map((item) =>
                <div className="item" key={item.id}>
                    <div className="itemSlot">
                      <p onClick={() => this.props.itemInfo(item.id)}>{item.name}</p>
                      <p>{item.size}</p>
                      <p>{this.convertCondition(item.cond)}</p>
                      <p>{item.buyPrice}</p>
                      <p id="earnings">{item.sellPrice-item.buyPrice}</p>
                      <button className="noteButton deleteButton" id={item.id} onClick={id => this.props.deleteItem(id)}>x</button>
                      <p><button className="noteButton" onClick={() => this.props.itemInfo(item.id)}>i</button></p>
                    </div>

                </div>
            )
            }

            </div>
        )
    }
}

export default Sold;