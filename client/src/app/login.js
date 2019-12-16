import React from 'react'
import socketIOClient from 'socket.io-client'
import {Redirect} from 'react-router-dom'


class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }


    handleSubmit = (e) => {
        const socket = socketIOClient('http://localhost:4001');
        e.preventDefault();
        let user = {
            username: this.username.value,
            password: this.password.value,
        }
        socket.emit('auth',user)
        socket.on('success', (res) => {
            console.log(res);
            this.props.handleLogin();
        })
        socket.on('failed',(res) => {
            console.log(res);
        })
    }

    render() {
        return(

            <div className="container">
                <div className="loginBox" onSubmit={this.handleSubmit}>
                    <form>
                        <input placeholder="Login" ref={(el) => this.username = el} autoFocus={true} required/>
                        <input type="password" placeholder="Haslo" ref={(el) => this.password = el} required/>
                        <button type="submit" className="menuButton" >Zaloguj</button>
                    </form>

                </div>
            </div>
        )
    }
}
export default Login;