import React, {useState} from 'react'
import AddNewReview from './AddNewReview'

function AlbumCard({album, addReviewToState, user, addReviewFromUserState}) {
    const [createForm, setCreateForm] = useState(false)

    const handleClick = () => {
        setCreateForm(!createForm)
    }

    return (
        <div className="albumCard">
            <img src={album.image} alt={album.title} />
            <h2>{album.title}</h2>
            <h3>Artist: {album.artist}</h3>
            <h3>Released: {album.release}</h3>
            <button className='button' onClick={handleClick}>Click to Review Album</button>
            {createForm && user ? <AddNewReview addReviewToState={addReviewToState} addReviewFromUserState={addReviewFromUserState} user={user} album={album} /> : <div></div>}
        </div>
    )
}

export default AlbumCard