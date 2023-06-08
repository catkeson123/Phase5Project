import React, { useContext, useState } from "react";
import { UserContext } from "../context/user";
import soundwave from "../soundwave-unscreen.gif"
import LogInModal from './LogInModal'
import SignUpModal from './SignUpModal'

function Home() {
  const { user, setUser } = useContext(UserContext);
  const [sign, setSign] = useState(false);
  const [log, setLog] = useState(false);

  const handleSignUpClick = () => {
    setSign(!sign);
  };

  const onSignModalClose = () => {
    setSign(false)
  }

  const handleLogInClick = () => {
    setLog(!log);
  };

  const onLogModalClose = () => {
    setLog(false)
  }

  const onLogin = (user) => {
    setUser(user);
  };

  if (!user) {
    return (
      <div>
        <div className="home">
          <h1>Welcome to SoundScape</h1>
          <button className="button" onClick={handleLogInClick}>
            Log In
          </button>
          <LogInModal log={log} onLogModalClose={onLogModalClose} onLogin={onLogin} />
          <button className="button" onClick={handleSignUpClick}>
            Sign Up
          </button>
          <SignUpModal sign={sign}  onSignModalClose={onSignModalClose} onLogin={onLogin}/>
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
