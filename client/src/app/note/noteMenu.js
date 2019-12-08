import React from 'react'
import AddItem from './addItem'
import $ from 'jquery'


class NoteMenu extends React.Component{

    toggleOption(option) {
        const options = ["#addBox","#deleteBox","#modifyBox"];
        options.forEach((element) => {
            $(element).css('opacity', 0);
            $(element).css('visibility','hidden');

        })
                    // eslint-disable-next-line
                    if($(option).css('opacity') == 0) {
                            $(option).css('opacity', 1);
                            $(option).css('visibility','visible');
                            console.log('toggle on');
                    } else {
                            $(option).css('opacity', 0);
                            $(option).css('visibility','hidden');
                            console.log('toggle off');
                        }
            }

    render() {

        return(
            <div className="container">
                <div className="noteMenu">
                    <button className="noteMenuButton" onClick={() => this.toggleOption("#addBox")}>Dodaj</button>
                    <button className="noteMenuButton" onClick={() => this.toggleOption("#deleteBox")}>Usun</button>
                    <button className="noteMenuButton" onClick={() => this.toggleOption("#modifyBox")}>Modyfikuj</button>
                </div>
                <AddItem/>
            </div>

        )
    }
}

export default NoteMenu;