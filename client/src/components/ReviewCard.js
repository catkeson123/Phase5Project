import React, { useState, useEffect } from "react";

function ReviewCard ({review}) {
    return (
        <div>
            <h3>Song: {review.song.title} by {review.song.artist}</h3>
            <h4>Rating: {review.rating}</h4>
            <h4>Comment: {review.comment}</h4>
        </div>
        
    )
}

export default ReviewCard