import React, {useState, useEffect, useContext} from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { UserContext } from "../context/user";

function Review({review}) {

    const { user, setUser } = useContext(UserContext);
    const[currReview, setCurrReview] = useState(review)
    const[liked, setLiked] = useState(false)

    const { id } = useParams()

    useEffect(() => {
        fetch(`/checklike/${review.id}`)
        .then((res) => {
            if (res.ok) {
                res.json().then((r) => {
                    setLiked(r.liked)
                })
            }
        })
    }, [review.id, user])

    const updateReview = (rev) => {
        setCurrReview(rev)
    }

    const handleLikeClick = () => {
        if (liked) {
            fetch(`/unlike/${review.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            })
            .then(r => r.json)
            .then(() => {
                setLiked(false)
            })
        } else {
            fetch(`/like/${review.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            })
            .then(r => r.json)
            .then(() => {
                setLiked(true)
            })
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
                        <button onClick={ handleLikeClick } className={liked ? "likeButton-active": "likeButton"}>{liked ? '☹' : '☺'}</button>
                        <h4 className='like'>{review.likes} {review.likes == 1 ? 'like' : 'likes'}</h4>
                    </div>
                    
                </div>      
            </div>
        </div>
    )
}

export default Review