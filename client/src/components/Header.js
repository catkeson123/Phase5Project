import React, { useState, useRef, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from "../context/user";

function Header({onLogout, user}) {
    function handleLogout() {
        fetch("/logout", {
          method: "DELETE",
        }).then(() => onLogout());
      }
    
    return (
        <header className='header'>
            <NavLink className="button" exact to="/">HOME</NavLink>
            <NavLink className="button" exact to="/songs">SONGS</NavLink>
            {user && <NavLink className="button" exact to="/profile">PROFILE</NavLink>}
            <button className="button" onClick={handleLogout}>LOGOUT</button>
        </header>
    )
}

export default Header;