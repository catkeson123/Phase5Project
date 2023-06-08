import React, {useState, useEffect, useContext} from 'react'
import { NavLink} from 'react-router-dom'
import { UserContext } from "../context/user";

function Review({review}) {

    const { user} = useContext(UserContext);
    const[currReview, setCurrReview] = useState(review)
    const[liked, setLiked] = useState(false)

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

    const handleLikeClick = () => {
        if (liked) {
            fetch(`/unlike/${review.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            })
            .then(r => r.json)
            .then(() => {
                setLiked(false)
                setCurrReview({...currReview, likes: currReview.likes - 1})
            })
        } else {
            fetch(`/like/${review.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            })
            .then(r => r.json)
            .then(() => {
                setLiked(true)
                setCurrReview({...currReview, likes: currReview.likes + 1})
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
                    <NavLink exact to={`/users/${currReview.user_id}`} className='button'>Review by: {currReview.user.user_name}</NavLink>
                    <h1>Rating: {currReview.rating}</h1>
                    <h3>{showComment ? '' : `"${currReview.comment}"`}</h3>
                    <div className='likeDiv'>
                        <button onClick={ handleLikeClick } className={liked ? "likeButton-active": "likeButton"}>☺</button>
                        <h4 className='like'>{currReview.likes} {currReview.likes === 1 ? 'like' : 'likes'}</h4>
                    </div>
                    
                </div>      
            </div>
        </div>
    )
}

export default Review