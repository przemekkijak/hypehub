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
            {props.items.map((item, index) =>
                    <div className="itemSlot" id="soldColumns" key={index}>
                      <p onClick={() => props.itemInfo(item.id)}>{item.name}</p>
                      <p onClick={() => props.itemInfo(item.id)}>{item.size}</p>
                      <p onClick={() => props.itemInfo(item.id)}>{convertCondition(item.cond)}</p>
                      <p onClick={() => props.itemInfo(item.id)}>{item.buyPrice} zł</p>
                      <p id="earnings" onClick={() => props.itemInfo(item.id)}>{item.sellPrice-item.buyPrice} zł</p>
                      {/* <p><button className="noteButton sellButton" onClick={() => props.itemInfo(item.id)}>i</button></p> */}
                      <p><button className="noteButton deleteButton" id={item.id} onClick={id => props.deleteItem(id)}>x</button></p>
                    </div>
            )}
            </div>
        )
    }

export default Sold;