import React, { useState, useContext } from "react";
import { UserContext } from "../context/user";

function Reviews({reviews}) {
    const { user, setUser } = useContext(UserContext);
    if (!user) {
        return (
            <div className='home'>
                <h1>Please log in to view reviews</h1>
            </div>
        )
    } 
    return (
        <div className='profile'>
            <h1 className='labelH1'>Reviews:</h1>
            <br/>
            <div className='reviewList'>
                {reviews}
            </div>
        </div>
    )
}

export default Reviews