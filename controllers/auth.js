const { User } = require("../models/user");
const { HttpError } = require("../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(req, res, next) {
  const { password, email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      throw new HttpError(409, "Email in use");
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({ password: passwordHash, email });
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new HttpError(401, "Email or password is wrong");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch !== true) {
      throw new HttpError(401, "Email or password is wrong");
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 3600,
      }
    );
    await User.findByIdAndUpdate(user._id, { token });

    res.status(201).json({
      token: token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
  res.end();
}

module.exports = { register, login, logout };
