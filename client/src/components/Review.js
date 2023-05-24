import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'

function Review({review}) {

    const[currReview, setCurrReview] = useState(review)

    const updateReview = (rev) => {
        setCurrReview(rev)
    }

    const handleLikeClick = () => {
            fetch(`/reviews/${review.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: currReview.user_id,
                    album_id: currReview.album_id,
                    rating: currReview.rating,
                    comment: currReview.comment,
                    likes: currReview.likes + 1,
                })
            })
                .then(r => r.json())
                .then(rev => updateReview(rev))
        }

    const handleDislikeClick = () => {
        if (currReview.likes > 0) {
            fetch(`/reviews/${review.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: currReview.user_id,
                    album_id: currReview.album_id,
                    rating: currReview.rating,
                    comment: currReview.comment,
                    likes: currReview.likes - 1,
                })
            })
                .then(r => r.json())
                .then(rev => updateReview(rev))
        }
    }
    
    let showComment = false

    if (currReview.comment == null){
        showComment = true
    } else if (currReview.comment === ''){
        showComment = true
    }

    return (
        <div className='reviewCard'>
            <div className='container'>
                <div className='profileImg' >
                    <img src={currReview.album.image} alt={currReview.album.title} className='reviewImg' />
                </div>
                <div className='text'>
                    <h2>{currReview.album.title} by {currReview.album.artist}</h2>
                    <NavLink exact to={`/users/${review.user_id}`} className='button'>Review by: {currReview.user.user_name}</NavLink>
                    <h1>Rating: {currReview.rating}</h1>
                    <h3>{showComment ? '' : `"${currReview.comment}"`}</h3>
                    <div className='likeDiv'>
                        <button onClick={ handleLikeClick } className="likeButton">☺</button>
                        <button onClick={ handleDislikeClick } className="likeButton">☹</button>
                        <h4 className='like'>{currReview.likes} {currReview.likes === 1 ? 'like' : 'likes'}</h4>
                    </div>
                    
                </div>      
            </div>
        </div>
    )
}

export default Review