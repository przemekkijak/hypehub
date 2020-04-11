import React, { useState } from "react";
import AddItem from "./addItem";
import ReactModal from "react-modal";
import "../styles/css/note.css";

ReactModal.setAppElement("#root");

function NoteMenu(props) {
  const [addModal, setAddModal] = useState(false);

  function handleModal() {
    setAddModal(!addModal);
  }

  return (
    <>
      <div className="noteMenu">
          <button id="addButton" onClick={() => handleModal()}>+</button>

        <ReactModal
          isOpen={addModal}
          className={"modalContent"}
          overlayClassName={"modalOverlay"}
          onRequestClose={() => handleModal()}
        >
          <AddItem
            refreshItems={props.refreshItems}
            handleModal={handleModal}
          />
        </ReactModal>
      </div>
    </>
  );
}

export default NoteMenu;
