import React, { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import Review from "./Review"

function ViewProfile() {
    const [viewUser, setViewUser] = useState("")

    const { id } = useParams()

    useEffect(() => {
        fetch(`/users/${id}`)
            .then(r => r.json())
            .then(setViewUser)
    }, [id])

    console.log(viewUser)

    let renderReviews = []

    if (viewUser !== ""){
        renderReviews = viewUser.reviews.map(review => <Review key={review.id} review={{...review, user: viewUser}}/>);
    } else {
        renderReviews = []
    }

    return (
        <div className='profile'>
            <h1 className='labelH1'>@{viewUser.user_name}</h1>
            <br/>
            <br/>
            <div className='container'>
                <div className='profileImg' >
                    <img src={viewUser.picture} alt={viewUser.user_name} className='pi'/>
                </div>
                <div className='text'>
                    <h1>Full Name: {viewUser.first_name} {viewUser.last_name}</h1>
                </div>
            </div>
            <br/>
            <br/>
            <h1 className='labelH1'>Reviews:</h1>
            <br/>
            <div className='reviewList'>
                {renderReviews}
            </div>
        </div>
    )
}

export default ViewProfile