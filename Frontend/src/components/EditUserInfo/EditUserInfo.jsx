import React, { useState } from "react";
import "../EditUserInfo/EditUserInfo.scss";
import { useDispatch, useSelector } from "react-redux";
import { editUserProfile, clearForm } from "../../Redux/userSlice";
export default function EditUserName({ setEdit }) {
  const UserNameProfile = useSelector((state) => state.user.profile.userName);
  const firstName = useSelector((state) => state.user.profile.firstName);
  const lastName = useSelector((state) => state.user.profile.lastName);



  const [newUserName, setNewUserName] = useState(UserNameProfile);
  const dispatch = useDispatch();

  // Sauvegarder les modifications
  async function onSave(e) {
    e.preventDefault();
    try {
      
    
      const userData = {userName: newUserName }
      const response = await dispatch(editUserProfile(userData));
      if (response.payload) {
        setEdit(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

  // Réinitialiser le formulaire
  function cancel(e) {
    e.preventDefault();
    dispatch(clearForm()); // Réinitialiser les champs du formulaire
    setEdit(false);
  }

  return (
    <>
      <h2>Edit user info</h2>

      <form className="form-EditUserInfo">
        
        <div className="input-edit">
          <label htmlFor="userName">User name : </label>
          <input
            type="text"
            id="userName"
           onChange={(e) => setNewUserName(e.target.value)}
            value={newUserName}
            required
          />
        </div>
        <div className="input-edit">
          <label htmlFor="firstname">First name : </label>
          <input type="text" id="firstname" disabled placeholder={firstName} />
        </div>
        <div className="input-edit">
          <label htmlFor="lastname">Last name : </label>
          <input type="text" id="lastname" disabled placeholder={lastName} />
        </div>

        <div className="edit-btn">
          <button onClick={onSave}>Save</button>
          <button onClick={cancel}>Cancel</button>
        </div>
      </form>
    </>
  );
}

