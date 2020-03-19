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
        axios.post('https://hypehub.pl/unSold', {
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


        </div>
    )


}
export default Info;