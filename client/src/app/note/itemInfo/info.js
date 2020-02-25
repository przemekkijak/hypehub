import React from 'react'
import '../../styles/info.css'
import '../../styles/tools.css';

function Info(props) {

    function copyDesc() {
        let description;
        if(props.item.type === 1) {
            description = `${props.item.name}\n${props.item.cond}/10 \n${props.item.size} (${props.item.length}/${props.item.width})\n${props.item.estimatedPrice}PLN`;
        } else {
            description = `${props.item.name}\n${props.item.cond}/10 \n${props.item.size}\n${props.item.estimatedPrice}PLN`;
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
        props.socket.emit("unSold", props.item);
        props.refreshItems();
        props.handleModal();
    }

    return (
        <div className="infoContainer">
            <p id="itemName"> {props.item.name} </p>
            <div className="itemDetails">
            {/* <span>Kupiono za: {props.item.buyPrice} zł</span>
            <span>Planowana sprzedaż: {props.item.estimatedPrice} zł</span> */}
            <span>Przewidywany zarobek: {props.item.estimatedPrice-props.item.buyPrice} zł</span>
            <span>
                Rozmiar: {props.item.size}
                {props.item.type === 2 && (
                    props.item.shoeInsert > 0 && (
                    (<span>[{props.item.shoeInsert}cm]</span>)
                    ))}
                </span>
            </div>
            <p id="itemFlaws">Wady</p>
            <div className="itemFlaws"></div>

            <div className="itemOptions">
                <p><button className="toolsButton" onClick={() => copyDesc()}>Skopiuj opis</button></p>
            {props.item.sold === 1 && (
                <p><button className="toolsButton"onClick={() => unSold() }>Wycofaj ze sprzedanych</button></p>)}
    </div>

        </div>
    )


}
export default Info;