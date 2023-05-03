import React, { useState, useEffect, useContext } from "react";
import SongCard from "./SongCard"
import { UserContext } from "../context/user";

function Songs({addReviewToState}) {
    
    const { user, setUser } = useContext(UserContext);

    const [songs, setSongs] = useState([]);

    useEffect(() => {
        fetch("/songs")
        .then((r) => r.json())
        .then(setSongs);
    }, []);

    const addReviewFromUserState = (newReview) => {
        const userCopy = {...user}
        const reviewsCopy = [...user.reviews, newReview]
        userCopy.reviews = reviewsCopy
        setUser(userCopy)
    }

    let songCards = songs.map((song) => <SongCard key={song.id} addReviewToState={addReviewToState} user={user} song={song} addReviewFromUserState={addReviewFromUserState} />);

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