import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Profile() {

    const [user, setUser] = useState("")

    const { id } = useParams()

    useEffect(() => {
        fetch(`/users/${id}`)
            .then(r => r.json())
            .then(setUser)
    }, [id])

    return(
        <div>
            <h1>{user.first_name}</h1>
            <h1>{user.last_name}</h1>
            <h1>{user.user_name}</h1>
        </div>
    )
}

export default Profile;