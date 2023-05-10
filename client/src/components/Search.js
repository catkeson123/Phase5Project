import React from "react";

function Search({ updateSearch }) {
    return (
    <div className="search-box">
        <button className="btn-search"><i class="fa fa-search"></i></button>
        <input type="text" className="input-search" placeholder="Search albums by title..." onChange={(e) => updateSearch(e.target.value)} />
    </div>
    );
  }
  
export default Search;

