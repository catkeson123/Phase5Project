import React from 'react';
import SignUp from './SignUp'

function SignUpModal({sign, onSignModalClose, onLogin}) {

    return (
        <div className={`modal ${sign ? 'show' :  ''}`} onClick={onSignModalClose}>
            <div className='modal-content' onClick={e => e.stopPropagation()}>
                <div className='modal-header'>
                    <h4 className='modal-title'>SIGN UP:</h4>
                </div>
                <div className='modal-body'>
                    <SignUp onLogin={onLogin} onSignModalClose={onSignModalClose} />
                </div>
                <div className='modal-footer'>
                    <button onClick = {onSignModalClose} className='modal-button'>Close</button>
                </div>
            </div>
        </div>
    )
}

export default SignUpModal