import React, {useEffect, useState, useRef} from 'react'
import '../../styles/photos.css';
import SocketIOFileUpload from 'socketio-file-upload'

function Photos(props) {
    const uploader = new SocketIOFileUpload(props.socket);
    const [reload,setReload] = useState(false);
    const order = useRef(1);


    useEffect(() => {
        uploader.listenOnSubmit(document.getElementById('uploadPhoto'), document.getElementById('photoFile'));
        for(let i = 1; i<=4; i++ ) {
                props.socket.emit('checkPhoto', props.item.id, i, found => {
                    if(found) {
                        document.getElementById(i).setAttribute("src", `/img/items/${props.item.id}_${i}.jpg`)
                    } else {
                        document.getElementById(i).setAttribute("src", `/img/items/nophoto.jpg`);
                        document.getElementById(i).onclick = () => {
                            order.current = i;
                            document.getElementById('photoFile').click();
                        }
                    }
                });
        }
    },[reload]);




function uploadPhoto() {
    console.log(order.current);
    const fileInput = document.getElementById('photoFile');
        if(fileInput.files.length > 0) {
            props.socket.emit('uploadPhoto', props.item.id, order.current);
            props.socket.on('photoComplete', () => {
                uploader.destroy();
                setReload(!reload);
            })
    }
}
return (
    <div className="photoContainer">

        <div className="header">
            <p>Zdjecia od {props.item.name} ID: {props.item.id}</p>
            <form>
            <input type="file" id="photoFile"/>
            </form>
            <button id="uploadPhoto" onClick={() => uploadPhoto()}>Upload</button>
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