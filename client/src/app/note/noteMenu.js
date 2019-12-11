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
                    <button className="noteMenuButton" onClick={this.props.deleteMode}>Usun</button>
                    <button className="noteMenuButton" onClick={() => this.toggleOption("#modifyBox")}>Modyfikuj</button>
                </div>
                <AddItem refreshItems={this.props.refreshItems} hideBox={this.toggleOption}/>
            </div>

        )
    }
}

export default NoteMenu;