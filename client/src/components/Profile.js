import React, { useState, useContext } from "react";
import ReviewCard from "./ReviewCard"
import { UserContext } from "../context/user";
import ProfileEditModal from './ProfileEditModal'
import { ReviewsContext } from "../context/reviews"

function Profile() {
    const { user, setUser } = useContext(UserContext);
    const { removeReviewFromState } = useContext(ReviewsContext)

    const [editModal, setEditModal] = useState(false)
    
    const onUpdateProfile = (updatedUser) => {
        setUser(updatedUser)
    }

    const onLogout = () => {setUser(null)}

    function handleLogout() {
        fetch("/logout", {
          method: "DELETE",
        }).then(() => onLogout());
    }

    const handleClick = () => {
        setEditModal(!editModal)
    }

    const onEditModalClose = () => {
        setEditModal(false)
    }

    const removeReviewFromUserState = (doomedReviewId) => {
        const userCopy = {...user}
        const reviewsCopy = user.reviews.filter((review) => {
            return review.id !== doomedReviewId
        })
        userCopy.reviews = reviewsCopy
        setUser(userCopy)
    }

    if (!user) {
        return (
            <div className='home'>
                <h1>Please log in to view profile</h1>
            </div>
        )
    } 

    let renderReviews = user.reviews.map(review => <ReviewCard key={review.id} review={review} removeReviewFromState={removeReviewFromState} removeReviewFromUserState={removeReviewFromUserState}/>);

    return(
        <div className='profile'>
            
            <div className='container'>
                <div className='profileImg' >
                    <img src={user.picture} alt={user.user_name} className='pi'/>
                </div>
                <div className='text'>                   
                    <h1>Full Name: {user.first_name} {user.last_name}</h1>
                </div>
            </div>
            <br/>
            <br/>
            <h1 className='unLabelH1'>@{user.user_name}</h1>
            <br/>
            <br/>
            <h1 className='labelH1'>Your Reviews:</h1>
            <br/>
            <div className='reviewList'>
                {renderReviews}
            </div>
            <button className="button" onClick={handleClick}>EDIT PROFILE</button>
            <ProfileEditModal editModal={editModal} onEditModalClose={onEditModalClose} user={user} onUpdateProfile={onUpdateProfile}/>
            <button className="button" onClick={() =>{if(window.confirm('Are you sure you wish to log out?')) handleLogout()}}>LOGOUT</button>
        </div>
    )
}

export default Profile;