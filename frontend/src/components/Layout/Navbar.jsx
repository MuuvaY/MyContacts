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

  console.log("User dans Navbar:", user);
  console.log("Type de user:", typeof user);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <Link to="/" className="navbar-logo">
            MyContacts
          </Link>
          {user ? (
            <button onClick={handleLogout} className="navbar-logout">
              Déconnexion
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
