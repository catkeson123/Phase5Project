import React, {useState, useEffect} from "react";

const ReviewsContext = React.createContext();

function ReviewsProvider({ children }) {
    const [reviews, setReviews] = useState(null);

    useEffect(() => {
    fetch("/check_session").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };