import React from 'react'


class NoteMenu extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {

        return(
            <div className="container">
                <div className="noteMenu">
                    <button className="noteMenuButton">Dodaj</button>
                    <button className="noteMenuButton">Usun</button>
                    <button className="noteMenuButton">Modyfikuj</button>
                </div>
            </div>

        )
    }
}

export default NoteMenu;