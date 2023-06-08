import React, { useState, useEffect, useContext } from "react";
import UserCard from "./UserCard"
import { UserContext } from "../context/user";

function Users() {
    const { user } = useContext(UserContext);
    const[users, setUsers] = useState([]);

    useEffect(() => {
        fetch("/users")
            .then((r) => r.json())
            .then(setUsers);
        }, []);

    let userCards = []
    if(user){
        let filterUsers = users.filter((us) => {
            return us.id !== user.id
        } )
        userCards = filterUsers.map((user1) => <UserCard key={user1.id} user={user1}/>)
    } else {
        userCards = []
    }
    
    if (!user) {
        return (
            <div className='home'>
                <h1>Please log in to view other users</h1>
            </div>
        )
    } 

    return (
        <div className='profile'>
            <h1 className='labelH1'>Other Users:</h1>
            <div className='userList'>
                {userCards}
            </div>
        </div>
    )
}

export default Users