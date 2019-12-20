import React from 'react'
import App from '../App'
import Login from './login'
import socketIOClient from 'socket.io-client'
import './styles/App.css';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,
  } from 'react-router-dom';

class Home extends React.Component{
        constructor(props) {
            super(props)
            this.state = {
                isLoged: false,
                userID: 0,
            }

        }
        componentDidMount() {
            const socket = socketIOClient('localhost:4001');
            socket.on('loggedIn', (loginStatus, id) => {
              this.setState({isLoged: true});
              this.setState({userID: id});
              console.log('sesja przywrocona zalogowano ' + id, loginStatus)
              })
            socket.on('notLogged', (data) => {
                this.setState({isLoged: data});
            })
        }

        handleLogin(id) {
            this.setState({isLoged: true});
            this.setState({userID: id});
            console.log('zalogowano ' + id, this.state.isLoged);
          }


    render() {
        return(
            <>
            <Login handleLogin={(id) => this.handleLogin(id)}/>

            </>
        )
    }
}
export default Home;