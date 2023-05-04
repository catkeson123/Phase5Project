import React, { useState } from 'react';

function AddNewReview({addReviewToState, user, album, addReviewFromUserState}) {

    const [newRating, setNewRating] = useState('')
    const [newComment, setNewComment] = useState('')

    const handleSubmit = e => {
        e.preventDefault()

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
    }

    return (
        <div>
            <div className="formDiv">
                <form onSubmit={handleSubmit}>
                    <label for="rating"> Enter your rating: </label>
                    <input onChange={(e) => setNewRating(parseInt(e.target.value))} type="number" min='1' max='5' name="rating" />
                    <label for="comment"> Enter your comment: </label>
                    <input onChange={(e) => setNewComment(e.target.value)} type="text" name="comment" placeholder="Optional"/>
                    <button className="button" type="submit">Submit New Review</button>
                </form>
            </div>
        </div>

    )
}

export default AddNewReview