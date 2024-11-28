import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) =>{
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    
    // Redirigé vers la page d'accueil si l'utilisateur n'est pas authentifié
    if (!isAuthenticated){
        return <Navigate to= "/" />;
    }

    return children; // Rends le contenu si l'utilisateur est authentifié
};

export default PrivateRoute