const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const {
  validateAddContact,
  validateUpdateContact,
  validateUpdateStatus,
} = require("../../middlewares");

router.get("/", ctrl.getContacts);
router.get("/:id", ctrl.getContactById);
router.delete("/:id", ctrl.removeContact);
router.post("/", validateAddContact, ctrl.addContact);
router.put("/:id", validateUpdateContact, ctrl.updateContact);
router.patch("/:id/favorite", validateUpdateStatus, ctrl.updateContactStatus);

module.exports = router;
