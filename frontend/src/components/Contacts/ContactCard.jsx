import "../../css/Contacts/contactCard.css";
import "react-phone-input-2/lib/style.css";

const ContactCard = ({ contact, onEdit, onDelete }) => {
  return (
    <div className="contact-card">
      <div className="contact-card-header">
        <div className="contact-avatar">
          {contact.firstName?.[0]}
          {contact.lastName?.[0]}
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

      {(contact.address || contact.city || contact.postalCode) && (
        <div className="contact-info">
          <div className="contact-address">
            {contact.address && <div>{contact.address}</div>}
            {(contact.postalCode || contact.city) && (
              <div className="contact-location">
                <span>{contact.postalCode}</span>
                {contact.postalCode && contact.city && <span>-</span>}
                <span>{contact.city}</span>
              </div>
            )}
          </div>
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
