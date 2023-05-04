import React from 'react'

function Review({review}) {
    /* add functionality for not having a comment*/

    return (
        <div className='reviewCard'>
            <img src={review.album.image} alt={review.album.title} />
            <h3>Album: {review.album.title} by {review.album.artist}</h3>
            <h3>Review by: {review.user.user_name}</h3>
            <h2>Rating: {review.rating}</h2>
            <h2>Comment: {review.comment}</h2>
        </div>
    )
}

export default Review