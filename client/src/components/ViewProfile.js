import React, { useState, useEffect, useContext } from "react";
import { useParams} from "react-router-dom";
import Review from "./Review"
import { UserContext } from "../context/user";


function ViewProfile() {
    const { user, setUser } = useContext(UserContext);

    const [viewUser, setViewUser] = useState("")

    const [following, setFollowing] = useState(false)

    const { id } = useParams()

    useEffect(() => {
        fetch(`/users/${id}`)
            .then(r => r.json())
            .then(setViewUser)
    }, [id])

    useEffect(() => {
        fetch(`/check/${id}`)
        .then((res) => {
            if (res.ok) {
                res.json().then((r) => {
                    setFollowing(r.following)
                })
            }
        })
    }, [id, user])

    let renderReviews = []

    if (viewUser !== ""){
        renderReviews = viewUser.reviews.map(review => <Review key={review.id} review={{...review, user: viewUser}}/>);
    } else {
        renderReviews = []
    }
    
    const handleFollowClick = () => {
        if (following) {
            fetch(`/unfollow/${viewUser.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            })
            .then(r => r.json)
            .then(() => {
                setFollowing(false)
            })
        } else {
            fetch(`/follow/${viewUser.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            })
            .then(r => r.json)
            .then(() => {
                setFollowing(true)
            })
        }
    }

    return (
        <div className='profile'>
            <div className='container'>
                <div className='profileImg' >
                    <img src={viewUser.picture} alt={viewUser.user_name} className='pi'/>
                </div>
                <div className='text'>
                    <h1>Full Name: {viewUser.first_name} {viewUser.last_name}</h1>
                    <button className='button' onClick={handleFollowClick}>{following ? 'Unfollow' : 'Follow'}</button>
                </div>
            </div>
            <br/>
            <br/>
            <h1 className='unLabelH1'>@{viewUser.user_name}</h1>
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