import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard"
import ProfileEditForm from "./ProfileEditForm";

function Profile({user, onLogout, removeReviewFromState, setUser}) {
    const [editForm, setEditForm] = useState(false)
    
    const onUpdateProfile = (updatedUser) => {
        setUser(updatedUser)
    }

    function handleLogout() {
        fetch("/logout", {
          method: "DELETE",
        }).then(() => onLogout());
    }

    const handleClick = () => {
        setEditForm(!editForm)
    }

    if (!user) {
        return (
            <div>
                <h1>Please log in to view profile</h1>
            </div>
        )
    } 

    let renderReviews = user.reviews.map(review => <ReviewCard key={review.id} review={review} removeReviewFromState={removeReviewFromState}/>);

    return(
        <div className='profile'>
            <h1>Full Name: {user.first_name} {user.last_name}</h1>
            <h1>Username: {user.user_name}</h1>
            <h1>Your Reviews:</h1>
            <div className='reviewList'>
                {renderReviews}
            </div>
            <button className="button" onClick={handleClick}>EDIT PROFILE</button>
            {editForm? <ProfileEditForm onUpdateProfile={onUpdateProfile} user={user}/> : <div></div>}
            <button className="button" onClick={handleLogout}>LOGOUT</button>
        </div>
    )
}

export default Profile;