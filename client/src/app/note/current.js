import React, {useState} from 'react';
import ReactModal from 'react-modal'
import SellItem from './sellItem'

ReactModal.setAppElement('#root');

function Current(props) {
    const socket = props.socket;
    const [sellModal, setSellModal] = useState(false);
    const [currentId, setCurrentId] = useState(0);

        function sellItem(id) {
        setSellModal(true);
        setCurrentId(id);
        }
        function handleModal() {
            setSellModal(!sellModal);
        }

        function convertCondition(cond) {
            if(cond === 10) {
                return 'DS';
            } else {
                return cond+'/10';
            };
        }

        return(
            <div className="currentContainer">
                {props.items.map((item) =>
                    <div className="itemSlot" id={item.id} onClick={() => props.itemInfo(item.id)}>
                        <p>{item.name}</p>
                        <p>{item.size}</p>
                        <p>{convertCondition(item.cond)}</p>
                        <p>{item.buyPrice} zł</p>
                        <p><button className="noteButton sellButton"
                        onClick={() => sellItem(item.id)}>$</button></p>
                        <p><button className="noteButton sellButton" onClick={() => props.itemInfo(item.id)}>i</button></p>
                        <p><button className="noteButton deleteButton" id={item.id} onClick={id => props.deleteItem(id)}>x</button></p>
                    </div>

                )}

            <ReactModal isOpen={sellModal} className={"modalContent"} overlayClassName={"modalOverlay"} onRequestClose={() => setSellModal(false)}>
                <SellItem socket={socket} id={currentId} items={props.items} handleModal={() => handleModal()} refreshItems={props.refreshItems}/>
            </ReactModal>
            </div>
        )
    }

export default Current;