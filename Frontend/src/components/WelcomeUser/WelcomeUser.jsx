import React, { useState } from "react";
import '../WelcomeUser/WelcomeUser.scss';
import EditUserName from '../EditUserInfo/EditUserInfo';
import { useSelector } from "react-redux";



function User() {
    const [editName, setEditName] = useState (false);
    const firstName = useSelector ((state) => state.user.profile.firstName);
    const lastName = useSelector ((state) =>state.user.profile.lastName);
    
    return (
        <div className ="header">
        {editName ? (
            <EditUserName setEdit= {setEditName}/>
        ) : (
            <>
                <h1>Welcome back<br />{firstName} {lastName}!</h1>
                <button className="edit-button" 
                onClick={() => setEditName (true)}>Edit Name</button>
            </>
            )}
        </div>
        
    )
}

export default User;