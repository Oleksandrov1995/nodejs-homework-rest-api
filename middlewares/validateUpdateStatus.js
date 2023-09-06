const { HttpError } = require("../helpers");
const { addFavoriteSchema } = require("../utils/validation");

function validateUpdateStatus(req, res, next) {
    const { error } = addFavoriteSchema.validate(req.body);
    if (error) {
      throw new HttpError(400, "missing field favorite");
    }
  next()
}
module.exports = {validateUpdateStatus };