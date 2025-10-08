const express = require("express");

const usersController = require("../Controllers/usersController");

const router = express.Router();

router.get("/getUsers", usersController);

module.exports = router;
