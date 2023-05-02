import React, { useState } from "react";

function Songs({songCards}) {
    return (
        <div className='profile'>
            <h1>Available Songs:</h1>
            <div className="songList">
                {songCards}
            </div>
        </div>
    )
}

export default Songs