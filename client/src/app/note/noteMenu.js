import React from 'react'
import AddItem from './addItem'
import DeleteItem from './deleteItem'
import $ from 'jquery'


class NoteMenu extends React.Component{
    constructor(props) {
        super(props);
    }
    toggleOption(option) {
        const options = ["#addBox","#deleteBox","#modifyBox"];
        options.forEach((element) => {
            $(element).css('opacity', 0);
            $(element).css('visibility','hidden');

        })
                    if($(option).css('opacity') == 0) {
                            $(option).css('opacity', 1);
                            $(option).css('visibility','visible');
                    } else {
                            $(option).css('opacity', 0);
                            $(option).css('visibility','hidden');
                        }
            }

    render() {

        return(
            <div className="container">
                <div className="noteMenu">
                    <button className="noteMenuButton" onClick={() => this.toggleOption("#addBox")}>Dodaj</button>
                    <button className="noteMenuButton" onClick={() => this.toggleOption("#deleteBox")}>Usun</button>
                    <button className="noteMenuButton" onClick={() => this.toggleOption("modifyBox")}>Modyfikuj</button>
                </div>
                <AddItem/>
                <DeleteItem/>
            </div>

        )
    }
}

export default NoteMenu;