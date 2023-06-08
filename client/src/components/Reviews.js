import React, {useContext, useEffect } from "react";
import { UserContext } from "../context/user";
import Review from './Review'
import { ReviewsContext } from "../context/reviews"


function Reviews() {
    const { user, fetchUser } = useContext(UserContext);

    const {reviews, setReviews} = useContext(ReviewsContext)

    useEffect( () => {
        fetch("/reviews").then((response) => {
            response.json().then((reviews) => {
              console.log(reviews);
              setReviews(reviews)});
        });
    }, [setReviews, fetchUser])

    useEffect ( () => {
        fetchUser()
    }, [])
    
    if (!user) {
        return (
            <div className='home'>
                <h1>Please log in to view reviews</h1>
            </div>
        )
    } 

    console.log(user)

    let followed_ids = user.followed.map(u => u['id'])  

    let followedReviews = reviews.filter((r) => {
        return followed_ids.includes(r.user_id)
    })

    let displayReviews = followedReviews.map((review) => <Review key={review.id} review={review} />);

    console.log(followedReviews)

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