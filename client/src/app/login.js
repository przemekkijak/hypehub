import React from 'react'

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            failed: false,
        }
        this.socket = this.props.socket;
    }

    componentDidMount() {
        this.setState({failed: false});

    }

    handleSubmit = (e) => {
        e.preventDefault();
        let user = {
            id: null,
            username: this.username.value,
            password: this.password.value,
        }
        this.socket.emit('login',user)
        this.socket.on('success', (user) => {
            this.props.handleLogin(user);
            localStorage.setItem('token', user.token);
            localStorage.setItem('id', user.id);
        })
        this.socket.on('failed',(res) => {
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