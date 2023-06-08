import { Switch, Route } from "react-router-dom";
import "../index.css";
import Home from "./Home";
import Albums from "./Albums";
import Profile from "./Profile";
import Header from "./Header";
import Reviews from "./Reviews";
import Users from "./Users";
import ViewProfile from "./ViewProfile";
import { UserProvider } from "../context/user";
import { ReviewsProvider } from "../context/reviews";

function App() {

  return (
    <div>
      <ReviewsProvider>
      <UserProvider>
        <Header />
        <Route exact path="/users/:id">
          <ViewProfile />
        </Route>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/albums">
            <Albums/>
          </Route>
          <Route exact path="/reviews">
            <Reviews/>
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
          <Route path="/profile">
            <Profile/>
          </Route>
        </Switch>
      </UserProvider>
      </ReviewsProvider>
    </div>
  );
}

export default App;
