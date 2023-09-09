const { HttpError } = require("../helpers");
const { authSchema } = require("../utils/validation/authSchema");

function validateAuth(req, res, next) {
  const { error } = authSchema.validate(req.body);
     if (error) {
      throw new HttpError(400, "Bad Request");
     }
   next()
}
module.exports = {validateAuth};

