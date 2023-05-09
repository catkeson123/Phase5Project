import React from 'react';
import Login from './Login'

function NewReviewModal({log, onLogModalClose, onLogin}) {

    return (
        <div className={`modal ${log ? 'show' :  ''}`} onClick={onLogModalClose}>
            <div className='modal-content' onClick={e => e.stopPropagation()}>
                <div className='modal-header'>
                    <h4 className='modal-title'>LOG IN:</h4>
                </div>
                <div className='modal-body'>
                <Login onLogin={onLogin} onLogModalClose={onLogModalClose}/>
                </div>
                <div className='modal-footer'>
                    <button onClick = {onLogModalClose} className='modal-button'>Close</button>
                </div>
            </div>
        </div>
    )
}

export default NewReviewModal