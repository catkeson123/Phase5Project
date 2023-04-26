import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Songs from "./Songs"
import SongCard from "./SongCard"
import Profile from "./Profile"

function App() {

    const [songs, setSongs] = useState([])

    useEffect(() => {
        fetch('/songs')
            .then(r => r.json())
            .then(setSongs)
    }, [])

    let songCards = songs.map(song => <SongCard key={song.id} song={song}/>)

    return (
        <Switch>
            <Route exact path='/'>
                <Home />
            </Route>
            <Route exact path='/songs'>
                <Songs songCards={songCards}/>
            </Route>
            <Route path='/users/:id'>
                <Profile />
            </Route>
        </Switch>
    )
}

export default App;