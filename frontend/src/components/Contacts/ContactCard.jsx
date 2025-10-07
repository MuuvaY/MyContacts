import "../../css/Contacts/contactCard.css";
import "react-phone-input-2/lib/style.css";

const ContactCard = ({ contact, onEdit, onDelete }) => {
  return (
    <div className="contact-card">
      <div className="contact-card-header">
        <div className="contact-avatar">
          {contact.firstName[0]}
          {contact.lastName[0]}
        </div>
        <div className="contact-actions">
          <button
            onClick={() => onEdit(contact)}
            className="contact-action edit"
            title="Modifier"
          >
            Modifier
          </button>
          <button
            onClick={() => onDelete(contact._id)}
            className="contact-action delete"
            title="Supprimer"
          >
            Supprimer
          </button>
        </div>
      </div>

      <h3 className="contact-name">
        {contact.firstName} {contact.lastName}
      </h3>

      {contact.genre && (
        <div className={`contact-gender ${contact.genre.toLowerCase()}`}>
          {contact.genre}
        </div>
      )}

      {contact.email && (
        <div className="contact-info">
          <a href={`mailto:${contact.email}`} className="contact-link">
            {contact.email}
          </a>
        </div>
      )}

      {contact.phone && (
        <div className="contact-info">
          <a href={`tel:${contact.phone}`} className="contact-link">
            {contact.phone}
          </a>
        </div>
      )}

      {contact.company && (
        <div className="contact-info">
          <span>{contact.company}</span>
        </div>
      )}

      {contact.address && (
        <div className="contact-info">
          <span className="contact-address">{contact.address}</span>
        </div>
      )}

      {contact.notes && (
        <div className="contact-notes">
          <strong>Notes :</strong> {contact.notes}
        </div>
      )}
    </div>
  );
};

export default ContactCard;
