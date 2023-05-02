import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Songs from "./Songs";
import SongCard from "./SongCard";
import Profile from "./Profile";
import Header from "./Header";
import Reviews from "./Reviews";
import Review from "./Review";
import Users from "./Users";
import UserCard from "./UserCard";
import ViewProfile from "./ViewProfile"
import { UserProvider } from "../context/user";

function App() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("/songs")
      .then((r) => r.json())
      .then(setSongs);
  }, []);

  const [reviews, setReviews] = useState([]);

  const addReviewToState = newReview => {
    setReviews([...reviews, newReview])
  }

  useEffect(() => {
      fetch("/reviews")
          .then((r) => r.json())
          .then(setReviews);
      }, []);

  let displayReviews = reviews.map((review) => <Review key={review.id} review={review} />);
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  let songCards = songs.map((song) => <SongCard key={song.id} addReviewToState={addReviewToState} user={user} song={song} />);

  const onLogout = () => {setUser(null)}

  const onLogin = (user) => {setUser(user)}

  const removeReviewFromState = (deleteID) => {
    setReviews(reviews => reviews.filter(review => {
        return review.id != deleteID
    }))
  }

  return (
    <div>
        <Header onLogout={onLogout} user={user} />
        <Route exact path='/users/:id'>
            <ViewProfile />
        </Route>
        <Switch>
        <Route exact path="/">
            <Home user={user} onLogin={onLogin}/>
        </Route>
        <Route exact path="/songs">
            <Songs songCards={songCards} addReviewToState={addReviewToState}/>
        </Route>
        <Route exact path="/reviews">
            <Reviews reviews={displayReviews}/>
        </Route>
        <Route exact path="/users">
            <Users user={user}/>
        </Route>
        <Route path="/profile">
            <Profile user={user} removeReviewFromState={removeReviewFromState} setUser={setUser}/>
        </Route>
        </Switch>
    </div>
  );
}

export default App;
