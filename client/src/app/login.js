import React from 'react'
import socketIOClient from 'socket.io-client'
import {Redirect} from 'react-router-dom'
class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            failed: false,
        }
    }

    componentDidMount() {
        this.setState({failed: false});
    }

    handleSubmit = (e) => {
        const socket = socketIOClient('http://localhost:4001');
        // e.preventDefault();
        let user = {
            id: null,
            username: this.username.value,
            password: this.password.value,
        }
        socket.emit('login',user)
        socket.on('success', (username,id) => {
            localStorage.setItem('username', username);
            localStorage.setItem('logged','true')
            localStorage.setItem('id',id);
           return <Redirect to ="/"/>
        })
        socket.on('failed',(res) => {
            this.setState({failed: true})
        })
    }

    render() {
        return(

            <div className="container">
                <div className="loginBox" id="loginBox" onSubmit={this.handleSubmit}>
                    <form>
                    {this.state.failed && (<label>Login lub haslo nieprawidlowe</label>)}
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