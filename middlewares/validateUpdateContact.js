const { HttpError } = require("../helpers");
const { addSchema } = require("../utils/validation");

function validateUpdateContact(req, res, next) {
  const { error } = addSchema.validate(req.body);
    if (error) {
      throw new HttpError(400, "missing fields");
    }
  next()
}
module.exports = {validateUpdateContact };