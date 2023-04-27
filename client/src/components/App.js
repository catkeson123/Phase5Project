import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Songs from "./Songs";
import SongCard from "./SongCard";
import Profile from "./Profile";
import Header from "./Header";

function App() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("/songs")
      .then((r) => r.json())
      .then(setSongs);
  }, []);

  let songCards = songs.map((song) => <SongCard key={song.id} song={song} />);

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  console.log(user)

  const onLogout = () => {setUser(null)}

  const onLogin = (user) => {setUser(user)}

  return (
    <div>
        <Header onLogout={onLogout} user={user} />
        <Switch>
        <Route exact path="/">
            <Home user={user} onLogin={onLogin}/>
        </Route>
        <Route exact path="/songs">
            <Songs songCards={songCards}/>
        </Route>
        <Route path="/profile">
            <Profile user={user}/>
        </Route>
        </Switch>
    </div>
  );
   
   
}

export default App;
