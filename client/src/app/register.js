import React, {useRef} from 'react';
import "./styles/login.css";
import axios from 'axios';


function Register() {
    const username = useRef();
    const password = useRef();
    const email = useRef();

    async function handleSubmit(e) {
        e.preventDefault();

        await axios.post('https://hypehub.pl/register', {
            username: username.current.value,
            password: password.current.value,
            email: email.current.value
          })
          .then(res => {
              if(res.status === 200) {
              } else {
              }
          })
        }
return (
    <div className="registerBox" onSubmit={handleSubmit}>
    <form>
      <input placeholder="Login" ref={username} autoFocus={true} required />
      <input type="password" placeholder="Haslo" ref={password} required />
      <input placeholder="Email" ref={email} required/>
      <button type="submit" className="menuButton">
        Zarejestruj
      </button>
    </form>
  </div>
)
}

export default Register;