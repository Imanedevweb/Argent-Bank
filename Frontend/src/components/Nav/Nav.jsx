import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser, getUser } from "../../Redux/userSlice";
import logo from "../../Assets/images/argentBankLogo.webp";
import "../Nav/Nav.scss";

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.user?.isAuthenticated);
  const userName = useSelector((state) => state.user.profile?.userName); // Protection contre undefined
  const token = localStorage.getItem("token");

  // Vérifie l'état de connexion et récupère l'utilisateur si un token est présent
  useEffect(() => {
    if (!isAuthenticated && token) {
      dispatch(getUser(token));
    }

  }, [isAuthenticated, token, dispatch, navigate]);

  // Gère la déconnexion
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/"); // Redirige vers la page d'accueil après déconnexion
  };

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      <div>
        {isAuthenticated ? (
          <>
            <Link to="/UserPage" className="main-nav-item">
              <i className="fa fa-user-circle"></i> {userName || "User"}
            </Link>
            <Link to="/" className="main-nav-item" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i> Sign Out
            </Link>
          </>
        ) : (
          <Link to="/sign-in" className="main-nav-item">
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
