const { hashPassword, comparePassword } = require("../helpers/authhelpers");

const JWT = require("jsonwebtoken");
const UserModel = require("../Models/usersModel");

const registerController = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.send({
        success: false,
        message: "Veuillez remplir tous les champs",
      });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "L'utilisateur exist déjà",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();

    res.status(200).send({
      success: true,
      message: "Utilisateur enregistré avec succès !",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erreur lors de l'enregistrement ;(",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Veuillez remplir tous les champs",
      });
    }

    const user = await UserModel.findOne({ email });
    console.log({ user });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(404).send({
        success: false,
        message: "Mot de passe invalide",
      });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).send({
      success: true,
      message: "Connecté avec succès",
      token,
      user: {
        id: user_id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erreur lors de la conncetion",
      error,
    });
  }
};

module.exports = { registerController, loginController };
