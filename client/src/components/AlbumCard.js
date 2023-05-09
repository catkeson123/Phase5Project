import React, {useState} from 'react'
import AddNewReview from './AddNewReview'
import NewReviewModal from './NewReviewModal'

function AlbumCard({album, addReviewToState, user, addReviewFromUserState}) {
    const [showModal, setShowModal] = useState(false)
    
    const onModalClose = () => {
        setShowModal(false)
    }

    const handleClick = () => {
        setShowModal(true)
        console.log(album)
    }

    return (
        <div className="albumCard">
            <NewReviewModal showModal={showModal} onModalClose={onModalClose} addReviewToState={addReviewToState} addReviewFromUserState={addReviewFromUserState} user={user} album={album}/>
            <div className='container'>
                <div className='profileImg' >
                    <img src={album.image} alt={album.title} className='albumImg' />
                </div>
                <div className='text'>
                    <h2>{album.title}</h2>
                    <h3>Artist: {album.artist}</h3>
                    <h3>Released: {album.release}</h3>
                    {user ? <button className='button' onClick={handleClick}>Review Album</button> : <div></div>}
                </div>
            </div>
               
        </div>
    )
}

export default AlbumCard