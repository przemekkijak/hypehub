import React, { useState } from "react";
import AddItem from "./addItem";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

function NoteMenu(props) {
  const [addModal, setAddModal] = useState(false);

  function handleModal() {
    setAddModal(!addModal);
  }

  return (
    <>
      <div className="noteMenu">
        <button
          className="noteButton"
          id="addButton"
          onClick={() => handleModal()}
        >
          Dodaj
        </button>

        <ReactModal
          isOpen={addModal}
          className={"modalContent"}
          overlayClassName={"modalOverlay"}
          onRequestClose={() => handleModal()}
        >
          <AddItem
            userID={props.userID}
            refreshItems={props.refreshItems}
            handleModal={handleModal}
          />
        </ReactModal>
      </div>
    </>
  );
}

export default NoteMenu;
