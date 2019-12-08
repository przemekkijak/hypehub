import React from 'react';
import './styles/note.css';
import Current from './note/current'
import Sold from './note/sold'
import Pending from './note/pending'
import NoteMenu from './note/noteMenu'
import $ from 'jquery';

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
            deleteMode: !this.state.deleteMode,
        });
        console.log('delete mode' + this.state.deleteMode)
    }

    render() {
        return (
            <Router>
            <div className="container">
                 <div className="tableContainer">
                    <div className="noteTableNavi">
                    <Link className="link naviButton" id="current" to="/current">Aktualne</Link>
                    <Link className="link naviButton" id="sold" to="/sold">Sprzedane</Link>
                    <Link className="link naviButton" id="pending" to="/pending">Zamowione</Link>
                    </div>
                    <div className="noteContent">
                        <Switch>

                            <Route path="/sold">
                              <Sold items={this.props.soldItems}/>
                            </Route>

                            <Route path="/pending">
                                <Pending/>
                            </Route>

                            <Route path="/">
                             <Current items={this.props.currentItems}/>
                            </Route>

                        </Switch>
                    </div>
                </div>
                <NoteMenu deleteMode={() => this.toggleDelete()}/>
            </div>
            </Router>
        )
    }
}

export default {
    Render
}