import React from 'react';
import ProfileEditForm from './ProfileEditForm'

function ProfileEditModal({editModal, onEditModalClose, user, onUpdateProfile}) {

    return (
        <div className={`modal ${editModal ? 'show' :  ''}`} onClick={onEditModalClose}>
            <div className='modal-content' onClick={e => e.stopPropagation()}>
                <div className='modal-header'>
                    <h4 className='modal-title'>EDIT PROFILE:</h4>
                </div>
                <div className='modal-body'>
                    <ProfileEditForm onEditModalClose={onEditModalClose} user={user} onUpdateProfile={onUpdateProfile}/>
                </div>
                <div className='modal-footer'>
                    <button onClick = {onEditModalClose} className='modal-button'>Close</button>
                </div>
            </div>
        </div>
    )
}

export default ProfileEditModal