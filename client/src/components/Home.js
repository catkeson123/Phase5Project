import React, {useContext} from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Login"
import { UserContext } from "../context/user";

function Home() {
    const { user, setUser } = useContext(UserContext);

    const onLogin = (user) => {setUser(user)}
    if (!user){
        return (
            <div>
                <h1 className="home">Welcome to SoundScape</h1>
                <div className="home">
                    <h1>Log in:</h1>
                    <Login onLogin={onLogin}/>
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