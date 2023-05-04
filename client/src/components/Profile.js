import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard"
import ProfileEditForm from "./ProfileEditForm";
import { UserContext } from "../context/user";

function Profile({removeReviewFromState}) {
    const { user, setUser } = useContext(UserContext);

    const [editForm, setEditForm] = useState(false)
    
    const onUpdateProfile = (updatedUser) => {
        setUser(updatedUser)
    }

    const onLogout = () => {setUser(null)}

    function handleLogout() {
        fetch("/logout", {
          method: "DELETE",
        }).then(() => onLogout());
    }

    const handleClick = () => {
        setEditForm(!editForm)
    }

    const removeReviewFromUserState = (doomedReviewId) => {
        const userCopy = {...user}
        const reviewsCopy = user.reviews.filter((review) => {
            return review.id !== doomedReviewId
        })
        userCopy.reviews = reviewsCopy
        setUser(userCopy)
    }

    if (!user) {
        return (
            <div>
                <h1>Please log in to view profile</h1>
            </div>
        )
    } 

    let renderReviews = user.reviews.map(review => <ReviewCard key={review.id} review={review} removeReviewFromState={removeReviewFromState} removeReviewFromUserState={removeReviewFromUserState}/>);

    return(
        <div className='profile'>
            <img src={user.picture} alt={user.user_name} />
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