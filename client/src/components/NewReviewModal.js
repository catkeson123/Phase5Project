import React from 'react';
import AddNewReview from './AddNewReview'

function NewReviewModal({showModal, onModalClose, addReviewToState, addReviewFromUserState, user, album}) {

    return (
        <div className={`modal ${showModal ? 'show' :  ''}`} onClick={onModalClose}>
            <div className='modal-content' onClick={e => e.stopPropagation()}>
                <div className='modal-header'>
                    <h4 className='modal-title'>Reviewing {album.title} by {album.artist}</h4>
                </div>
                <div className='modal-body'>
                    <AddNewReview addReviewToState={addReviewToState} addReviewFromUserState={addReviewFromUserState} user={user} album={album} onModalClose={onModalClose} />
                </div>
                <div className='modal-footer'>
                    <button onClick = {onModalClose} className='modal-button'>Close</button>
                </div>
            </div>
        </div>
    )
}

export default NewReviewModal