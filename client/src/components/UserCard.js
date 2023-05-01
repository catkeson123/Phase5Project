import React, {useState} from 'react'
import { Link } from 'react-router-dom'

function UserCard({user}) {
    return (
        <div className='userCard'>
            <Link to={`/users/${user.id}`}>
                <h1>Full Name: {user.first_name} {user.last_name}</h1>
                <h1>Username: {user.user_name}</h1>
            </Link>
        </div>
    )
}

export default UserCard