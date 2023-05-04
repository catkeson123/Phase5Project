import React, {useState} from 'react'
import { Link } from 'react-router-dom'

function UserCard({user}) {
    return (
        <div className='userCard'>
            <Link to={`/users/${user.id}`}>
                <img src={user.picture} alt={user.user_name} />
                <h1>{user.first_name} {user.last_name}</h1>
                <h1>Username: {user.user_name}</h1>
            </Link>
        </div>
    )
}

export default UserCard