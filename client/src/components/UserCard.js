import React, {useState} from 'react'
import { Link } from 'react-router-dom'

function UserCard({user}) {
    return (
        <div className='userCard'>
            <Link to={`/users/${user.id}`} style={{ textDecoration: 'none', color: 'white' }}>
            <div className='container'>
                <div className='profileImg' >
                    <img src={user.picture} alt={user.user_name} className='pi'/>
                </div>
                <div className='text'>
                    <h3 className='profileH1'>Full Name: {user.first_name} {user.last_name}</h3>
                    <h3>Username: {user.user_name}</h3>
                </div>
            </div>
            </Link>
        </div>
    )
}

export default UserCard