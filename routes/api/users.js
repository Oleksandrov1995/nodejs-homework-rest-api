const express = require("express");
const ctrl = require("../../controllers/user");
const router = express.Router();
const upload = require("../../middlewares/upload");

router.patch("/avatar", upload.single("avatar"), ctrl.uploadAvatar);

module.exports = router;
