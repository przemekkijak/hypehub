import React, {useEffect, useRef} from 'react'
import '../../styles/photos.css';
import SocketIOFileUpload from 'socketio-file-upload';
import mergeImages from 'merge-images';




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


    function merge() {

        mergeImages([
            {src: `/img/items/but1.jpg`, x:0,y: 0},
            {src: `/img/items/but2.jpg`, x:1000,y:0},
            {src: `/img/items/but3.jpg`,x:0,y:1250},
            {src: `/img/items/but4.jpg`, x:1000,y:1250},
        ], {
            width: 4000,
            height: 5000
        }).then(b64 => {
            document.getElementById('testuje').src = b64;
            });
    }

return (
    <div className="photoContainer">


        <input type="file" id="photoFile"/>
        <div className="photosBox">
            <div className="photo"><img src="" alt="First" id="1"/></div>
            <div className="photo"><img src="" alt="Second" id="2"/></div>
            <div className="photo"><img src="" alt="Third" id="3"/></div>
            <div className="photo"><img src="" alt="Fourth" id="4"/></div>
        </div>
        <div className="photosOptions" id="options">
            <p>Za pomocą poniższych przycisków w łatwy sposób możesz wygenerować gotowe zdjęcie do wystawienia przedmiotu na sprzedaż. Aplikacja automatycznie zlepi wszystkie cztery zdjęcia i skopiuje do Twojego schowka efekt końcowy.
                <br/>Dostępne są dwa warianty, jeden w postaci czystych zdjęć, oraz drugi z dodatkowymi informacjami o Twoim przedmiocie. </p>
            <button onClick={() => merge()}>Zdjęcie z opisem</button>
            <button>Zdjęcie bez opisu</button>
            <img src='/img/items/nophoto.jpg' id='testuje'/>
        </div>
    </div>

)

}

export default Photos;