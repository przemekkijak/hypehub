import React from 'react'
import '../../styles/tools.css';

function Tools(props) {
    const item = props.item;
    const socket = props.socket;

function copyDesc() {
    let description;
    if(item.type === 1) {
        description = `${item.name}\n${item.cond}/10 \n${item.size} (${item.length}/${item.width})\n${item.estimatedPrice}PLN`;
    } else {
        description = `${item.name}\n${item.cond}/10 \n${item.size}\n${item.estimatedPrice}PLN`;
    }
    const area = document.createElement('textarea');
    area.value = description;
    area.setAttribute('readonly','');
    area.style.position = 'absolute';
    area.style.left = '-999999px';
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    document.body.removeChild(area);
}
function unSold() {
    socket.emit("unSold", item);
    props.refreshItems();
    props.handleModal();
}

return(

    <div className="itemOptions">
        <p><button className="toolsButton" onClick={() => copyDesc()}>Skopiuj opis</button></p>
        <p><button className="toolsButton">Zdjecie z opisem</button></p>
        <p><button className="toolsButton">Zdjecie bez opisu</button></p>
        {item.sold === 1 && (
        <p><button className="toolsButton"onClick={() => unSold() }>Wycofaj ze sprzedanych</button></p>)}
    </div>
)
}

export default Tools;