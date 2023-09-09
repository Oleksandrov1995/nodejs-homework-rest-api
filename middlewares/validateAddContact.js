const { HttpError } = require("../helpers");
const { addSchema } = require("../utils/validation");

function validateAddContact(req, res, next) {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw new HttpError(400, "missing required name field");
  }
  next()
}
module.exports = { validateAddContact };
