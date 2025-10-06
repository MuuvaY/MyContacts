const express = require("express");

const usersController = require("../Controllers/usersController");
const contactController = require("../Controllers/contactsController");

const router = express.Router();

router.get("/getUsers", usersController);
router.get("/getContacts", contactController);

module.exports = router;
