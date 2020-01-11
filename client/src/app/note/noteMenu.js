import React, {useState} from 'react'
import AddItem from './addItem'
import ReactModal from 'react-modal'

ReactModal.setAppElement('#root');

function NoteMenu(props) {

        const [addModal, setAddModal] = useState(false);
        const socket = props.socket;

        function handleModal() {
                setAddModal(!addModal);

        }

        return(
                <div className="noteMenu">
                    <button className="noteButton" id="noteMenuButton" onClick={() => handleModal()}>Dodaj</button>
                    {/* <button className="noteButton" id="noteMenuButton">Modyfikuj</button> */}

                <ReactModal isOpen={addModal} className={"modalContent"} overlayClassName={"modalOverlay"} onRequestClose={() => handleModal('add')}>
                    <AddItem socket={socket} userID={props.userID} refreshItems={props.refreshItems} handleModal={handleModal}/>
                </ReactModal>

                {/* <ReactModal isOpen={this.state.addModal} contentLabel={"Dodawanie przedmiotu"}
                className={"modalContent"} overlayClassName={"modalOverlay"}>
                    <ModifyItem/>
                </ReactModal> */}
                 </div>

        )
    }

export default NoteMenu;