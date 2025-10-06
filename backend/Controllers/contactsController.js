const ContactModel = require("../Models/contactsModel");

const createContactController = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, genre, createdAt } = req.body;

    if (!firstName || !lastName) {
      return res.status(400).send({
        success: false,
        message: "Le prénom et le nom sont obligatoires",
      });
    }

    const contact = new ContactModel({
      firstName,
      lastName,
      phone,
      email,
      genre,
      createdAt,
      user: req.user._id,
    });

    await contact.save();

    res.status(201).send({
      success: true,
      message: "Contact créé avec succès",
      contact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erreur lors de la création du contact",
      error: error.message,
    });
  }
};

const getAllContactsController = async (req, res) => {
  try {
    const contacts = await ContactModel.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).send({
      success: true,
      message: "Liste des contacts",
      count: contacts.length,
      contacts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erreur lors de la récupération des contacts",
      error: error.message,
    });
  }
};

const getContactByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await ContactModel.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!contact) {
      return res.status(404).send({
        success: false,
        message: "Contact non trouvé",
      });
    }

    res.status(200).send({
      success: true,
      message: "Contact récupéré",
      contact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erreur lors de la récupération du contact",
      error: error.message,
    });
  }
};

const updateContactController = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, phone, email, genre } = req.body;

    const contact = await ContactModel.findOne({
      _id: id,
    });

    if (!contact) {
      return res.status(404).send({
        success: false,
        message: "Contact non trouvé ou vous n'avez pas les droits",
      });
    }

    const updatedContact = await ContactModel.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        phone,
        email,
        genre,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Contact mis à jour avec succès",
      contact: updatedContact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erreur lors de la mise à jour du contact",
      error: error.message,
    });
  }
};

const deleteContactController = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Contact ID:", id);
    console.log("User ID du token:", req.user._id);

    const contact = await ContactModel.findOneAndDelete({
      _id: id,
    });

    if (!contact) {
      return res.status(404).send({
        success: false,
        message: "Contact non trouvé ou vous n'avez pas les droits",
      });
    }

    res.status(200).send({
      success: true,
      message: "Contact supprimé avec succès",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erreur lors de la suppression du contact",
      error: error.message,
    });
  }
};

const searchContactsController = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).send({
        success: false,
        message: "Veuillez fournir un terme de recherche",
      });
    }

    const contacts = await ContactModel.find({
      user: req.user._id,
      $or: [
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).send({
      success: true,
      message: "Résultats de la recherche",
      count: contacts.length,
      contacts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erreur lors de la recherche",
      error: error.message,
    });
  }
};

module.exports = {
  createContactController,
  getAllContactsController,
  getContactByIdController,
  updateContactController,
  deleteContactController,
  searchContactsController,
};
