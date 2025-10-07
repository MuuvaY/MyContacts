import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { userAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, logout, loadUser } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      };

      if (formData.password) {
        updateData.password = formData.password;
      }

      await userAPI.updateProfile(user.id, updateData);
      setSuccess("Profil mis à jour avec succès !");
      setIsEditing(false);
      setFormData({ ...formData, password: "" });
      await loadUser();
    } catch (error) {
      setError(
        error.response?.data?.message || "Erreur lors de la mise à jour"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "⚠️ Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible !"
      )
    ) {
      try {
        await userAPI.deleteAccount(user.id);
        logout();
        navigate("/login");
      } catch (error) {
        setError("Erreur lors de la suppression du compte");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Mon Profil</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        {!isEditing ? (
          <div>
            <div className="flex items-center justify-center mb-6">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                {user?.firstName[0]}
                {user?.lastName[0]}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 text-sm mb-1">
                  Prénom
                </label>
                <p className="text-lg font-semibold">{user?.firstName}</p>
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1">Nom</label>
                <p className="text-lg font-semibold">{user?.lastName}</p>
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1">
                  Email
                </label>
                <p className="text-lg font-semibold">{user?.email}</p>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Modifier le profil
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
              >
                Supprimer le compte
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Prénom</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Nom</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Nouveau mot de passe (laisser vide pour ne pas changer)
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-blue-300"
              >
                {loading ? "Enregistrement..." : "Enregistrer"}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 transition"
              >
                Annuler
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
