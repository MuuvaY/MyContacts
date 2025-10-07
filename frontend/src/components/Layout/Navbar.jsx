import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../css/Layout/navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <Link to="/" className="navbar-logo">
            📱 MyContacts
          </Link>

          {user && (
            <div className="navbar-links">
              <Link to="/" className="navbar-link">
                Contacts
              </Link>
              <Link to="/profile" className="navbar-link">
                Profil
              </Link>

              <div className="navbar-user">
                <span className="navbar-greeting">
                  Bonjour, {user.firstName} !
                </span>
                <button onClick={handleLogout} className="navbar-logout">
                  Déconnexion
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
