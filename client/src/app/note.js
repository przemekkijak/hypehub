import React from 'react';
import './styles/note.css';
import Current from './note/current'
import Sold from './note/sold'
import Pending from './note/pending'
import NoteMenu from './note/noteMenu'

import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
  } from 'react-router-dom';

class Render extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteMode: false,
        };
        this.toggleDelete = this.toggleDelete.bind(this)
    }

    toggleDelete() {
        this.setState({
            deleteMode: !this.state.deleteMode
        });
    }

    render() {
        return (
            <Router>
            <div className="container">
                 <div className="tableContainer">
                    <div className="noteTableNavi">
                        <button className="naviButton" id="current"><Link class="link" to="/current">Aktualne</Link></button>
                        <button className="naviButton" id="sold"><Link class="link" to="/sold">Sprzedane</Link></button>
                        <button className="naviButton" id="pending"><Link class="link" to="/pending">Zamowione</Link></button>
                    </div>
                    <div className="noteContent">
                        <Switch>
                            <Route path="/sold">
                              <Sold items={this.props.soldItems} deleteMode={this.state.deleteMode}/>
                            </Route>
                            <Route path="/pending">
                                <Pending/>
                            </Route>
                            <Route path="/">
                             <Current items={this.props.currentItems} deleteMode={this.state.deleteMode}/>
                            </Route>
                        </Switch>
                    </div>
                </div>
                <NoteMenu deleteMode={this.toggleDelete}/>
            </div>
            </Router>
        )
    }
}

export default {
    Render
}