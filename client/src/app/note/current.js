import React from 'react';
import ReactModal from 'react-modal'
import SellItem from './sellItem'

ReactModal.setAppElement('#root');

class Current extends React.Component{
        constructor(props) {
            super(props);

            this.state = {
                sellModal: false,
                currentId: 0,
            }
        }
        sellItem = (id) => {
        this.setState({sellModal: true})
        this.setState({currentId: id})
        }

        handleModal() {
            this.setState({sellModal: !this.state.sellModal});
        }

    render() {
        return(
            <div className="currentContainer">
                {this.props.items.map((item) =>
                <div className="item" key={item.id}>
                    <div className="itemSlot" id={item.id}>
                        <p>{item.name}</p>
                        <p>{item.size}</p>
                        <p>{item.cond}/10</p>
                        <p>{item.buyPrice}</p>
                        <p><button className="noteButton"
                        onClick={() => this.sellItem(item.id)}>$</button></p>
                        <p><button className="noteButton" onClick={() => this.props.itemInfo(item.id)}>i</button></p>
                        <p><button className="noteButton deleteButton" id={item.id} onClick={id => this.props.deleteItem(id)}>x</button></p>
                    </div>
                </div>
                )}

            <ReactModal isOpen={this.state.sellModal} className={"modalContent"} overlayClassName={"modalOverlay"} onRequestClose={() => this.handleModal()}>
                <SellItem socket={this.props.socket} id={this.state.currentId} items={this.props.items} handleModal={this.handleModal} refreshItems={this.props.refreshItems}/>
            </ReactModal>
            </div>
        )
    }
}

export default Current;