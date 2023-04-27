import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Login"

function Home({user, onLogin}) {
    if (!user){
        return (
            <div>
                <h1>Welcome to SoundScape</h1>
                <Login onLogin={onLogin}/>
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>Welcome to SoundScape, {user.user_name}</h1>
            </div>
            
        )
    }
   
}

export default Home