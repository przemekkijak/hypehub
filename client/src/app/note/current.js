import React from 'react';
import ReactModal from 'react-modal'
import SellItem from './sellItem'
import $ from 'jquery'

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
        this.setState({currentId: id})
        }


    render() {
        return(
            <div className="currentContainer">
                {this.props.items.map((item) =>
                <div className="item">
                    <div className="itemSlot" id={item.id} key={item.id}>
                        <p>{item.name}</p>
                        <p>{item.size}</p>
                        <p>{item.cond}/10</p>
                        <p>{item.buyPrice}</p>
                        <p><button className="noteButton"
                        onClick={() => this.sellItem(item.id)}>$</button></p>
                        <p><button className="noteButton deleteButton" id={item.id} onClick={id => this.props.deleteItem(id)}>x</button></p>
                    </div>
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