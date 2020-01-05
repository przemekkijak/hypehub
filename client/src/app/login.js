import React, {useState, useRef} from 'react'

function Login(props) {
        const [failed, setFailed] = useState(false);
        const socket = props.socket;
        const username = useRef();
        const password = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        let user = {
            id: null,
            username: username.current.value,
            password: password.current.value,
        }
        socket.emit('login',user)
        socket.on('success', (user) => {
            props.handleLogin(user);
            localStorage.setItem('token', user.token);
            localStorage.setItem('id', user.id);
        })
        socket.on('failed',(res) => {
            setFailed(true);
        })
    }
        return(

            <div className="container">
                <div className="loginBox" id="loginBox" onSubmit={handleSubmit}>
                    <form>
                    {failed && (<label>Login lub haslo nieprawidlowe</label>)}
                        <input placeholder="Login" ref={username} autoFocus={true} required/>
                        <input type="password" placeholder="Haslo" ref={password} required/>
                        <button type="submit" className="menuButton" >Zaloguj</button>
                    </form>
                </div>
            </div>
        )
    }
export default Login;