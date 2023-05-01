import React, { useState, useEffect } from "react";
import UserCard from "./UserCard"

function Users() {
    const[users, setUsers] = useState([]);

    useEffect(() => {
        fetch("/users")
            .then((r) => r.json())
            .then(setUsers);
        }, []);

    let userCards = users.map((user) => <UserCard key={user.id} user={user}/>)
    return (
        <div>
            <div className='userList'>
                {userCards}
            </div>
        </div>
    )
}

export default Users