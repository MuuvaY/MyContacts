import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../css/Auth/register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const result = await register(formData);

    if (result.success) {
      setSuccess(result.message);
      setTimeout(() => navigate("/login"), 2000);
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2 className="register-title">Inscription</h2>

        {error && <div className="register-error">{error}</div>}

        {success && <div className="register-success">{success}</div>}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="register-group">
            <label>Prénom</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Jean"
            />
          </div>

          <div className="register-group">
            <label>Nom</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Dupont"
            />
          </div>

          <div className="register-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="votre@email.com"
            />
          </div>

          <div className="register-group">
            <label>Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
          </div>

          <button type="submit" disabled={loading} className="register-button">
            {loading ? "Inscription..." : "S'inscrire"}
          </button>
        </form>

        <p className="login-link">
          Déjà un compte ?{" "}
          <Link to="/login" className="login-link-highlight">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
