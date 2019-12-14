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
        handleModal = () => {
            this.setState({sellModal: !this.state.sellModal})
        }


    sellItem = (id) => {
        this.setState({sellModal: true})
        // const socket = socketIOClient('http://localhost:4001')
        // let item = {
        //     id: id,
            // price: itemPrice,
        // }
        // socket.emit('sellItem', item)
        this.props.refreshItems();
        this.setState({currentId: id})

    }


    render() {
        return(
            <div className="currentContainer">
                <div className="itemsInfo">
                        <span>Nazwa</span>
                        <span>Rozmiar</span>
                        <span>Stan</span>
                        <span>Cena kupna</span>
                        <span>Sprzedaj</span>
                </div>
                {this.props.items.map((item) =>
                    <div className="itemSlot" key={item.id}>
                        <p>{item.name}</p>
                        <p>{item.size}</p>
                        <p>{item.cond}/10</p>
                        <p>{item.buyPrice}</p>
                        <p><button className="noteButton"
                        onClick={() => this.sellItem(item.id)}>$</button></p>
                        <p><button className="noteButton deleteButton" id={item.id} onClick={id => this.props.deleteItem(id)}>x</button></p>
                    </div>
                )}
            <ReactModal isOpen={this.state.sellModal} className={"modalContent"} overlayClassName={"modalOverlay"} onRequestClose={() => this.handleModal()}>
                <SellItem id={this.state.currentId} items={this.props.items} handleModal={this.handleModal} refreshItems={this.props.refreshItems}/>
            </ReactModal>
            </div>
        )
    }
}

export default Current;