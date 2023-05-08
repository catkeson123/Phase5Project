import React, { useState, useEffect, useContext } from "react";
import AlbumCard from "./AlbumCard"
import { UserContext } from "../context/user";

function Albums({addReviewToState}) {
    
    const { user, setUser } = useContext(UserContext);

    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        fetch("/albums")
        .then((r) => r.json())
        .then(setAlbums);
    }, []);

    const addReviewFromUserState = (newReview) => {
        const userCopy = {...user}
        const reviewsCopy = [...user.reviews, newReview]
        userCopy.reviews = reviewsCopy
        setUser(userCopy)
    }

    let albumCards = albums.map((album) => <AlbumCard key={album.id} addReviewToState={addReviewToState} user={user} album={album} addReviewFromUserState={addReviewFromUserState} />);

    return (
        <div className='profile'>
            <h1 className='labelH1'>Available Albums:</h1>
            <div className="albumList">
                {albumCards}
            </div>
        </div>
    )
}

export default Albums