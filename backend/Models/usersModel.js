const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false,
  },

  lastName: {
    type: String,
    required: false,
  },

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
