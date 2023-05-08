import React, { useContext, useState } from "react";
import { UserContext } from "../context/user";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import soundwave from "../soundwave-unscreen.gif"

function Home() {
  const { user, setUser } = useContext(UserContext);
  const [sign, setSign] = useState(false);
  const [log, setLog] = useState(false);

  const handleSignUpClick = () => {
    setSign(!sign);
  };

  const handleLogInClick = () => {
    setLog(!log);
  };

  const onLogin = (user) => {
    setUser(user);
  };

  if (!user) {
    return (
      <div>
        <div className="home">
          <h1>Welcome to SoundScape</h1>

          {log ? (
            <Login onLogin={onLogin} />
          ) : (
            <button className="button" onClick={handleLogInClick}>
              Log In
            </button>
          )}

          {sign ? (
            <SignUp onLogin={onLogin} />
          ) : (
            <button className="button" onClick={handleSignUpClick}>
              Sign Up
            </button>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="home">Welcome to SoundScape, {user.user_name}</h1>
        <img src={soundwave} alt='soundwave' className="homeImg"/>
      </div>
    );
  }
}

export default Home;
