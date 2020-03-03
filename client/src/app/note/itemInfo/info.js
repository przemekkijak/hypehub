import React from 'react';
import axios from 'axios';
import '../../styles/info.css';

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
        axios.post('http://localhost:3000/unSold', {
            id: props.item.id
        })
        .then(res => {
            if(res.status === 200) {
                props.refreshItems();
                props.handleModal();
            }
        })
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
                <button onClick={() => copyDesc()}>Skopiuj opis</button>
            {props.item.sold === 1 && (
                <button onClick={() => unSold() }>Wycofaj ze sprzedanych</button>)}
    </div>

        </div>
    )


}
export default Info;