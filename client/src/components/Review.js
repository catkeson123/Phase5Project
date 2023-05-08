import React from 'react'

function Review({review}) {
    /* add functionality for not having a comment*/

    return (
        <div className='reviewCard'>
            <div className='container'>
                <div className='profileImg' >
                    <img src={review.album.image} alt={review.album.title} className='reviewImg' />
                </div>
                <div className='text'>
                    <h3>Album: {review.album.title} by {review.album.artist}</h3>
                    <h3>Review by: {review.user.user_name}</h3>
                    <h1>Rating: {review.rating}</h1>
                    <h3>Comment: {review.comment}</h3>
                </div>
            </div>
        </div>
    )
}

export default Review