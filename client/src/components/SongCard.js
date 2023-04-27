import React from 'react'

function SongCard({song}) {
    /* add functionality for if there is no album */

    return (
        <div>
            <h3>Title: {song.title}</h3>
            <h3>Artist: {song.artist}</h3>
        </div>
    )
}

export default SongCard