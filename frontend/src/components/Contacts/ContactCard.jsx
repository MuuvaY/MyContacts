const ContactCard = ({ contact, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
          {contact.firstName[0]}
          {contact.lastName[0]}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(contact)}
            className="text-blue-600 hover:text-blue-800 transition"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(contact._id)}
            className="text-red-600 hover:text-red-800 transition"
          >
            🗑️
          </button>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-2">
        {contact.firstName} {contact.lastName}
      </h3>

      {contact.email && (
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <span>📧</span>
          <a
            href={`mailto:${contact.email}`}
            className="hover:text-blue-600 transition"
          >
            {contact.email}
          </a>
        </div>
      )}

      {contact.phone && (
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <span>📞</span>
          <a
            href={`tel:${contact.phone}`}
            className="hover:text-blue-600 transition"
          >
            {contact.phone}
          </a>
        </div>
      )}

      {contact.company && (
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <span>🏢</span>
          <span>{contact.company}</span>
        </div>
      )}

      {contact.address && (
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <span>📍</span>
          <span className="text-sm">{contact.address}</span>
        </div>
      )}

      {contact.notes && (
        <div className="mt-4 p-3 bg-gray-50 rounded text-sm text-gray-700">
          <strong>Notes:</strong> {contact.notes}
        </div>
      )}
    </div>
  );
};

export default ContactCard;
