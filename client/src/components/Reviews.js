import React, { useState, useContext } from "react";
import { UserContext } from "../context/user";
import Review from './Review'

function Reviews({reviews}) {
    const { user, setUser } = useContext(UserContext);
    
    if (!user) {
        return (
            <div className='home'>
                <h1>Please log in to view reviews</h1>
            </div>
        )
    } 

    let followed_ids = user.followed.map(u => u['id'])  

    let followedReviews = reviews.filter((r) => {
        return followed_ids.includes(r.user_id)
    })

    let displayReviews = followedReviews.map((review) => <Review key={review.id} review={review} />);

    return (
        <div className='profile'>
            <h1 className='labelH1'>Reviews:</h1>
            <br/>
            <div className='reviewList'>
                {displayReviews}
            </div>
        </div>
    )
}

export default Reviews