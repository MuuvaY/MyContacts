const express = require("express");
const {
  createContactController,
  getAllContactsController,
  getContactByIdController,
  updateContactController,
  deleteContactController,
  searchContactsController,
} = require("../Controllers/contactsController");
const { requireSignIn } = require("../Middlewares/authMiddleware");

const router = express.Router();

router.get("/contacts", requireSignIn, getAllContactsController);
router.get("/search", requireSignIn, searchContactsController);
router.post("/contacts", requireSignIn, createContactController);
router.get("contacts/:id", requireSignIn, getContactByIdController);
router.patch("/contacts/:id", requireSignIn, updateContactController);
router.delete("/contacts/:id", requireSignIn, deleteContactController);

module.exports = router;
