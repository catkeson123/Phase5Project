import React, { useState } from 'react';

function AddNewReview({addReviewToState, user, album, addReviewFromUserState, onModalClose}) {

    const [newRating, setNewRating] = useState('')
    const [newComment, setNewComment] = useState('')

    const handleSubmit = e => {
        e.preventDefault()

        console.log(album)

        const newReview = {
            user_id: user.id,
            album_id: album.id,
            user: user,
            album: album,
            rating: newRating,
            comment: newComment
        }

        function handleErrors(response) {
            if (!response.ok) {
                window.alert("Error: Ensure all fields are valid");
                throw Error(response.statusText)
            } else if (newReview.user_id == null) {
                window.alert("Error: Ensure all fields are valid");
                throw Error(response.statusText)
            } else if (newReview.album_id == null) {
                window.alert("Error: Ensure all fields are valid");
                throw Error(response.statusText)
            }
            return response.json();
        }

        fetch('/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newReview)
        })
            .then(handleErrors)
            .then(() => {
                addReviewToState(newReview)
                addReviewFromUserState(newReview)
            })
            .catch(error => console.error("Validation Error: Ensure all fields are valid.", error))
        window.alert("Review Created")
        e.target.reset()
        onModalClose()
    }

    return (
        <div>
            <div className="formDiv">
                <form onSubmit={handleSubmit}>
                    <label className="formLabel" htmlFor="rating"> Enter your rating: </label>
                    <input className='formInput' onChange={(e) => setNewRating(parseInt(e.target.value))} type="number" min='1' max='5' name="rating" />
                    <label className="formLabel" htmlFor="comment"> Enter your comment: </label>
                    <textarea className='formInput' onChange={(e) => setNewComment(e.target.value)} type="text" name="comment" placeholder="Optional"/>
                    <button className="modal-button" type="submit">Submit New Review</button>
                </form>
            </div>
        </div>

    )
}

export default AddNewReview