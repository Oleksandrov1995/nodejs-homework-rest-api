const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

function auth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const [bearer, token] = authHeader.split(" ", 2);

  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ message: "Not authorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err && err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Not authorized" });
    }

    try {
      const user = await User.findById(decode.id).exec();

      if (user.token !== token) {
        return res.status(401).json({ message: "Not authorized" });
      }

      req.user = { id: decode.id };
      next();
    } catch (err) {
      next(err);
    }
  });
}

module.exports = auth;
