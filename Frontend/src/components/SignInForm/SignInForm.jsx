import React, { useState } from "react";
import "../SignInForm/SignInForm.scss";
import { useDispatch } from "react-redux";
import { loginUser, getUser } from "../../Redux/userSlice";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
    const [email, setEmail] = useState(localStorage.getItem("email") || "");
    const [password, setPassword] = useState(localStorage.getItem("password") || "");
    const [rememberMe, setRememberMe] = useState(false);
    const [errorLoginMessage, setErrorLoginMessage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Gestion des champs du formulaire
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRememberMeChange = (e) => {
        setRememberMe(e.target.checked);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            // Étape 1 : Envoyer les identifiants pour obtenir le token
            const credentials = { email, password, rememberMe };
            const resultAction = await dispatch(loginUser(credentials)); // Appel à l'action loginUser
            
            if (loginUser.fulfilled.match(resultAction)) {
                console.log("Connexion réussie:", resultAction.payload);
                const token = resultAction.payload.body.token;
            

        //2. Appeler getUser pour récupérer les informations utilisateur
               
        const getUserResponse = await dispatch(getUser(token));
                
                if (getUser.fulfilled.match(getUserResponse)) {
                    console.log ()
                    navigate("/userPage");
                } else {
                    setErrorLoginMessage("Failed to retrieve user data. Please try again.");
                }
            } else {
                setErrorLoginMessage("Invalid email or password. Please try again.");
            }
        } catch (error) {
            console.error("Erreur lors de la soumission :", error);
            setErrorLoginMessage("An error occurred. Please try again.");
        }
    };

    return (
        <form onSubmit={handleFormSubmit} className="loginForm">
            <div className="input-wrapper">
                <label htmlFor="userName">UserName</label>
                <input
                    type="text"
                    id="userName"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
            </div>
            <div className="input-remember">
                <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                />
                <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="submit-button">Sign In</button>
            {errorLoginMessage && <p className="error-message">{errorLoginMessage}</p>}
        </form>
    );
};

export default SignInForm;
