import React, { useState, useEffect, useContext } from "react";
import AlbumCard from "./AlbumCard"
import { UserContext } from "../context/user";
import Search from "./Search"

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

    const [searchTerm, setSearchTerm] = useState("");

    const updateSearch = (newString) => setSearchTerm(newString.toLowerCase());

    const searchedAlbums = albums.filter((album) => {
        return album.title.toLowerCase().includes(searchTerm);
    });

    const [sortState, setSortState] = useState("none");

    const sortMethods = {
        none: { method: (a, b) => null },
        title: { method: (a, b) => (a.title > b.title ? 1 : -1) },
        ascending: { method: (a, b) => (a.release > b.release ? 1 : -1) },
        descending: { method: (a, b) => (a.release > b.release ? -1 : 1) },
    };

    let albumCards = searchedAlbums.sort(sortMethods[sortState].method).map((album) => <AlbumCard key={album.id} addReviewToState={addReviewToState} user={user} album={album} addReviewFromUserState={addReviewFromUserState}/>);
    
    return (
        <div className='profile'>
            <h1 className='labelH1'>Available Albums:</h1> 
            <br/>
            <br/>
            <form>
                <label for='filter' className="selectLabel">Filter By:</label>
                <select defaultValue={'DEFAULT'} onChange={(e) => setSortState(e.target.value)} className="selectBox">
                    <option value="none">None</option>
                    <option value="title">Title</option>
                    <option value="ascending">Earliest Release</option>
                    <option value="descending">Latest Release</option>
                    <option value="none" className='genre' disabled>GENRES:</option>
                </select>
            </form>
            <br/>
            <br/>
            <Search updateSearch={updateSearch} />
            <br/>
            <br/>
            <div className="albumList">
                {albumCards}
            </div>
        </div>
    )
}

export default Albums