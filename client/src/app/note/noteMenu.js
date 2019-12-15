import React from 'react'
import AddItem from './addItem'
import ReactModal from 'react-modal'

ReactModal.setAppElement('#root');

class NoteMenu extends React.Component{
        constructor(props) {
            super(props);

            this.state = {
                addModal: false,
                modifyModal: false
            };
        }
        handleModal = (modalType) => {
            if(modalType === 'add') {
                this.setState({addModal: !this.state.addModal})
            } else {
                this.setState({modifyModal: !this.state.modifyModal})
            };
        }
    render() {

        return(
                <div className="noteMenu">
                    <button className="noteMenuButton" onClick={() => this.handleModal('add')}>Dodaj</button>
                    <button className="noteMenuButton" onClick={this.props.deleteMode}>Usun</button>
                    <button className="noteMenuButton">Modyfikuj</button>

                <ReactModal isOpen={this.state.addModal} className={"modalContent"} overlayClassName={"modalOverlay"} onRequestClose={() => this.handleModal('add')}>
                    <AddItem refreshItems={this.props.refreshItems} handleModal={this.handleModal}/>
                </ReactModal>

                {/* <ReactModal isOpen={this.state.addModal} contentLabel={"Dodawanie przedmiotu"}
                className={"modalContent"} overlayClassName={"modalOverlay"}>
                    <ModifyItem/>
                </ReactModal> */}
                 </div>

        )
    }
}

export default NoteMenu;