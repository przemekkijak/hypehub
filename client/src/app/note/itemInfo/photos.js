import React, {useEffect, useState, useRef} from 'react'
import '../../styles/photos.css';
import SocketIOFileUpload from 'socketio-file-upload';



function Photos(props) {
    const order = useRef(1);
    var uploader = new SocketIOFileUpload(props.socket);

uploader.addEventListener('start', (event) => {
    event.file.meta.id = props.item.id;
    event.file.meta.order = order.current;
});

    useEffect(() => {
        uploader.listenOnInput(document.getElementById('photoFile'));
        refreshPhotos();
    });

    function refreshPhotos() {
        for(let i = 1; i<=4; i++ ) {
            let photo = document.getElementById(i);
            props.socket.emit('checkPhoto', props.item.id, i, foundFile => {
                if(foundFile) {
                    photo.setAttribute('src', `/img/items/${props.item.id}_${i}.jpg`);
                } else {
                    photo.setAttribute('src', '/img/items/nophoto.jpg');
                    photo.onclick = () => {
                        document.getElementById('photoFile').click();
                        order.current = i;
                    }
                }
             })
        }
    }

    props.socket.on('uploadSuccess', () => {
        refreshPhotos();
    });


return (
    <div className="photoContainer">

        <div className="header">
            <form>
            <input type="file" id="photoFile"/>
            </form>
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