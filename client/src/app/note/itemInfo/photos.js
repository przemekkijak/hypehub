import React, {useEffect} from 'react'
import '../../styles/photos.css';

function Photos(props) {

    useEffect(() => {
        for(let i = 1; i<=4; i++ ) {
            document.getElementById(i).setAttribute("src", `/img/items/${props.item.id}/${i}.jpg`)
        }

    });
return (
    <div className="photoContainer">

        <div className="header">
            <p>Zdjecia od {props.item.name} ID: {props.item.id}</p>
        </div>

        <div className="photosBox">
            <div className="photo"><img src="" alt="First" id="1"/></div>
            <div className="photo"><img src="" alt="Second" id="2"/></div>
            <div className="photo"><img src="" alt="Third" id="3"/></div>
            <div className="photo"><img src="" alt="Fourth" id="4"/></div>
        </div>
    </div>

)

}

export default Photos;