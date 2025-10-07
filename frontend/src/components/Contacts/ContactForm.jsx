import { useState, useEffect } from "react";
import { contactAPI } from "../../services/api";
import "../../css/Contacts/contactForm.css";

const ContactForm = ({ contact, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    company: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (contact) {
      setFormData({
        firstName: contact.firstName || "",
        lastName: contact.lastName || "",
        email: contact.email || "",
        phone: contact.phone || "",
        address: contact.address || "",
        company: contact.company || "",
        notes: contact.notes || "",
      });
    }
  }, [contact]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (contact) {
        await contactAPI.updateContact(contact._id, formData);
      } else {
        await contactAPI.createContact(formData);
      }
      onClose();
    } catch (error) {
      setError(error.response?.data?.message || "Erreur lors de la sauvegarde");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-modal">
        <div className="form-header">
          <h2 className="form-title">
            {contact ? "Modifier le contact" : "Nouveau contact"}
          </h2>
          <button onClick={onClose} className="form-close">
            ✕
          </button>
        </div>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit} className="form-body">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Prénom <span className="required">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Nom <span className="required">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Téléphone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Entreprise</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Adresse</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="form-textarea"
            ></textarea>
          </div>

          <div className="form-buttons">
            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary ${loading ? "btn-disabled" : ""}`}
            >
              {loading
                ? "Enregistrement..."
                : contact
                ? "Mettre à jour"
                : "Créer"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
