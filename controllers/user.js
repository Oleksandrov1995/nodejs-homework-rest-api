const fs = require("node:fs/promises");
const path = require("node:path");
const { User } = require("../models/user");
const Jimp = require("jimp");

async function uploadAvatar(req, res, next) {
  try {
    const image = await Jimp.read(req.file.path);
    await image.resize(250, 250);
    const avatarPath = path.join(
      __dirname,
      "..",
      "public","avatar",
      req.file.filename
    );
    await image.writeAsync(avatarPath);
    await fs.unlink(req.file.path);

    const doc = await User.findByIdAndUpdate(
      req.user.id,
      { avatarUrl: req.file.filename },
      { new: true }
    );

    if (doc === null) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json({ avatarUrl: doc.avatarUrl });
  } catch (error) {
    next(error);
  }
}

module.exports = { uploadAvatar };
