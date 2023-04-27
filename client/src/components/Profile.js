import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard"

function Profile({user, onLogout}) {

    if (!user) {
        return (
            <div>
                <h1>Please log in to view profile</h1>
            </div>
        )
    } 
    

    let renderReviews = user.reviews.map(review => <ReviewCard key={review.id} review={review}/>);

    return(
        <div>
            <h1>Full Name: {user.first_name} {user.last_name}</h1>
            <h1>Username: {user.user_name}</h1>
            <h1>Your Reviews:</h1>
            {renderReviews}
        </div>
    )
    
}

export default Profile;