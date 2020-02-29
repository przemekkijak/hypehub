import React, { useState, useRef } from "react";
import axios from 'axios';

function Login(props) {
  const [failed, setFailed] = useState(false);
  const username = useRef();
  const password = useRef();

async function handleSubmit(e) {
    e.preventDefault();

    const loginResponse = await axios.post('http://localhost:3000/login', {
      username: username.current.value,
      password: password.current.value,
    })
    .then(res => {
      props.handleLogin(res.data);
    });
  }

  return (
    <div className="container">
      <div className="loginBox" id="loginBox" onSubmit={handleSubmit}>
        <form>
          {failed && <label>Login lub haslo nieprawidlowe</label>}
          <input placeholder="Login" ref={username} autoFocus={true} required />
          <input type="password" placeholder="Haslo" ref={password} required />
          <button type="submit" className="menuButton">
            Zaloguj
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;
