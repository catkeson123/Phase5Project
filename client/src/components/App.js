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

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
      fetch("/reviews")
          .then((r) => r.json())
          .then(setReviews);
      }, []);

  const addReviewToState = newReview => {
  setReviews([...reviews, newReview])
  }

  const removeReviewFromState = (deleteID) => {
  setReviews(reviews => reviews.filter(review => {
      return review.id !== deleteID
  }))
  }

  console.log(reviews)

  let displayReviews = reviews.map((review) => <Review key={review.id} review={review} />);

  console.log(displayReviews)

  return (
    <div>
        <UserProvider>
            <Header />
            <Route exact path='/users/:id'>
                <ViewProfile />
            </Route>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/songs">
                    <Songs addReviewToState={addReviewToState}/>
                </Route>
                <Route exact path="/reviews">
                    <Reviews reviews={displayReviews}/>
                </Route>
                <Route exact path="/users">
                    <Users/>
                </Route>
                <Route path="/profile">
                    <Profile removeReviewFromState={removeReviewFromState}/>
                </Route>
            </Switch>
        </UserProvider>
    </div>
  );
}

export default App;
