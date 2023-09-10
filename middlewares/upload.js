const multer = require("multer");
const path = require("node:path");
const crypto = require('node:crypto')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "..", "tmp"));
    },
    filename: (req, file, cb) => {

      const userId = req.user.id;
      const extname = path.extname(file.originalname);
      const suffix = crypto.randomUUID()
  
      cb(null, `avatar-${userId}-${suffix}${extname}`);
    },
  });
  
  const upload = multer({ storage });

module.exports= upload