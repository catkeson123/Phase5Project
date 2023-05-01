import React, { useState } from "react";

function Songs({songCards}) {
    return (
        <div>
            <div className="songList">
                {songCards}
            </div>
        </div>
    )
}

export default Songs