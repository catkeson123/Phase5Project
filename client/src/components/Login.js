import React, {useState} from 'react';

function Login({ onLogin, onLogModalClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password, }),
    })
      .then((r) => r.json())
      .then((user) => onLogin(user));

      onLogModalClose()
  }
  
  
    return (
      <div className='formDiv'>
        <form onSubmit={handleSubmit}>
        <input
        className='formInput'
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username'
        />
        <input
          className='formInput'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
        <button className='modal-button' type="submit">Login</button>
      </form>
      </div>
      
    );
  }

export default Login