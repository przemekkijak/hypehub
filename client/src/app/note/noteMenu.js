import React, {useState} from 'react'
import AddItem from './addItem'
import ReactModal from 'react-modal'

ReactModal.setAppElement('#root');

function NoteMenu(props) {

        const [addModal, setAddModal] = useState(false);
        const [modifyModal, setModifyModal] = useState(false);
        const socket = props.socket;

        function handleModal(modalType) {
            if(modalType === 'add') {
                setAddModal(!addModal);
            } else {
                setModifyModal(!modifyModal);
            };
        }

        return(
                <div className="noteMenu">
                    <button className="noteButton" id="noteMenuButton" onClick={() => handleModal('add')}>Dodaj</button>
                    <button className="noteButton" id="noteMenuButton" onClick={props.deleteMode}>Usun</button>
                    <button className="noteButton" id="noteMenuButton">Modyfikuj</button>

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