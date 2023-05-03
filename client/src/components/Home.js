import React, {useContext, useState} from "react";
import { UserContext } from "../context/user";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Login"
import SignUp from "./SignUp"


function Home() {
    const { user, setUser } = useContext(UserContext);
    const [sign, setSign] = useState(false)

    const handleClick = () => {
        setSign(!sign)
    }

    const onLogin = (user) => {setUser(user)}

    if (!user){
        return (
            <div>
                <h1 className="home">Welcome to SoundScape</h1>
                <div className="home">
                    <h1>Log in:</h1>
                    <Login onLogin={onLogin}/>
                    <button className='button' onClick={handleClick}>Sign Up</button>
                    {sign ? <SignUp onLogin={onLogin}/> : <div></div>}
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                <h1 className="home">Welcome to SoundScape, {user.user_name}</h1>
            </div>
            
        )
    }
   
}

export default Home