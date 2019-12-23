import React from 'react';
import './styles/note.css';
import Current from './note/current'
import Sold from './note/sold'
import Pending from './note/pending'
import NoteMenu from './note/noteMenu'
import ItemInfo from './note/itemInfo'
import $ from 'jquery'
import ReactModal from 'react-modal'

import {
    BrowserRouter as Router,
    Route,
    NavLink,
    Switch
  } from 'react-router-dom';

class Render extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteMode: false,
            itemModal: false,
            currentItem: 0,
        };
    }
    toggleDelete = () => {
        this.setState(prevState => ({
            deleteMode: !prevState.deleteMode
        }));
                            // eslint-disable-next-line
                            if($(".deleteButton").css('opacity') == 0) {
                                $(".deleteButton").css('opacity', 1);
                                $(".deleteButton").css('visibility','visible');
                        } else {
                                $(".deleteButton").css('opacity', 0);
                                $("deleteButton").css('visibility','hidden');
                            }
    }

       deleteItem = (id) => {
           this.props.socket.emit('deleteItem', id.target.id)
           this.props.refreshItems();
           this.toggleDelete();
       }
       itemInfo = (id) => {
            this.setState({currentItem: id});
            this.setState({itemModal: true});
       }
       handleModal() {
           this.setState({itemModal: !this.state.itemModal});
       }

    render() {
        return (
            <Router>
                 <div className="tableContainer">
                    <div className="noteTableNavi">
                    <NavLink className="link naviButton" activeClassName="active" to="/note/current">Aktualne</NavLink>
                    <NavLink className="link naviButton" to="/note/sold">Sprzedane</NavLink>
                    <NavLink className="link naviButton"  to="/note/pending">Zamowione</NavLink>
                    </div>
                    <div className="itemsInfo">
                        <span>Nazwa</span>
                        <span>Rozmiar</span>
                        <span>Stan</span>
                        <span>Cena kupna</span>
                        <Switch>
                            <Route path="/note/sold"><span>Profit</span></Route>
                            <Route path="/note/current"><span>Sprzedaj</span></Route>
                        </Switch>
                    </div>
                    <div className="noteContent">
                        <Switch>
                            <Route path="/note/sold">
                              <Sold items={this.props.soldItems} deleteItem={this.deleteItem} itemInfo={(id) => this.itemInfo(id)}/>
                            </Route>
                            <Route path="/note/pending">
                                <Pending/>
                            </Route>
                            <Route path="/">
                             <Current socket={this.props.socket} itemInfo={(id) => this.itemInfo(id)} items={this.props.currentItems} deleteItem={this.deleteItem} refreshItems={this.props.refreshItems}/>
                            </Route>
                        </Switch>
                    </div>
                    <NoteMenu socket={this.props.socket} userID={this.props.userID} deleteMode={this.toggleDelete} refreshItems={this.props.refreshItems}/>

                    <ReactModal isOpen={this.state.itemModal} className={"modalContent"} overlayClassName={"modalOverlay"} onRequestClose={() => this.setState({itemModal: false})}>
                    <ItemInfo socket={this.props.socket} handleModal={this.handleModal} itemID={this.state.currentItem}/>
            </ReactModal>

                </div>
            </Router>
        )
    }
}

export default {
    Render
}