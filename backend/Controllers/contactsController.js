const ContactModel = require("../Models/contactsModel");

const contactController = async (req, res) => {
  const contactData = await ContactModel.find();
  res.json(contactData);
};

module.exports = contactController;
