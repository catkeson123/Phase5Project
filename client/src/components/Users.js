import React, { useState, useEffect } from "react";
import UserCard from "./UserCard"

function Users({user}) {
    const[users, setUsers] = useState([]);

    
    useEffect(() => {
        fetch("/users")
            .then((r) => r.json())
            .then(setUsers);
        }, []);

    let userCards = []
    if(user){
        userCards = users.map((user) => <UserCard key={user.id} user={user}/>)
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