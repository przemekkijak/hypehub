import React from 'react';
import axios from 'axios';
import '../../styles/info.css';

function Info(props) {

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