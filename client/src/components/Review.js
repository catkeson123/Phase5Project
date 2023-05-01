import React from 'react'

function Review({review}) {
    /* add functionality for not having a comment*/

    return (
        <div className='reviewCard'>
            <h3>Song: {review.song.title} by {review.song.artist}</h3>
            <h3>Review by: {review.user.user_name}</h3>
            <h3>Rating: {review.rating}</h3>
            <h3>Comment: {review.comment}</h3>
        </div>
    )
}

export default Review