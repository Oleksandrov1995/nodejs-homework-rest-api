const { v4: uuidv4 } = require("uuid");
const { User } = require("../models/user");
const { HttpError } = require("../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const sendEmail = require("../helpers/sendEmail");

async function register(req, res, next) {
  const { password, email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      throw new HttpError(409, "Email in use");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const verifyToken = uuidv4();

    const avatarUrl = gravatar.url(email);
    const newUser = await User.create({
      password: passwordHash,
      email,
      avatarUrl,
      verifyToken,
    });
    await sendEmail({
      to: email,
      subject: `Welcome to contact list, ${email}`,
      html: `
  <p>To confirm your registration, please click on link below</p>
  <p>
  <a href="http://localhost:3000/api/auth/verify/${verifyToken}">Click me</a>
  </p>
  `,
      text: `
  To confirm your registration, please click on link below\n
  http://localhost:3000/api/auth/verify/${verifyToken}`,
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarUrl: newUser.avatarUrl,
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
    if (user.verified !== true) {
      return res.status(404).json({ message: "User not found" });
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
        avatarUrl: user.avatarUrl,
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

async function verify(req, res, next) {
  const { token } = req.params;
  try {
    const user = await User.findOne({ verifyToken: token });
    if (!user) {
      return res.status(404).json("User not found");
    }
    await User.findByIdAndUpdate(user._id, {
      verified: true,
      verifyToken: null,
    });
    res.json("Verification successful");
  } catch (error) {
    next(error);
  }
}

async function resendVerify(req, res, next) {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "missing required field email" });
    }
    if (user.verified) {
      res.status(400).json({ message: "Verification has already been passed" });
    }
    const { verifyToken } = user;

    await sendEmail({
      to: email,
      subject: `Welcome to contact list, ${email}`,
      html: `
<p>To confirm your registration, please click on link below</p>
<p>
<a href="http://localhost:3000/api/auth/verify/${verifyToken}">Click me</a>
</p>
`,
      text: `
To confirm your registration, please click on link below\n
http://localhost:3000/api/auth/verify/${verifyToken}`,
    });

    res.json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login, logout, verify, resendVerify };
