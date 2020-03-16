import React from 'react'
import '../../styles/photos.css';




function Photos(props) {


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
            <button >Zdjęcie z opisem</button>
            <button>Zdjęcie bez opisu</button>
        </div>
    </div>

)

}

export default Photos;