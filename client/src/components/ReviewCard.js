import React, { useState, useEffect } from "react";

function ReviewCard ({review, removeReviewFromState, removeReviewFromUserState}) {
    
    const handleDeleteClick = (id) => {
        fetch(`/reviews/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(r => r.json())
            .then(() => {
                removeReviewFromState(id)
                removeReviewFromUserState(review.id)
            })
        window.alert("Review deleted successfully");
    }

    return (
        <div className='reviewCard'>
            <img src={review.album.image} alt={review.album.title} />
            <h3>Album: {review.album.title} by {review.album.artist}</h3>
            <h2>Rating: {review.rating}</h2>
            <h2>Comment: {review.comment}</h2>
            <button className="button" onClick = {()=> handleDeleteClick(review.id)}>DELETE REVIEW</button>
        </div>
        
    )
}

export default ReviewCard