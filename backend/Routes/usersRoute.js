const express = require("express");

const usersController = require("../Controllers/usersController");
const contactController = require("../Controllers/contactsController");

const router = express.Router();

router.get("/getUsers", usersController);
router.get("/getContacts", contactController);

router.get("/test", (req, res, next) => {
  res.send("Bonjour je suis un test");
});

module.exports = router;
