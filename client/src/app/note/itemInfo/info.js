import React from 'react'
import '../../styles/info.css'

function Info(props) {

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

        </div>
    )


}
export default Info;