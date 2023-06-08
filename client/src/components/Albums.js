import React, { useState, useEffect, useContext } from "react";
import AlbumCard from "./AlbumCard"
import { UserContext } from "../context/user";
import Search from "./Search"
import { ReviewsContext } from "../context/reviews"

function Albums() {
    
    const { user, setUser } = useContext(UserContext);
    const {addReviewToState} = useContext(ReviewsContext)

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
    const [filterState, setFilterState] = useState("none")

    const sortMethods = {
        none: { method: (a, b) => null },
        title: { method: (a, b) => (a.title > b.title ? 1 : -1) },
        ascending: { method: (a, b) => (a.release > b.release ? 1 : -1) },
        descending: { method: (a, b) => (a.release > b.release ? -1 : 1) },
    };

    let filterAlbums = searchedAlbums.sort(sortMethods[sortState].method).filter((a) => {
        return a.genre === filterState
    } )

    if (filterState === 'none') {
        filterAlbums = searchedAlbums.sort(sortMethods[sortState].method)
    }

    let albumCards = filterAlbums.map((album) => <AlbumCard key={album.id} addReviewToState={addReviewToState} user={user} album={album} addReviewFromUserState={addReviewFromUserState}/>);
    
    return (
        <div className='profile'>
            <h1 className='labelH1'>Albums:</h1> 
            <br/>
            <br/>
            <div className='likeDiv'>
                <form>
                    <label htmlFor='filter' className="selectLabel">Genre:</label>
                    <select defaultValue={'DEFAULT'} onChange={(e) => setFilterState(e.target.value)} className="selectBox">
                        <option value="none">None</option>
                        <option value="Hard Rock">Hard Rock</option>
                        <option value="Soft Rock">Soft Rock</option>
                        <option value="Hip Hop">Hip Hop</option>
                        <option value="Pop">Pop</option>
                        <option value="Indie">Indie</option>
                        <option value="Country">Country</option>
                    </select>
                </form>
                <form>
                    <label htmlFor='filter' className="selectLabel">Sort By:</label>
                    <select defaultValue={'DEFAULT'} onChange={(e) => setSortState(e.target.value)} className="selectBox">
                        <option value="none">None</option>
                        <option value="title">Title</option>
                        <option value="ascending">Earliest Release</option>
                        <option value="descending">Latest Release</option>
                    </select>
                </form>
            </div>
            
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