import React, {useState} from 'react'
import AddNewReview from './AddNewReview'

function SongCard({song, addReviewToState, user, addReviewFromUserState}) {
    /* add functionality for if there is no album */
    const [createForm, setCreateForm] = useState(false)

    const handleClick = () => {
        setCreateForm(!createForm)
    }

    return (
        <div className="songCard">
            <h3>Title: {song.title}</h3>
            <h3>Artist: {song.artist}</h3>
            <button onClick={handleClick}>Click to Review Song</button>
            {createForm && user ? <AddNewReview addReviewToState={addReviewToState} addReviewFromUserState={addReviewFromUserState} user={user} song={song} /> : <div></div>}
        </div>
    )
}

export default SongCard