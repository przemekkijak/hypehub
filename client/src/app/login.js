import React from 'react'
import socketIOClient from 'socket.io-client'


class Login extends React.Component {


    handleSubmit = (e) => {
        const socket = socketIOClient('http://localhost:4001');
        e.preventDefault();
        let user = {
            username: this.username.value,
            password: this.password.value,
        }
        socket.emit('auth',user)
    }

    render() {
        return(

            <div className="container">

                <div className="loginBox" onSubmit={this.handleSubmit}>
                    <form>
                        <input placeholder="Login" ref={(el) => this.username = el} autofocus={true}/>
                        <input placeholder="Haslo" ref={(el) => this.password = el}/>
                        <button type="submit" className="menuButton" onClick={this.props.handleLogin}>Zaloguj</button>
                    </form>
                </div>
            </div>
        )
    }
}
export default Login;