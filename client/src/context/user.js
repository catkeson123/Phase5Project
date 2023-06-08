import React, {useState, useEffect} from "react";

const UserContext = React.createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
      fetchUser()
    }, []);

    const fetchUser = () => {fetch("/check_session").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });}

    return (
        <UserContext.Provider value={{ user, setUser, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };