import React, {useEffect} from 'react'
import '../../styles/photos.css';
import SocketIOFileUpload from 'socketio-file-upload'

function Photos(props) {
    const uploader = new SocketIOFileUpload(props.socket);


    useEffect(() => {
        for(let i = 1; i<=4; i++ ) {
                props.socket.emit('checkPhoto', props.item.id, i, found => {
                    if(found) {
                        document.getElementById(i).setAttribute("src", `/img/items/${props.item.id}_${i}.jpg`)
                    } else {
                        document.getElementById(i).setAttribute("src", `/img/items/nophoto.jpg`);
                        document.getElementById(i).onclick = () => {
                            document.getElementById('photoFile').click();
                        }
                    }
                });
        }
    }, [props.item.id]);

    function upload() {
        var file = document.getElementById('photoFile').files;
        console.log(file);
        props.socket.emit('uploadPhoto', props.item.id);


    }
return (
    <div className="photoContainer">

        <div className="header">
            <p>Zdjecia od {props.item.name} ID: {props.item.id}</p>
            <form>
            <input type="file" id="photoFile" onChange={() => upload()}/>
            </form>
            {/* <button id="uploadPhoto" onClick={() => upload()}>Upload</button> */}
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