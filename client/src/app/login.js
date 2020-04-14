import React, { useState, useRef } from "react";
import axios from "axios";
import Register from "./register";

function Login(props) {
  const [failed, setFailed] = useState(false);
  const username = useRef();
  const password = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    await axios
      .post("https://hypehub.pl/login", {
        username: username.current.value,
        password: password.current.value,
      })
      .then((res) => {
        if (res.data.status === "failed") {
          setFailed(true);
        } else {
          props.handleLogin(res.data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <div className="container">
      <div className={`loginBox ${localStorage.getItem('hypehubTheme') > 0 ? 'dark' : ''}`} onSubmit={handleSubmit}>
        <form>
          {failed && <label>Login lub haslo nieprawidlowe</label>}
          <input placeholder="Login" ref={username} autoFocus={true} required />
          <input type="password" placeholder="Haslo" ref={password} required />
          <button type="submit" className="menuButton">
            Zaloguj
          </button>
        </form>
      </div>
      {/* <Register/> */}
    </div>
  );
}
export default Login;
