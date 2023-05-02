import React, { useState, useEffect, useContext } from "react";
import UserCard from "./UserCard"
import { UserContext } from "../context/user";

function Users() {
    const { user, setUser } = useContext(UserContext);
    const[users, setUsers] = useState([]);

    useEffect(() => {
        fetch("/users")
            .then((r) => r.json())
            .then(setUsers);
        }, []);

    let userCards = []
    if(user){
        userCards = users.map((user1) => <UserCard key={user1.id} user={user1}/>)
    } else {
        userCards = []
    }
    
    return (
        <div className='profile'>
            <h1>Other Users:</h1>
            <div className='userList'>
                {userCards}
            </div>
        </div>
    )
}

export default Users