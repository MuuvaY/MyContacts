const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  genre: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  postalCode: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ContactModel = mongoose.model("contacts", contactSchema);

module.exports = ContactModel;
