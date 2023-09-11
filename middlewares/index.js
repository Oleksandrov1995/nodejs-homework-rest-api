const { validateAddContact } = require("./validateAddContact");
const { validateUpdateContact } = require("./validateUpdateContact");
const { validateUpdateStatus } = require("./validateUpdateStatus");
const { validateAuth } = require("./validateAuth");
module.exports = {
  validateAddContact,
  validateUpdateContact,
  validateUpdateStatus,
  validateAuth,
};
