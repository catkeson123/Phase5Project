import React, { useState, useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/user";
import gif from "../music.gif";

function Header() {
  const { user, setUser } = useContext(UserContext);

  const onLogout = () => {
    setUser(null);
  };

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => onLogout());
  }

  return (
    <header className="header">
      <NavLink exact to="/">
        <img src={gif} alt="icon" className="icon" />
      </NavLink>
      <NavLink className="button" exact to="/albums">
        ALBUMS
      </NavLink>
      {user && (
        <NavLink className="button" exact to="/reviews">
          FEED
        </NavLink>
      )}
      {user && (
        <NavLink className="button" exact to="/users">
          USERS
        </NavLink>
      )}
      {user && (
        <NavLink className="button" exact to="/profile">
          PROFILE
        </NavLink>
      )}
      {user && (
        <button className="button" onClick={handleLogout}>
          LOGOUT
        </button>
      )}
    </header>
  );
}

export default Header;
