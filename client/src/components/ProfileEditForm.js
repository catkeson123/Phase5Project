import React, { useState, useEffect } from 'react';

function ProfileEditForm({ onUpdateProfile, user, onEditModalClose}) {
    
    const [formData, setFormData] = useState(user)

    const { first_name, last_name, user_name, email, picture, password_hash } = formData

    useEffect(() => {
        fetch(`/users/${user.id}`)
            .then(r => r.json())
            .then(user => {
                setFormData(user)
            })
    }, [user.id])

    const handleChange = e => {
        const { name, value } = e.target
        setFormData(formData => (
            { ...formData, [name]: value }));
    }

    const handleSubmit = e => {
        e.preventDefault()
        fetch(`/users/${user.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                first_name: formData.first_name,
                last_name: formData.last_name,
                user_name: formData.user_name,
                email: formData.email,
                picture: formData.picture,
                password_hash: formData.password_hash
            })
        })
            .then(r => r.json())
            .then(updatedUser => onUpdateProfile(updatedUser))
        window.alert("Profile Updated")
        e.target.reset()
        onEditModalClose()
    }

    return (
        <div>
            <div className="formDiv">
                <form onSubmit={handleSubmit} >
                    <label className='formLabel' for="name"> Enter New First Name: </label>
                    <input className='formInput' onChange={handleChange} type="text" name="first_name" value={first_name} />
                    <label className='formLabel' for="last_name"> Enter New Last Name: </label>
                    <input className='formInput' onChange={handleChange} type="text" name="last_name" value={last_name} />
                    <label className='formLabel' for="user_name"> Enter New Username: </label>
                    <input className='formInput' onChange={handleChange} type="text" name="user_name" value={user_name} />
                    <label className='formLabel' for="email"> Enter New Email: </label>
                    <input className='formInput' onChange={handleChange} type="text" name="email" value={email}/>
                    <label className='formLabel' for="picture"> Enter New Profile Picture URL: </label>
                    <input className='formInput' onChange={handleChange} type="text" name="picture" value={picture}/>
                    <label className='formLabel' for="password_hash"> Enter New Password: </label>
                    <input className='formInput' onChange={handleChange} type="text" name="password_hash" value={password_hash}/>
                    <button className="modal-button" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default ProfileEditForm