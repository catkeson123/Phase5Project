import React, { useState } from "react";

function Reviews({reviews}) {
    return (
        <div>
            <div className='reviewList'>
                {reviews}
            </div>
        </div>
    )
}

export default Reviews