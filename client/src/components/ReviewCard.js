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

    let showComment = false

    if (review.comment == null){
        showComment = true
    } else if (review.comment === ''){
        showComment = true
    }

    return (
        <div className='reviewCard'>
            <div className='container'>
                <div className='profileImg' >
                    <img src={review.album.image} alt={review.album.title} className='reviewImg'/>
                </div>
                <div className='text'>
                    <h3>Album: {review.album.title} by {review.album.artist}</h3>
                    <h1>Rating: {review.rating}</h1>
                    <h3>{showComment ? '' : `"${review.comment}"`}</h3>
                    <h4>Likes: {review.likes}</h4>
                    <button className="button" onClick = {() =>{if(window.confirm('Are you sure you wish to delete this review?')) handleDeleteClick(review.id)}}>DELETE REVIEW</button>
                </div>
            </div>
        </div>
        
    )
}

export default ReviewCard