import { useState, useEffect } from "react";
import { contactAPI } from "../../services/api";
import ContactCard from "./ContactCard";
import ContactForm from "./ContactForm";
import SearchBar from "./SearchBar";
import "../../css/Contacts/contactList.css";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await contactAPI.getAllContacts();
      if (response.data.success) {
        setContacts(response.data.contacts);
        setFilteredContacts(response.data.contacts);
      }
    } catch (error) {
      setError("Erreur lors du chargement des contacts");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter(
        (contact) =>
          contact.firstName.toLowerCase().includes(query.toLowerCase()) ||
          contact.lastName.toLowerCase().includes(query.toLowerCase()) ||
          contact.email?.toLowerCase().includes(query.toLowerCase()) ||
          contact.phone?.includes(query)
      );
      setFilteredContacts(filtered);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce contact ?")) {
      try {
        await contactAPI.deleteContact(id);
        fetchContacts();
      } catch (error) {
        setError("Erreur lors de la suppression");
        console.error(error);
      }
    }
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingContact(null);
    fetchContacts();
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1 className="contact-title">Mes Contacts</h1>
        <button onClick={() => setShowForm(true)} className="add-button">
          + Nouveau Contact
        </button>
      </div>

      {error && <div className="error-alert">{error}</div>}

      <SearchBar onSearch={handleSearch} />

      {showForm && (
        <ContactForm contact={editingContact} onClose={handleFormClose} />
      )}

      <div className="contact-grid">
        {filteredContacts.length === 0 ? (
          <div className="no-contact">Aucun contact trouvé</div>
        ) : (
          filteredContacts.map((contact) => (
            <ContactCard
              key={contact._id}
              contact={contact}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ContactList;
