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
            <h2>Song: {review.song.title} by {review.song.artist}</h2>
            <h3>Rating: {review.rating}</h3>
            <h3>Comment: {review.comment}</h3>
            <button className="button" onClick = {()=> handleDeleteClick(review.id)}>DELETE REVIEW</button>
        </div>
        
    )
}

export default ReviewCard