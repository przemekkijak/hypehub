import React from 'react'

function Sold(props) {

    function convertCondition(cond) {
        if(cond === 10) {
            return 'DS';
        } else {
            return cond+'/10';
        }

    }

        return(
            <div className="soldContainer">
            {props.items.map((item) =>
                <div className="item" key={item.id}>
                    <div className="itemSlot">
                      <p onClick={() => props.itemInfo(item.id)}>{item.name}</p>
                      <p>{item.size}</p>
                      <p>{convertCondition(item.cond)}</p>
                      <p>{item.buyPrice} zł</p>
                      <p id="earnings">{item.sellPrice-item.buyPrice} zł</p>
                      <p><button className="noteButton sellButton" onClick={() => props.itemInfo(item.id)}>i</button></p>
                      <p><button className="noteButton deleteButton" id={item.id} onClick={id => props.deleteItem(id)}>x</button></p>
                    </div>

                </div>
            )}
            </div>
        )
    }

export default Sold;