import React, {useState} from 'react';

function SignUp({ onLogin, onSignModalClose }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [picture, setPicture] = useState("");
  
    function handleSubmit(e) {
      e.preventDefault();
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password, firstName: firstName, lastName: lastName, email: email, picture: picture,}),
      })
        .then((r) => r.json())
        .then((user) => onLogin(user));
      
      onSignModalClose()
    }
    
    
      return (
        <div className='formDiv'>
          <form onSubmit={handleSubmit}>
          <input
            className="formInput"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='First Name'
          />
          <input
            className="formInput"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Last Name'
          />
          <input
            className="formInput"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
          />
          <input
            className="formInput"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email Address'
          />
          <input
            className="formInput"
            type="text"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
            placeholder='Profile Picture URL'
          />
          <input
            className="formInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
          <button className='button' type="submit">Sign Up!</button>
        </form>
        </div>
        
      );
    }
  
  export default SignUp