import React, { useState } from "react";

function Reviews({reviews}) {
    return (
        <div className='profile'>
            <h1>Reviews:</h1>
            <div className='reviewList'>
                {reviews}
            </div>
        </div>
    )
}

export default Reviews