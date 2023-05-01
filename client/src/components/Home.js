import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Login"

function Home({user, onLogin}) {
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