const UserModel = require("./../Models/usersModel");

const usersController = async (req, res) => {
  const userData = await UserModel.find();
  res.json(userData);
};

module.exports = usersController;
