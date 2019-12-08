import React, { Component } from 'react';
import Note from './app/note.js';
import Resell from './app/resell';
import Bump from './app/bump';
import Axios from 'axios';
import './app/styles/App.css';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

class App extends Component {
    constructor(props) {
      super(props)
      this.state = {
        currentItems: [],
        soldItems: [],
        pendingItems: [],
      }
    }
    componentDidMount() {
      this.fetchItems();
    }

    fetchItems() {
      Axios.get('http://localhost:3000/getCurrentItems')
      .then(response => this.setState({currentItems: response.data}));

      Axios.get('http://localhost:3000/getSoldItems')
      .then(response => this.setState({soldItems: response.data}));
    }

  render() {
    return (
      <Router>
      <div className="App">
          <link href="https://fonts.googleapis.com/css?family=Assistant:400,700&display=swap" rel="stylesheet"/>
          <div className="naviContainer">
                <div className="navigation">
                   <Link class="link naviElement" to="/">NOTE</Link>
                    <span className="naviElement"><Link class="link" to="/resell">RESELL</Link></span>
                    <span className="naviElement"><Link class="link" to="/bump">BUMP</Link></span>
                    <span className="naviElement">ACCOUNT</span>
                </div>
            </div>
            <Switch>
              <Route path="/resell">
                <Resell/>
              </Route>
              <Route path="/bump">
                <Bump/>
              </Route>
              <Route path="/">
                <Note.Render currentItems={this.state.currentItems} soldItems={this.state.soldItems}/>
              </Route>
            </Switch>
      </div>
      </Router>
    );
  }
}

export default App;